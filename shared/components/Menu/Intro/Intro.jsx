import React, { PureComponent, Fragment } from 'react'
import LazyImage from '../../Common/LazyImage'
import ScaledWrapper from '../../Common/ScaledWrapper'
import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import { Pulsate } from '../../Animations'
import { Spring, Trail, config, animated, template } from 'react-spring'

const StyledImageContainer = glamorous.div(({ opacity, translateX, translateY }) => ({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: `translate3d(${translateX}%, ${translateY}%, 0)`,
  opacity
}))

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
        config={config.slow}
        from={{ x: -50, y: 260 }}
        to={{ x: -50, y: active ? 0 : 260 }}
      >
        {
          ({ x, y }) => (
            <StyledImageContainer
              translateX={x}
              translateY={y}
              opacity={1}
            >
              <LazyImage
                src='/static/assets/images/menu/gangsterclaus.png'
              />
            </StyledImageContainer>
          )
        }
      </Spring>
      <Spring
        config={config.slow}
        from={{ x: -50, y: 0, opacity: 1 }}
        to={{ x: -50, y: active ? -100 : 0, opacity: active ? 0 : 1 }}
        onRest={onEnd}
      >
        {
          ({ x, y, opacity }) => (
            <StyledImageContainer
              translateX={x}
              translateY={y}
              opacity={opacity}
            >
              <Pulsate disabled={active}>
                <LazyImage
                  src='/static/assets/images/menu/skull.png'
                />
              </Pulsate>
            </StyledImageContainer>
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
      <Trail
        native
        config={config.gentle}
        from={{ opacity: 0, x: 100 }}
        to={{ opacity: 1, x: 0 }}
        keys={[1, 2, 3]}>
        {[1, 2, 3].map(item => ({ x, opacity }) => (
          <animated.div
            style={{ opacity, transform: template`translate3d(${x}%,0,0)`, width: '30%', height: '30px', background: 'orange' }}
          />
        ))}
      </Trail>
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
