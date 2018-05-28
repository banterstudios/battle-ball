import React, { Component } from 'react'
import { withScaledWrapper } from '../../Common/ScaledWrapper'
import Game from '../../../game'
import {
  Boot,
  Play,
  Preload
} from '../../../game/states'

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
      <canvas
        width={1200}
        height={600}
        style={{ width: this.props.gameWidth, height: this.props.gameHeight }}
        ref={this.gameRef}
      />
    )
  }
}
