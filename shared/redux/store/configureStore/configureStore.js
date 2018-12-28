import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware, { END } from 'redux-saga'
import { reducers, sagas } from '../../modules'
import immutableStateInvariant from 'redux-immutable-state-invariant'
import isDev from 'isdev'

const sagaMiddleware = createSagaMiddleware()
let configureStore

/**
 * @todo clean this up to keep it more DRY
 */
if (isDev) {
  const composeEnhancers = process.browser ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose

  configureStore = (initialState) => {
    const store = createStore(
      reducers,
      initialState,
      composeEnhancers(applyMiddleware(immutableStateInvariant(), thunkMiddleware, sagaMiddleware))
    )

    return { store, sagas: sagaMiddleware.run(sagas), close: () => store.dispatch(END) }
  }
} else {
  configureStore = (initialState) => {
    const store = createStore(
      reducers,
      initialState,
      applyMiddleware(thunkMiddleware, sagaMiddleware)
    )

    return { store, sagas: sagaMiddleware.run(sagas), close: () => store.dispatch(END) }
  }
}

export default configureStore
