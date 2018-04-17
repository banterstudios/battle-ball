import React, { PureComponent } from 'react'
import glamorous from 'glamorous'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const transitionTime = 200

const Container = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: `opacity ${transitionTime}ms ease-out`,
  opacity: 0,
  '.fade-in-enter': {
    opacity: 0
  },
  '.fade-in-enter-active': {
    opacity: 1
  },
  '.fade-in-exit': {
    opacity: 1
  },
  '.fade-in-exit-active': {
    opacity: 0
  }
})

export default class FadeIn extends PureComponent {
  static propTypes = {
    in: PropTypes.bool
  }

  render () {
    const { children, ...rest } = this.props

    return (
      <CSSTransition {...rest} timeout={transitionTime} classNames='fadeIn' unmountOnExit>
        <Container>{children}</Container>
      </CSSTransition>
    )
  }
}
