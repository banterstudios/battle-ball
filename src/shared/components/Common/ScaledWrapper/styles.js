import styled from 'styled-components'
import { calculateScaleForGame } from 'shared/utils/commonUtils'

export const ScaledWrapper = styled.div.attrs({
  style: ({ theme: { gameHeight, gameWidth, windowWidth, windowHeight } }) => {
    const {
      width,
      height
    } = calculateScaleForGame({ gameHeight, gameWidth, windowWidth, windowHeight })

    return {
      transform: `scale3d(${width}, ${height}, 1)`
    }
  }
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: ${({ theme: { gameWidth } }) => gameWidth};
  height: ${({ theme: { gameHeight } }) => gameHeight};
  transform-origin: ${({ resize: { width, height } = {}, theme: { widthNoUnit } }) => width < widthNoUnit ? 'top left' : 'center'};
`
