const mariadb = require('mariadb');
require('dotenv').config();

async function test() {
  const urlString = process.env.DATABASE_URL || '';
  console.log('Testing with URL:', urlString);
  
  try {
    const url = new URL(urlString);
    const dbUser = url.username || 'root';
    const password = url.password || '';
    const host = url.hostname || '127.0.0.1';
    const port = url.port ? parseInt(url.port) : 3306;
    const database = url.pathname.substring(1);

    console.log(`Attempting connection: ${host}:${port}, database: ${database}, user: ${dbUser}`);

    const pool = mariadb.createPool({
      host: host === 'localhost' ? '127.0.0.1' : host,
      port,
      user: dbUser,
      password,
      database,
      connectionLimit: 1,
    });

    const conn = await pool.getConnection();
    console.log('Connected successfully!');
    await conn.release();
    await pool.end();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

test();
