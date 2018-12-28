import { put, takeEvery, call, select } from 'redux-saga/effects'
import * as selectors from './selectors'
import * as actions from './actions'
import * as types from './types'
import { getJokeFeed } from '../../../api/services'

function * loadMoreJokeFeed () {
  try {
    const { currentCount, limit, currentFilter } = yield select(selectors.allPosts)
    const data = yield call(getJokeFeed, { query: { currentCount, limit, currentFilter } })
    yield put(actions.fetchedJokeFeed(data))
  } catch (err) {
    yield put(actions.failedToFetchJokeFeed(err.message))
  }
}

// sagas
export function * fetchJokeFeedSaga () {
  yield takeEvery(types.FETCH_JOKE_FEED, loadMoreJokeFeed)
}
