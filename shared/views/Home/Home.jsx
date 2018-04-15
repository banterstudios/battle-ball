import React, { Component } from 'react'
import glamorous from 'glamorous'

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
