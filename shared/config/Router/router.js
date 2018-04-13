import React from 'react'

import {
  BrowserRouter
} from 'react-router-dom'

import App from '../../components/App'

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
