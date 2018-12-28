import { createSelector } from 'reselect'
import { filters } from './consts'

const feedSelector = ({ jokeFeed }) => jokeFeed.feed
const filterSelector = ({ jokeFeed }) => jokeFeed.currentFilter

/**
 * @todo Add in some sort of awesome sorting utility to sort posts by the most voted.
 */
export const getPostsAccordingToFilter = createSelector(
  [feedSelector, filterSelector],
  (feed, currentFilter) => {
    switch (currentFilter) {
      case filters.MOST_VOTED:
      case filters.LATEST:
      default:
        return feed
    }
  }
)

export const allPosts = ({ jokeFeed }) => jokeFeed
