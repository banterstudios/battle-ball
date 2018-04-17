import React, { Component } from 'react'
import Loader from '../../components/Loader'

export default class GameView extends Component {
  render () {
    return (
      <div className='game-view'>
        <Loader />
      </div>
    )
  }
}
