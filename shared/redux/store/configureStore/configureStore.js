import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducers } from '../../modules'
import immutableStateInvariant from 'redux-immutable-state-invariant'
import isDev from 'isdev'

let configureStore

if (isDev) {
  const composeEnhancers = process.browser ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

  configureStore = (initialState) => {
    return createStore(
      reducers,
      initialState,
      composeEnhancers(applyMiddleware(immutableStateInvariant(), thunkMiddleware))
    )
  }
} else {
  configureStore = (initialState) => {
    return createStore(
      reducers,
      initialState,
      applyMiddleware(thunkMiddleware)
    )
  }
}

export default configureStore
