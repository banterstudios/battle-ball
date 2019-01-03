import React, { Component } from 'react'
import listenToWindowEvents from 'shared/containers/ListenToWindowEvents'
import { calculateScaleForGame } from 'shared/utils/commonUtils'
import { withTheme } from 'styled-components'
import { ScaledWrapper } from './styles'

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
