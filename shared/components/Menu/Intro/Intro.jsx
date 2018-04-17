import React, { PureComponent } from 'react'
import LazyImage from '../../Common/LazyImage'
import ScaledWrapper from '../../Common/ScaledWrapper'
import glamorous from 'glamorous'

const StyledImageContainer = glamorous.div({
  position: 'relative',
  display: 'inline-block',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)'
})

export default class Intro extends PureComponent {
  render () {
    return (
      <ScaledWrapper>
        <StyledImageContainer>
          <LazyImage src='/static/assets/images/menu/gangsterclaus.png' />
        </StyledImageContainer>
      </ScaledWrapper>
    )
  }
}
