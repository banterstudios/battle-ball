import React, { Component } from 'react'
import glamorous from 'glamorous'
import SplashScreen from '../../components/SplashScreen'
import Loader from '../../components/Loader'
import Intro from '../../components/Menu/Intro'

const StyledView = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class GameView extends Component {
  state = { active: false, showLoader: false, showSplashScreen: true }
  componentDidMount () {
    setTimeout(() => this.setState({ active: true, showSplashScreen: false, showLoader: true }), 2000)
  }
  render () {
    const { showLoader, active, showSplashScreen } = this.state

    return (
      <StyledView>
        { (showSplashScreen && !active) && <SplashScreen /> }
        { (!showSplashScreen && showLoader) && <Loader active={active} onLoaderDone={() => { console.log('done'); this.setState({ showLoader: false }) }} /> }
        { (!showLoader && !showSplashScreen) && <Intro /> }
      </StyledView>
    )
  }
}
