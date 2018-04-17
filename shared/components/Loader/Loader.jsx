import React, { PureComponent } from 'react'
import LazyImage from '../Common/LazyImage'
import ScaledWrapper from '../Common/ScaledWrapper'
import glamorous from 'glamorous'
import Animation from '../Animations'
import PropTypes from 'prop-types'

const StyledImageContainer = glamorous.div(({ loaderImgType }) => ({
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
  static propTypes = {
    active: PropTypes.bool,
    onLoaderDone: PropTypes.func
  }

  static defaultProps = {
    active: false
  }

  composeHandler = () => {
    const { active, onLoaderDone } = this.props

    if (!active || !onLoaderDone) {
      return null
    }

    return onLoaderDone
  }

  render () {
    const { active } = this.props

    return (
      <ScaledWrapper>
        <StyledLoader>
          <StyledImageContainer loaderImgType='gangsta'>
            <Animation name='moveLoaderNameUp' active={active}>
              <LazyImage
                src='/static/assets/images/menu/gangsterclaus.png'
              />
            </Animation>
          </StyledImageContainer>
          <StyledImageContainer loaderImgType='skull'>
            <Animation name={active ? 'fadeUpLoaderSkull' : 'pulsate'} active onAnimationEnd={this.composeHandler()}>
              <LazyImage
                src='/static/assets/images/menu/skull.png'
              />
            </Animation>
          </StyledImageContainer>
        </StyledLoader>
      </ScaledWrapper>
    )
  }
}
