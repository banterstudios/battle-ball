import React from 'react'
import { renderToString } from 'react-dom/server'
import serializeJS from 'serialize-javascript'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'
import App from 'shared/components/App'

export default async (req, res, next) => {
  const context = {}

  try {
    const sheet = new ServerStyleSheet()

    const html = renderToString(
      sheet.collectStyles(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )
    )

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    const styleTags = sheet.getStyleTags()

    const templateData = {
      title: 'Dirty Code',
      initialHtml: html,
      description: 'Funniest programming jokes on the internet',
      initialCSS: styleTags,
      initialJSONState: serializeJS({}, { isJSON: true })
    }

    res.render('index', templateData)
  } catch (err) {
    next(err)
  }
}
