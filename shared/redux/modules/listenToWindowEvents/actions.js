import * as types from './types'

export const fetchJokeFeed = () => ({
  type: types.FETCH_JOKE_FEED,
  payload: {}
})

export const fetchedJokeFeed = ({ feed, currentCount, limit, hasMorePosts }) => ({
  type: types.ADD_JOKE_FEED,
  payload: {
    feed,
    currentCount,
    limit,
    hasMorePosts
  }
})

export const failedToFetchJokeFeed = (error) => ({
  type: types.FAILED_TO_FETCH_JOKE_FEED,
  payload: {
    error
  }
})
