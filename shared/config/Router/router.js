import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import App from 'shared/components/App'
import reduxStore from 'shared/redux/store'

import routes from './routes'

const Router = () => {
  return (
    <Provider store={reduxStore.store}>
      <BrowserRouter>
        <App routes={routes} />
      </BrowserRouter>
    </Provider>
  )
}

export default hot(module)(Router)
