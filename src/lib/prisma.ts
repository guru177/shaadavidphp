import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { createPool } from 'mariadb'

console.log('🔥🔥🔥 PRISMA LIB LOADED 🔥🔥🔥')

const prismaClientSingleton = () => {
  console.log('🚀 INITIALIZING PRISMA CLIENT SINGLETON')
  const urlString = process.env.DATABASE_URL || 'mariadb://root@127.0.0.1:3306/shaadavid_db'
  
  try {
    console.log('[Prisma] Using URL:', urlString)
    
    // Prevention: Delete system user env vars that might confuse the driver
    delete process.env.USER;
    delete process.env.USERNAME;
    
    const pool = createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'shaadavid_db',
      port: 3306,
      connectionLimit: 10,
    })

    const adapter = new PrismaMariaDb(pool as any)
    return new PrismaClient({ adapter })
  } catch (error) {
    console.error('[Prisma] Error in singleton:', error)
    throw error
  }
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
