import React, { PureComponent } from 'react'
import glamorous from 'glamorous'
import LazyImage from '../Common/LazyImage'
import Animation from '../Animations'

const StyledContainer = glamorous.div(({ theme: { splashScreenBg } }) => ({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: splashScreenBg
}))

export default class SplashScreen extends PureComponent {
  render () {
    return (
      <StyledContainer>
        <Animation name='pulsate' active>
          <LazyImage src='/static/assets/images/menu/skull.png' css={{ width: '320px' }} />
        </Animation>
      </StyledContainer>
    )
  }
}
