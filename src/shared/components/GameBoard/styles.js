import Styled from 'styled-components'

export const GameCanvas = Styled.canvas.attrs({
  width: `${({ width }) => width}`,
  height: `${({ height }) => height}`
})`
  width: ${({ gameWidth }) => gameWidth},
  height: ${({ gameHeight }) => gameHeight},
`
