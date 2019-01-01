import * as types from './types'

// Action Creators
export const globalWindowResize = ({ target: { innerWidth, innerHeight } }) => ({
  type: types.GLOBAL_WINDOW_RESIZE,
  data: {
    width: innerWidth,
    height: innerHeight
  }
})

export const listenToWindowEvent = ({ name, mapEventToAction, filter = (e) => true }) => ({
  type: 'FAKEFAKE'
})

// export const listenToWindowEvent = ({ name, mapEventToAction, filter = (e) => true }) => (dispatch) => {
//   const handleEvent = (e) => {
//     if (filter(e)) {
//       dispatch(mapEventToAction(e))
//     }
//   }

//   window.addEventListener(name, handleEvent)
//   window.dispatchEvent(new Event(name))

//   return () => window.removeEventListener(name, handleEvent)
// }
