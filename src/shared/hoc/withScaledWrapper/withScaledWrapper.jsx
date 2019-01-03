import React, { Component } from 'react'
import { withTheme } from 'styled-components'
import { calculateScaleForGame } from 'shared/utils/commonUtils'

const withScaledWrapper = (WrappedComponent) => {
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

  return withTheme(WithScaledWrapper)
}

export default withScaledWrapper
