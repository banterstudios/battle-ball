import update from 'immutability-helper'
import * as types from './types'
import { filters } from './consts'

const initialState = {
  isFetching: false,
  error: null,
  feed: [],
  limit: 10,
  currentCount: 0,
  hasMorePosts: true,
  currentFilter: filters.MOST_VOTED
}

// Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_JOKE_FEED:
      return update(state, {
        isFetching: {
          $set: true
        }
      })

    case types.ADD_JOKE_FEED:
      return update(state, {
        isFetching: {
          $set: false
        },
        feed: {
          $push: payload.feed
        },
        limit: {
          $set: payload.limit
        },
        currentCount: {
          $set: payload.currentCount
        },
        hasMorePosts: {
          $set: payload.hasMorePosts
        }
      })

    case types.FAILED_TO_FETCH_JOKE_FEED:
      return update(state, {
        isFetching: {
          $set: false
        },
        error: {
          $set: payload.error
        }
      })

    default:
      return state
  }
}
