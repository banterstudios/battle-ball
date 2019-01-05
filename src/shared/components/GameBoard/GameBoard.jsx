import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import withScaledWrapper from 'shared/hoc/withScaledWrapper'
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

const GameBoard = ({ gameWidth, gameHeight }) => {
  const gameRef = useRef()
  const gameInstance = useRef()

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
      gameWidth={gameWidth || GAME_WIDTH}
      gameHeight={gameHeight || GAME_HEIGHT}
      ref={gameRef}
    />
  )
}

GameBoard.propTypes = {
  gameWidth: PropTypes.number,
  gameHeight: PropTypes.number
}

export default withScaledWrapper(GameBoard)
