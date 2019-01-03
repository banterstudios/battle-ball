import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { MemoryRouter as Router } from 'react-router-dom'

describe('components/App', () => {
  describe('@renders', () => {
    it('should render correctly', () => {
      const component = shallow(<Router><App /></Router>)

      expect(component.exists()).toBe(true)
      component.unmount()
    })
  })
})
