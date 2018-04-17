import React, { Component } from 'react'
import PropTypes from 'prop-types'
import glamorous from 'glamorous'

const Content = glamorous.div(() => ({
  position: 'relative',
  width: '100%',
  height: '100%'
}))

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node
    ])
  }

  render () {
    const { children } = this.props

    return (
      <Content>
        { children }
      </Content>
    )
  }
}
