import express, { Application, Request, Response, NextFunction } from 'express'
import appRoutes from './globals/routes/appRoutes'
import { CustomError } from './globals/cores/error.core'
import cookieParser from 'cookie-parser'
import { syncData } from './globals/cores/redis/syncData'
import cron from 'node-cron'

class Server {
  private app: Application

  constructor() {
    this.app = express()
  }

  public start(): void {
    this.setupMiddleware()
    this.setupRoutes()
    this.setupErrorHandling()
    this.listenServer()
    // this.syncRedisToPostgres()
  }

  private setupMiddleware(): void {
    this.app.use(express.json())
    this.app.use(cookieParser())
  }

  private setupRoutes(): void {
    appRoutes(this.app)
  }

  private setupErrorHandling(): void {
    this.app.all('*', (req, res) => {
      res.status(404).json({
        message: `The URL ${req.originalUrl} does not exist`
      })
    })

    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          message: error.message
        })
      }

      console.log('💥 Error:', error)
      res.status(500).json({
        message: error.message,
        stack: error.stack
      })
    })
  }

  // private syncRedisToPostgres(): void {
  //   cron.schedule('0 * * * *', async () => {
  //     syncData()
  //   })
  // }

  private listenServer() {
    const port = process.env.PORT || 3000

    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  }
}

export default Server
