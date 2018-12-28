import { all } from 'redux-saga/effects'
import { fetchJokeFeedSaga } from './jokeFeed'

export default function * rootSaga () {
  yield all([
    fetchJokeFeedSaga()
  ])
}
