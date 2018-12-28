import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import serializeJS from 'serialize-javascript'
import { StaticRouter, matchPath } from 'react-router'
import { ServerStyleSheet } from 'styled-components'
import { configureStore } from 'shared/redux/store'
import App from 'shared/components/App'
import routes from '../../../shared/config/routes'

const getRouteMatches = (store, url) => (
  routes.reduce((matches, route) => {
    const match = matchPath(url, route)

    if (match && route.component.fetchData) {
      matches.push(route.component.fetchData(store, match))
    }

    return matches
  }, [])
)

export default async (req, res, next) => {
  const context = {}
  const initialState = {}

  const { store, sagas, close } = configureStore(initialState)

  const promises = [...getRouteMatches(store, req.url), sagas.done]

  try {
    // Stop the sagas in the redux store
    close()

    await Promise.all(promises)

    const sheet = new ServerStyleSheet()

    const html = renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App routes={routes} />
          </StaticRouter>
        </Provider>
      )
    )

    // Handle redirect.
    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    const styleTags = sheet.getStyleTags()

    const templateData = {
      title: 'Dirty Code',
      initialHtml: html,
      description: 'Funniest programming jokes on the internet',
      initialCSS: styleTags,
      initialJSONState: serializeJS(store.getState(), { isJSON: true })
    }

    // Render the index.handlebars with the template data.
    res.render('index', templateData)
  } catch (err) {
    next(err)
  }
}
