import React, { Component } from 'react'
import glamorous from 'glamorous'
import GameBoard from '../../components/Game'

const StyledView = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class GameView extends Component {
  state = { isClient: false }

  componentDidMount () {
    this.setState({ isClient: true })
  }

  render () {
    if (!this.state.isClient) {
      return null
    }

    return (
      <StyledView>
        <GameBoard />
      </StyledView>
    )
  }
}
