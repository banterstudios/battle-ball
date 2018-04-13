import React, { Component } from 'react'

export default class Home extends Component {
  render () {
    const { children } = this.props

    return (
      <div className='home'>
        { children }
      </div>
    )
  }
}
