import React from 'react'
import { hydrate } from 'react-dom'
import Router from './config/Router'
import { queryById } from './utils/domUtils'
import configureStyles from './config/configureStyles'
import { AppContainer } from 'react-hot-loader'

// rehydrate glamor ids
configureStyles()

const renderApp = (Component) => {
  hydrate(
    <AppContainer warnings={false}>
      <Component />
    </AppContainer>,
    queryById('app')
  )
}

renderApp(Router)

if (module.hot) {
  module.hot.accept('./config/Router', () => {
    const NewRouter = require('./config/Router').default
    renderApp(NewRouter)
  })
}
