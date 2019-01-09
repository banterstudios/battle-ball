import React, { useRef, useEffect } from 'react'
import { withTheme } from 'styled-components'
import useScaledResize from 'shared/hooks/useScaledResize'
import Game from 'game'
import { Boot, Play, Preload } from 'game/states'
import { GAME_WIDTH, GAME_HEIGHT } from 'game/consts'
import { GameCanvas } from './styles'

const initGame = (game) => {
  const { stateManager } = game

  stateManager.add('boot', Boot)
  stateManager.add('preload', Preload)
  stateManager.add('play', Play)

  stateManager.start('boot')
}

const GameBoard = ({ theme }) => {
  const gameRef = useRef()
  const gameInstance = useRef()
  const { widthNoUnit: width, heightNoUnit: height } = theme.game
  const dimensions = useScaledResize({ width, height })

  useEffect(() => {
    gameInstance.current = new Game({
      canvas: gameRef.current,
      init: initGame,
      width: GAME_WIDTH,
      height: GAME_HEIGHT
    })

    return () => {
      gameInstance.current.stop()
    }
  }, [])

  return (
    <GameCanvas
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      gameWidth={dimensions.width || GAME_WIDTH}
      gameHeight={dimensions.height || GAME_HEIGHT}
      ref={gameRef}
    />
  )
}

export default withTheme(GameBoard)
