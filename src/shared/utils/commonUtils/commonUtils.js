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
