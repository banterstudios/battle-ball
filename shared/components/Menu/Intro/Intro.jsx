import React, { PureComponent, Fragment } from 'react'
import LazyImage from '../../Common/LazyImage'
import ScaledWrapper from '../../Common/ScaledWrapper'
import glamorous from 'glamorous'
import Animation from '../../Animations'
import PropTypes from 'prop-types'
import { Spring, Keyframes, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'

const StyledImageContainer = glamorous.div(({ loaderImgType }) => ({
  position: 'relative',
  transform: loaderImgType === 'gangsta' ? 'translateY(-50%)' : 'none',
  zIndex: loaderImgType === 'skull' ? 2 : 1
}))

const StyledImageRelativeContainer = glamorous.div({
  position: 'relative',
  marginTop: '20px'
})

const StyledIntro = glamorous.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
})

export default class Intro extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    isLoading: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    active: false,
    isLoading: true
  }

  composeHandler = () => {
    const { active, onEnd } = this.props

    if (!active || !onEnd) {
      return null
    }

    return onEnd
  }

  renderLoader = ({ active }) => (
    <Fragment>
      <StyledImageContainer loaderImgType='skull'>
        <Keyframes
          reset
          native
          keys={['pulsate']}
          impl={TimingAnimation}
          config={{ duration: 1300, easing: Easing.elastic(3) }}
          script={async (next) => {
            while (true) {
              await next(Spring, {
                from: {
                  scale: 1
                },
                to: {
                  scale: 1.03
                }
              })
              await next(Spring, {
                from: {
                  scale: 1.03
                },
                to: {
                  scale: 1
                }
              })
            }
          }}
        >
          {
            ({ scale }) => (
              <animated.div
                style={{
                  position: 'relative',
                  willChange: 'transform',
                  transform: scale.interpolate(r => `scale3d(${r}, ${r}, ${r})`)
                }}
              >
                <LazyImage
                  src='/static/assets/images/menu/skull.png'
                />
              </animated.div>
            )
          }
        </Keyframes>

        {/* <Animation name={active ? 'fadeUpLoaderSkull' : 'pulsate'} active onAnimationEnd={this.composeHandler()}>
          <LazyImage
            src='/static/assets/images/menu/skull.png'
          />
        </Animation> */}
      </StyledImageContainer>
      <StyledImageContainer loaderImgType='gangsta'>
        <Animation name='moveLoaderNameUp' active={active}>
          <LazyImage
            src='/static/assets/images/menu/gangsterclaus.png'
          />
        </Animation>
      </StyledImageContainer>
    </Fragment>
  )

  renderOptions = () => (
    <Fragment>
      <StyledImageRelativeContainer>
        <LazyImage
          src='/static/assets/images/menu/gangsterclaus.png'
        />
      </StyledImageRelativeContainer>
    </Fragment>
  )

  render () {
    const { active, isLoading } = this.props

    return (
      <ScaledWrapper>
        <StyledIntro>
          {
            isLoading ? (
              this.renderLoader({ active })
            ) : (
              this.renderOptions()
            )
          }
        </StyledIntro>
      </ScaledWrapper>
    )
  }
}
