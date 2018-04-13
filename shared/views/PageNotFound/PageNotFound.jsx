import React, { Component } from 'react'

export default class PageNotFound extends Component {
  render () {
    const { children } = this.props

    return (
      <div className='page-not-found'>
        Could not find the page!!
        { children }
      </div>
    )
  }
}
