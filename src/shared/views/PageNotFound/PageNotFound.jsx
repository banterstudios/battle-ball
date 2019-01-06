import React from 'react'
import PropTypes from 'prop-types'

const PageNotFound = ({ children }) => (
  <div className='page-not-found'>
    Could not find the page!!
    { children }
  </div>
)

PageNotFound.defaultProps = {
  children: null
}

PageNotFound.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ])
}

export default PageNotFound
