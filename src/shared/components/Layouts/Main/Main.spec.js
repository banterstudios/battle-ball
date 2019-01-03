import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Main from './Main'

describe('components/Layouts/Main', () => {
  describe('@renders', () => {
    it('should render correctly', () => {
      const component = shallow(<Main />)

      expect(toJson(component)).toMatchSnapshot()
      component.unmount()
    })
  })
})
