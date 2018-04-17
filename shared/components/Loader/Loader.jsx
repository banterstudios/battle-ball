import React, { PureComponent } from 'react'
import LazyImage from '../Common/LazyImage'
import ScaledWrapper from '../Common/ScaledWrapper'
import glamorous from 'glamorous'

const StyledLazyImage = glamorous(LazyImage)(() => ({
  position: 'absolute',
  top: '50%',
  left: '0',
  width: 'auto',
  transform: 'translateY(-50%)'
}))

export default class Loader extends PureComponent {
  render () {
    return (
      <ScaledWrapper>
        <div className='loader'>
          <StyledLazyImage src='/static/assets/images/menu/gangsterclaus.png' />
          <StyledLazyImage src='/static/assets/images/menu/skull.png' />
        </div>
      </ScaledWrapper>
    )
  }
}

/*
  <img class="gangsterclaus" src="game/assets/menu/gangsterclaus.png" />
  <img class="skull heartbeat" src="game/assets/menu/skull.png" />
*/
