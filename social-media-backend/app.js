const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const wss = require('./controllers/chat')

const config = require('./utils/config')
const logger = require('./utils/logger')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express())
app.use(express.json())

app.use(middleware.tokenExtractor)

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status - :response-time ms - :body'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
