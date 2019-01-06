import Styled from 'styled-components'

export const GameCanvas = Styled.canvas.attrs({
  width: `${({ width }) => width}`,
  height: `${({ height }) => height}`
})`
  width: ${({ gameWidth }) => gameWidth}px;
  height: ${({ gameHeight }) => gameHeight}px;
  transition: all .2s ease-out;
`
