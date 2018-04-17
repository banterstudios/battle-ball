import React, { Component } from 'react'

export default class HomeView extends Component {
  render () {
    const { children } = this.props

    return (
      <div className='home-view'>
        { children }
      </div>
    )
  }
}
