import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from 'shared/components/App'

const Client = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default hot(module)(Client)
