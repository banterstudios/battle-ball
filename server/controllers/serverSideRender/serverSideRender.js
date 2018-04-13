import React from 'react'
import { renderStatic } from 'glamor/server'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../../../shared/components/App'
import serializeJS from 'serialize-javascript'

export default async (req, res) => {
  const context = {}

  const { html, css, ids = [] } = renderStatic(() => ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  ))

  const templateData = {
    title: 'Gangsta Claus',
    initialHtml: html,
    initialCSS: css,
    initialIds: serializeJS(ids)
  }

  // Render the index.handlebars with the template data.
  res.render('index', templateData)
}
