import update from 'immutability-helper'
import * as types from './types'

// Reducers
const initialState = {
  resize: {}
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case types.GLOBAL_WINDOW_RESIZE:
      const { width, height } = data

      return update(state, {
        resize: {
          $set: {
            width,
            height
          }
        }
      })

    default:
      return state
  }
}
