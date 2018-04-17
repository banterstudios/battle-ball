import glamorous from 'glamorous'
import listenToWindowEvents from '../../../redux/containers/ListenToWindowEvents'
import { calculateScaleForGame } from '../../../utils/commonUtils'

const ScaledWrapper = glamorous.div(({
  theme: {
    game: {
      width: gameWidth,
      heightNoUnit: gameHeightNoUnit,
      height: gameHeight
    }
  },
  resize: { width, height } = {}
}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: gameWidth,
  height: gameHeight,
  transform: `scale(${calculateScaleForGame({ gameHeight: gameHeightNoUnit, windowWidth: width }) || 1})`,
  transformOrigin: 'top left',
  background: `url('/static/assets/images/menu/background.png') center / cover no-repeat`
}))

export default listenToWindowEvents({ eventTypes: ['resize'] })(ScaledWrapper)
