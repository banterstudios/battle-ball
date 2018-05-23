import React, { Component } from 'react'
import Game from '../../../game'
import {
  Boot,
  Play,
  Preload
} from '../../../game/states'

export default class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.gameRef = React.createRef()
    this.game = null
  }

  componentDidMount () {
    this.game = new Game({
      canvas: this.gameRef,
      init: this.initGame
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

  // React render
  render () {
    return (
      <canvas ref={this.gameRef} />
    )
  }
}
