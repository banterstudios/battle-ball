import React from 'react'
import { withTheme } from 'styled-components'
import { calculateScaleForGame } from 'shared/utils/commonUtils'
import useWindowResize from '@banterstudiosuk/use-window-resize'

const withScaledWrapper = (WrappedComponent) => {
  const WithScaledWrapper = (props) => {
    const { innerWidth, innerHeight } = useWindowResize()
    const {
      theme: {
        game: {
          heightNoUnit,
          widthNoUnit
        }
      }
    } = props

    const gameDimensions = calculateScaleForGame({
      gameHeight: heightNoUnit,
      gameWidth: widthNoUnit,
      windowWidth: innerWidth,
      windowHeight: innerHeight
    })

    return (
      <WrappedComponent
        gameWidth={widthNoUnit * gameDimensions.width}
        gameHeight={heightNoUnit * gameDimensions.height} />
    )
  }

  return withTheme(WithScaledWrapper)
}

export default withScaledWrapper
