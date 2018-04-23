import React, { PureComponent, Fragment } from 'react'
import LazyImage from '../../Common/LazyImage'
import ScaledWrapper from '../../Common/ScaledWrapper'
import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import { Pulsate } from '../../Animations'
import { Spring, Trail, config, animated } from 'react-spring'

// const StyledImageContainer = glamorous.div(({ opacity, translateX, translateY }) => ({
//   position: 'absolute',
//   top: '20px',
//   left: '50%',
//   transform: `translate3d(${translateX}%, ${translateY}%, 0)`,
//   opacity
// }))

const StyledImageRelativeContainer = glamorous.div({
  position: 'relative',
  marginTop: '20px',
  width: '50%'
})

const StyledIntro = glamorous.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
})

const IntroContentWrapper = glamorous.div({
  position: 'relative',
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  width: '100%'
})

const IntroContent = glamorous.div({
  position: 'relative',
  width: '50%'
})

const customSpringConfig = {
  tension: 280,
  friction: 40
}

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

  renderLoader = ({ active, onEnd }) => (
    <Fragment>
      <Spring
        config={customSpringConfig}
        from={{ x: -50, y: 260 }}
        to={{ x: -50, y: active ? 0 : 260 }}
      >
        {
          ({ x, y }) => (
            <animated.div
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: `translate3d(${x}%,${y}%,0)`
              }}
            >
              <LazyImage
                src='/static/assets/images/menu/gangsterclaus.png'
              />
            </animated.div>
          )
        }
      </Spring>
      <Spring
        config={customSpringConfig}
        from={{ x: -50, y: 0, opacity: 1 }}
        to={{ x: -50, y: active ? -100 : 0, opacity: active ? 0 : 1 }}
        onRest={onEnd}
      >
        {
          ({ x, y, opacity }) => (
            <animated.div
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                opacity,
                transform: `translate3d(${x}%,${y}%,0)`
              }}
            >
              <Pulsate disabled={active}>
                <LazyImage
                  src='/static/assets/images/menu/skull.png'
                />
              </Pulsate>
            </animated.div>
          )
        }
      </Spring>
    </Fragment>
  )

  renderOptions = () => (
    <Fragment>
      <StyledImageRelativeContainer>
        <LazyImage
          noAnimation
          src='/static/assets/images/menu/gangsterclaus.png'
        />
      </StyledImageRelativeContainer>
      <IntroContentWrapper>
        <IntroContent css={{ marginLeft: '20%' }}>
          <Trail
            native
            config={config.gentle}
            from={{ opacity: 0, x: -50 }}
            to={{ opacity: 1, x: 0 }}
            keys={[1]}>
            {[1].map(item => ({ x, opacity }) => (
              <animated.div
                style={{
                  position: 'relative',
                  opacity,
                  transform: x.interpolate((pos) => `translate3d(${pos}%,0,0)`),
                  width: '100%'
                }}
              >
                <LazyImage
                  src='/static/assets/images/menu/santarun.gif'
                />
              </animated.div>
            ))}
          </Trail>
        </IntroContent>
        <IntroContent>
          <Trail
            native
            config={config.gentle}
            from={{ opacity: 0, x: 50 }}
            to={{ opacity: 1, x: 0 }}
            keys={[1, 2, 3]}>
            {['Play', 'Leaderboards', 'Settings'].map(item => ({ x, opacity }) => (
              <animated.div
                style={{
                  opacity,
                  transform: x.interpolate((pos) => `translate3d(${pos}%,0,0)`),
                  width: '100%',
                  height: '30px',
                  color: '#787878',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 20
                }}
              >
                {item}
              </animated.div>
            ))}
          </Trail>
        </IntroContent>
      </IntroContentWrapper>
    </Fragment>
  )

  render () {
    const { active, isLoading, onEnd } = this.props

    return (
      <ScaledWrapper>
        <StyledIntro>
          {
            isLoading ? (
              this.renderLoader({ active, onEnd })
            ) : (
              this.renderOptions()
            )
          }
        </StyledIntro>
      </ScaledWrapper>
    )
  }
}
