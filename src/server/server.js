'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'
import exphbs from 'express-handlebars'
import isDev from 'isdev'
import expressStaticGzip from 'express-static-gzip'
import httpResponses from './middleware/httpResponses'

const port = process.env.PORT || 3100
const app = express()

if (isDev) {
  require('./middleware/expressWebpack').default(app)
}

const handlebarsConfig = {
  defaultLayout: 'index',
  layoutsDir: path.resolve(__dirname, '../build/views')
}

app.engine('handlebars',
  exphbs(handlebarsConfig)
)

app.disable('x-powered-by')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// view engine setup
app.set('views', path.resolve(__dirname, '../build/views'))

app.set('view engine', 'handlebars')

app.use(morgan('dev'))

app.use(express.static('public'))
app.use('/js', expressStaticGzip('build/js'))
app.use('/css', expressStaticGzip('build/css'))

app.use(httpResponses())

app.use(
  isDev
    ? (req, res, next) => require('./routes').default(req, res, next)
    : require('./routes').default
)

// Error handler
app.use((err, req, res, next) => {
  res.httpResponse.badImplementation({
    error: isDev ? err.stack : undefined,
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

export default app
