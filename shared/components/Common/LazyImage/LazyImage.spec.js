import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import LazyImage from './LazyImage'

describe('components/Gui/LazyImage', () => {
  let initialProps

  beforeEach(() => {
    initialProps = {
      src: '',
      alt: '',
      bgPos: '',
      bgSize: '',
      bgRepeat: ''
    }
  })

  describe('@renders', () => {
    it('in default state', () => {
      const component = mount(<LazyImage { ...initialProps } />)

      expect(toJson(component)).toMatchSnapshot()
      component.unmount()
    })

    it('a div with a background image', () => {
      const component = mount(<LazyImage { ...initialProps } useBgImage />)

      expect(toJson(component)).toMatchSnapshot()
      component.unmount()
    })
  })
})
