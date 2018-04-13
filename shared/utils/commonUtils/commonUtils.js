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
