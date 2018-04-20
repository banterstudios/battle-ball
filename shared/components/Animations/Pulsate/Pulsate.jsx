import React, { PureComponent } from 'react'
import { Spring, Keyframes, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'
import PropTypes from 'prop-types'

export default class Pulsate extends PureComponent {
  static propTypes = {
    scaleFrom: PropTypes.number,
    scaleTo: PropTypes.number,
    duration: PropTypes.number,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    scaleFrom: 1,
    scaleTo: 1.03,
    duration: 1300
  }

  render () {
    const { duration, scaleFrom, scaleTo, children, disabled } = this.props

    return (
      <Keyframes
        reset
        native
        keys={['pulsate']}
        impl={TimingAnimation}
        config={{ duration, easing: Easing.elastic(3) }}
        script={async (next) => {
          while (true) {
            await next(Spring, {
              from: {
                scale: scaleFrom
              },
              to: {
                scale: scaleTo
              }
            })
            await next(Spring, {
              from: {
                scale: scaleTo
              },
              to: {
                scale: scaleFrom
              }
            })
          }
        }}
      >
        {
          ({ scale }) => (
            !disabled ? (
              <animated.div
                style={{
                  position: 'relative',
                  willChange: 'transform',
                  transform: scale.interpolate(r => `scale3d(${r}, ${r}, ${r})`)
                }}
              >
                {children}
              </animated.div>
            ) : children
          )
        }
      </Keyframes>
    )
  }
}
