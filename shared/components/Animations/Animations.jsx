import glamorous from 'glamorous'
import { css } from 'glamor'

const ANIMATIONS = {
  pulsate: {
    name: css.keyframes({
      '0%': {
        transform: 'scale3d(1, 1, 1)'
      },
      '14%': {
        transform: 'scale3d(1.05, 1.05, 1.05)'
      },
      '28%': {
        transform: 'scale3d(1, 1, 1)'
      },
      '42%': {
        transform: 'scale3d(1.05, 1.05, 1.05)'
      },
      '70%': {
        transform: 'scale3d(1, 1, 1)'
      }
    }),
    query: '1300ms ease 0s infinite normal'
  },
  moveLoaderNameUp: {
    name: css.keyframes({
      from: {
        transform: 'translate3d(0,0,0)'
      },
      to: {
        transform: 'translate3d(0,-88px,0)'
      }
    }),
    query: '1s ease-out forwards'
  },
  fadeUpLoaderSkull: {
    name: css.keyframes({
      from: {
        opacity: 1,
        transform: 'translate3d(0,0,0)'
      },
      to: {
        opacity: 0,
        transform: 'translate3d(0,-137px,0)'
      }
    }),
    query: '1s ease-out forwards'
  }
}

export default glamorous.div(({ active, name }) => {
  const animation = ANIMATIONS[name]
  return { animation: (animation && active) ? `${animation.name} ${animation.query}` : 'none' }
})
