import React, { PureComponent } from 'react'
import LazyImage from '../Common/LazyImage'
import ScaledWrapper from '../Common/ScaledWrapper'
import glamorous from 'glamorous'

const StyledLazyImage = glamorous(LazyImage)(({ loaderImgType }) => ({
  position: 'absolute',
  top: loaderImgType === 'skull' ? '20px' : '116px',
  left: '50%',
  width: 'auto',
  transform: 'translateX(-50%)'
}))

const StyledLoader = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class Loader extends PureComponent {
  render () {
    return (
      <ScaledWrapper>
        <StyledLoader>
          <StyledLazyImage
            src='/static/assets/images/menu/gangsterclaus.png'
            loaderImgType='gangsta'
          />
          <StyledLazyImage
            src='/static/assets/images/menu/skull.png'
            loaderImgType='skull'
          />
        </StyledLoader>
      </ScaledWrapper>
    )
  }
}
