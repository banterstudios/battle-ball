import React, { Component } from 'react'
import withScaledWrapper from 'shared/hoc/withScaledWrapper'
import Game from 'game'
import { Boot, Play, Preload } from 'game/states'
import { GAME_WIDTH, GAME_HEIGHT } from 'game/consts'

@withScaledWrapper
export default class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.gameRef = React.createRef()
    this.game = null
  }

  componentDidMount () {
    this.game = new Game({
      canvas: this.gameRef.current,
      init: this.initGame,
      width: GAME_WIDTH,
      height: GAME_HEIGHT
    })
  }

  initGame = (game) => {
    const { stateManager } = game

    stateManager.add('boot', Boot)
    stateManager.add('preload', Preload)
    stateManager.add('play', Play)

    stateManager.start('boot')
  }

  componentWillUnmount () {
    this.game.stop()
    this.game = null
  }

  render () {
    return (
      <canvas
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        style={{
          width: this.props.gameWidth || GAME_WIDTH,
          height: this.props.gameHeight || GAME_HEIGHT
        }}
        ref={this.gameRef}
      />
    )
  }
}
