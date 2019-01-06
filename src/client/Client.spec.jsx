import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import componentHelper from 'test/component-helper'
import Client from './Client'

const ComposedComponent = (props) => (
  <Router><Client {...props} /></Router>
)

const renderComponent = componentHelper(ComposedComponent)

describe('client', () => {
  describe('Given this component', () => {
    it('renders without crashing', () => {
      const { wrapper } = renderComponent()

      expect(wrapper.exists()).toBe(true)
    })
  })
})
