/**
 *  @name throttle
 *  @param  {Function} func
 *  @param  {Number} delay
 *  @return {Function}
 */
export const throttle = (func, delay = 100) => {
  let resizeTimeout

  return (...props) => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null
        func(...props)
      }, delay)
    }
  }
}

export const calculateScaleForGame = ({ windowWidth, windowHeight, gameWidth, gameHeight }) => {
  const canvasRatio = gameHeight / gameWidth
  const windowRatio = windowHeight / windowWidth
  let width
  let height

  if (windowRatio < canvasRatio) {
    height = windowHeight
    width = height / canvasRatio
  } else {
    width = windowWidth
    height = width * canvasRatio
  }

  width = width / gameWidth
  height = height / gameHeight

  return { width, height }
}
