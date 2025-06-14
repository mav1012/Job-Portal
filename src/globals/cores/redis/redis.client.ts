import { createClient, RedisClientType } from 'redis'

class RedisClient {
  public client: RedisClientType

  constructor() {
    this.client = createClient({
      url: 'redis://localhost:6380'
    })

    this.client.on('error', (err) => console.log('Redis Client Error', err))
    this.client.connect()
  }
}

export default RedisClient
