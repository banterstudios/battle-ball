'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import isDev from 'isdev'
import { errorMessage } from './utils/messages'

const port = process.env.PORT || 3100
const app = express()

if (isDev) {
  require('./middleware/expressWebpack').default(app)
}

const handlebarsConfig = {
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, '../build/views')
}

app.engine('handlebars',
  exphbs(handlebarsConfig)
)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// view engine setup
app.set('views', path.join(__dirname, '../build/views'))

app.set('view engine', 'handlebars')

app.use(morgan('dev'))

app.use('/static', express.static('build'))

app.use((req, res, next) => {
  require('./routes').default(req, res, next)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json(errorMessage({
    message: err,
    error: isDev ? err : {}
  }))
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

export default app
