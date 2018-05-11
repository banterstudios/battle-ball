// React
import React, { Component } from 'react'

// Consts
import { GAME_STATES } from '../../../consts/game'

// Core
import TimeManager from '../../../game/TimeManager'
import LoadManager from '../../../game/LoadManager'

// Utils
import { requestAnimationFrame, cancelAnimationFrame } from '../../../utils/domUtils'

export default class GameBoard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gameState: GAME_STATES.LOADER
    }

    // Instance Variables
    this.gameRef = React.createRef()
    this.reqAnimFrameId = null

    // Game Variables
    this.timeManager = new TimeManager()
    this.loadManager = new LoadManager()
  }

  componentDidMount () {
    // Start the game.
    this.loop()
  }

  componentWillUnmount () {
    this.cleanUp()
  }

  // Game core cycles
  preload = () => {
    this.loadManager.loadAssets([''])
  }

  update = (step) => {
    switch (this.gameState) {
      case GAME_STATES.PLAY:
        break

      case GAME_STATES.MENU:
        this.timeManager.reset()
        break

      case GAME_STATES.END:
        break

      case GAME_STATES.LOADER:
        break
    }
  }

  draw = () => {
    // Draw the game.
  }

  loop = () => {
    this.timeManager.run(this.update, this.draw)
    this.reqAnimFrameId = requestAnimationFrame(this.loop)
  }

  cleanUp = () => {
    cancelAnimationFrame(this.reqAnimFrameId)
  }

  // React render
  render () {
    return (
      <canvas ref={this.gameRef} />
    )
  }
}
