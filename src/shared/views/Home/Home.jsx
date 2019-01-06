import React from 'react'
import PropTypes from 'prop-types'

const HomeView = ({ children }) => (
  <div className='home-view'>
    { children }
  </div>
)

HomeView.defaultProps = {
  children: null
}

HomeView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ])
}

export default HomeView
