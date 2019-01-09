import { calculateScaleForGame } from 'shared/utils/commonUtils'
import useWindowResize from '@banterstudiosuk/use-window-resize'

const useScaledResize = ({ width, height }) => {
  const { innerWidth, innerHeight } = useWindowResize()

  const scaleFactor = calculateScaleForGame({
    gameWidth: width,
    gameHeight: height,
    windowWidth: innerWidth,
    windowHeight: innerHeight
  })

  return {
    width: width * scaleFactor.width,
    height: height * scaleFactor.height
  }
}

export default useScaledResize
