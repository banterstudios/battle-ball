import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import listenToWindowEvents from '../../../redux/containers/ListenToWindowEvents'
import { calculateScaleForGame } from '../../../utils/commonUtils'

const generateStyleProps = ({
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
}

const ScaledWrapper = glamorous.div(generateStyleProps)

export default listenToWindowEvents({ eventTypes: ['resize'] })(ScaledWrapper)

export const withScaledWrapper = (WrappedComponent) => {
  class WithScaledWrapper extends Component {
    render () {
      const {
        theme: {
          game: {
            heightNoUnit,
            widthNoUnit
          }
        },
        resize: { width, height } = {}
      } = this.props

      const gameDimensions = calculateScaleForGame({ gameHeight: heightNoUnit, gameWidth: widthNoUnit, windowWidth: width, windowHeight: height })

      return <WrappedComponent
        gameWidth={widthNoUnit * gameDimensions.width}
        gameHeight={heightNoUnit * gameDimensions.height} />
    }
  }

  return listenToWindowEvents({ eventTypes: ['resize'] })(withTheme(WithScaledWrapper))
}
