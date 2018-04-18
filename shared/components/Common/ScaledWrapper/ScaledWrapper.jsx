import glamorous from 'glamorous'
import listenToWindowEvents from '../../../redux/containers/ListenToWindowEvents'
import { calculateScaleForGame } from '../../../utils/commonUtils'

const ScaledWrapper = glamorous.div(({
  theme: {
    game: {
      width: gameWidth,
      heightNoUnit: gameHeightNoUnit,
      widthNoUnit: gameWidthNoUnit,
      height: gameHeight
    }
  },
  resize: { width, height } = {}
}) => {
  const {
    width: scaledWidth,
    height: scaledHeight
  } = calculateScaleForGame({ gameHeight: gameHeightNoUnit, gameWidth: gameWidthNoUnit, windowWidth: width, windowHeight: height })

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: gameWidth,
    height: gameHeight,
    transform: `scale3d(${scaledWidth}, ${scaledHeight}, 1)`,
    transformOrigin: width < gameWidthNoUnit ? 'top left' : 'center',
    background: `url('/static/assets/images/menu/background.png') center / cover no-repeat`
  }
})

export default listenToWindowEvents({ eventTypes: ['resize'] })(ScaledWrapper)
