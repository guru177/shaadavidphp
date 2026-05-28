const { createPool } = require('mariadb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const urlString = process.env.DATABASE_URL || '';
let user = 'root';
let password = '';
let host = '127.0.0.1';
let port = 3306;
let database = 'shaadavid_db';

try {
  const parsedUrl = new URL(urlString);
  user = parsedUrl.username || user;
  password = parsedUrl.password || password;
  host = parsedUrl.hostname || host;
  port = parsedUrl.port ? parseInt(parsedUrl.port) : port;
  database = parsedUrl.pathname.substring(1) || database;
} catch (e) {
  console.warn('⚠️ Could not parse DATABASE_URL, using defaults');
}

async function run() {
  const pool = createPool({ host, port, user, password, database });
  let conn;
  
  try {
    conn = await pool.getConnection();
    const adminPassword = 'admin@shaadavid';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const rows = await conn.query('SELECT * FROM Admin WHERE username = ?', ['admin']);
    
    if (rows.length > 0) {
      await conn.query('UPDATE Admin SET password = ? WHERE username = ?', [hashedPassword, 'admin']);
      console.log('✅ Admin password updated.');
    } else {
      await conn.query('INSERT INTO Admin (username, password, updatedAt) VALUES (?, ?, NOW())', 
        ['admin', hashedPassword]);
      console.log('✅ Admin user created.');
    }
    
    console.log('--------------------------------------------------');
    console.log('Username: admin');
    console.log('Password: ' + adminPassword);
    console.log('--------------------------------------------------');

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    if (conn) await conn.end();
    await pool.end();
  }
}

run();
