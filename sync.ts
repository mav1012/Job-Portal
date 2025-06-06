import { syncData } from './src/globals/cores/redis/syncData'
;(async () => {
  try {
    console.log('Running Redis to Postgres sync...')
    await syncData()
    console.log('Sync complete ✅')
  } catch (err) {
    console.error('Sync failed ❌', err)
  } finally {
    process.exit(0)
  }
})()
