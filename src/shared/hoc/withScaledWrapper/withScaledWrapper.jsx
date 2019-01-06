import React from 'react'
import { withTheme } from 'styled-components'
import { calculateScaleForGame } from 'shared/utils/commonUtils'
import useWindowResize from '@banterstudiosuk/use-window-resize'

const withScaledWrapper = (WrappedComponent) => {
  const ScaledWrapper = (props) => {
    const { innerWidth, innerHeight } = useWindowResize()
    const {
      theme: {
        game: {
          heightNoUnit,
          widthNoUnit
        }
      }
    } = props

    const scaleFactor = calculateScaleForGame({
      gameHeight: heightNoUnit,
      gameWidth: widthNoUnit,
      windowWidth: innerWidth,
      windowHeight: innerHeight
    })

    return (
      <WrappedComponent
        gameWidth={widthNoUnit * scaleFactor.width}
        gameHeight={heightNoUnit * scaleFactor.height} />
    )
  }

  return withTheme(ScaledWrapper)
}

export default withScaledWrapper
