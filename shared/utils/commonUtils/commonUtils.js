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

// export const calculateScaleForGame = ({ windowWidth, windowHeight, gameWidth, gameHeight }) => {
//   const aspect_ratio = gameWidth / gameHeight

//   // the screen is wider
//   if (window.innerWidth * (1/aspect_ratio) > window.innerHeight) {
//     game_main.canv.height = window.innerHeight;
//     game_main.canv.width = game_main.canv.height * aspect_ratio;
//     game_main.SCALE = game_main.canv.height / game_main.VIEW_HEIGHT;
//   }
//   // the screen is taller
//   else {
//     game_main.canv.width = window.innerWidth;
//     game_main.canv.height = game_main.canv.width / aspect_ratio;
//     game_main.SCALE = game_main.canv.width / game_main.VIEW_WIDTH;
//   }
// }
