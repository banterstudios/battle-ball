import update from 'immutability-helper'

// Action Types
export const GLOBAL_WINDOW_RESIZE = '@listenToWindowEvents/GLOBAL_WINDOW_RESIZE'

// Action Creators
export const globalWindowResize = ({ target: { innerWidth, innerHeight } }) => ({
  type: GLOBAL_WINDOW_RESIZE,
  data: {
    width: innerWidth,
    height: innerHeight
  }
})

// Thunks
export const listenToWindowEvent = (name, mapEventToAction, filter = (e) => true) => (dispatch) => {
  const handleEvent = (e) => {
    if (filter(e)) {
      dispatch(mapEventToAction(e))
    }
  }

  window.addEventListener(name, handleEvent)

  return () => window.removeEventListener(name, handleEvent)
}

// Reducers
const initialState = {
  dimensions: {}
}

export default (state = initialState, { type, data }) => {
  switch (type) {
    case GLOBAL_WINDOW_RESIZE:
      const { width, height } = data

      return update(state, {
        dimensions: {
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
