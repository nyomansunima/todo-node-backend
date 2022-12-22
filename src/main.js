// const express = require('express')
// const cors = require('cors')
// const morgan = require('morgan')
// const helmet = require('helmet')
// const bodyParser = require('body-parser')
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// start to bootstrap all
// apps, deps and setting configs
function bootstrap() {
  const app = express()

  // middleware
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('combined'))

  app.listen(3000, (e) => {
    console.log(`🚀 Application running at http://localhost:3000`)
  })
}

bootstrap()
