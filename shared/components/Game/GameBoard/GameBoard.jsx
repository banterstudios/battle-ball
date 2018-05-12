import React, { Component } from 'react'
import Game from '../../../game'

export default class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.gameRef = React.createRef()
    this.game = null
  }

  componentDidMount () {
    this.game = new Game({ canvas: this.gameRef })
    this.game.start()
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
