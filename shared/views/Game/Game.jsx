import React, { Component } from 'react'
import glamorous from 'glamorous'
import Loader from '../../components/Loader'
import Intro from '../../components/Menu/Intro'

const StyledView = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class GameView extends Component {
  state = { active: false, showLoader: true }
  componentDidMount () {
    setTimeout(() => this.setState({ active: true }), 2000)
  }
  render () {
    const { showLoader, active } = this.state

    return (
      <StyledView>
        { showLoader && <Loader active={active} onLoaderDone={() => { console.log('done'); this.setState({ showLoader: false }) }} /> }
        { !showLoader && <Intro /> }
      </StyledView>
    )
  }
}
