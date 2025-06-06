import { syncData } from './globals/cores/redis/syncData'

async function run() {
  try {
    await syncData()
    console.log('✅ Redis successfully synced to Postgres')
    process.exit(0)
  } catch (err) {
    console.error('❌ Sync failed:', err)
    process.exit(1)
  }
}

run()
