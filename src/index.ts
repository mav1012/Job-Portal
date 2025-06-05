import dotenv from 'dotenv'
dotenv.config()
import Server from './server'
import client from './globals/cores/redis/redis.client'

class JobApplication {
  public run(): void {
    const server = new Server()
    server.start()
  }
}

client

const jobApplication: JobApplication = new JobApplication()
jobApplication.run()
