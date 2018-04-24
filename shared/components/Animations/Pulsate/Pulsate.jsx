import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animate } from 'react-move'
import { easeQuadOut } from 'd3-ease'

export default class Pulsate extends PureComponent {
  static propTypes = {
    scaleFrom: PropTypes.number,
    scaleTo: PropTypes.number,
    duration: PropTypes.number
  }

  static defaultProps = {
    scaleFrom: 1,
    scaleTo: 1.03,
    duration: 1000
  }

  state = { active: true }

  toggleActive = () => {
    this.setState(({ active }) => ({ active: !active }))
  }

  render () {
    const { duration, scaleFrom, scaleTo, children } = this.props
    const { active } = this.state

    return (
      <Animate
        start={() => ({
          scale: scaleFrom
        })}

        update={() => ({
          scale: [active ? scaleTo : scaleFrom],
          timing: { duration, ease: easeQuadOut },
          events: { end: this.toggleActive }
        })}
      >
        {({ scale }) => (
          <div
            style={{
              position: 'relative',
              willChange: 'transform',
              transform: `scale3d(${scale}, ${scale}, ${scale})`
            }}
          >
            {children}
          </div>
        )}
      </Animate>
    )
  }
}
