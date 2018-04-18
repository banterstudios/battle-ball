import React, { Component } from 'react'
import glamorous from 'glamorous'
import Intro from '../../components/Menu/Intro'

const StyledView = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class GameView extends Component {
  state = { active: false, showLoader: true, isClient: false }
  componentDidMount () {
    this.setState({ isClient: true })
    // setTimeout(() => this.setState({ active: true, showLoader: true }), 2000)
  }
  render () {
    const { showLoader, active, isClient } = this.state

    if (!isClient) {
      return null
    }

    return (
      <StyledView>
        {
          (showLoader) && (
            <Intro
              active={active}
              onLoaderDone={() => this.setState({ showLoader: false }) }
            />
          )
        }
      </StyledView>
    )
  }
}
