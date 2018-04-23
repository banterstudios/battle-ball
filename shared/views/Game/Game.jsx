import React, { Component } from 'react'
import glamorous from 'glamorous'
import { Intro, Leaderboard } from '../../components/Menu'

const StyledView = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class GameView extends Component {
  state = { active: false, showLoader: true, isClient: false, isLoading: true }
  componentDidMount () {
    this.setState({ isClient: true })
    setTimeout(() => this.setState({ active: true }), 3000)
  }
  render () {
    const { showLoader, active, isClient, isLoading } = this.state

    if (!isClient) {
      return null
    }

    return (
      <StyledView>
        {
          (showLoader) && (
            <Intro
              active={active}
              isLoading={isLoading}
              onEnd={() => { active ? this.setState({ isLoading: false }) : null } }
            />
          )
        }
      </StyledView>
    )
  }
}
