import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { config } from 'dotenv'
import router from './router.js'
import { initDatabase } from './utils/database.js'

// start to bootstrap all
// apps, deps and setting configs
function bootstrap() {
  // load all env
  config()

  // starting the database
  initDatabase()

  // create the application
  const app = express()

  // middleware
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('combined'))

  app.get('/', (req, res) => {
    res.send('Welcome to TODO Backend API')
  })

  // define the api endpoints
  app.use('/api', router)

  // listen the application while running
  const port = parseInt(process.env.PORT, 10) || 4000
  app.listen(port, () => {
    console.log(`🚀 Application running at http://localhost:${port}`)
  })
}

bootstrap()
