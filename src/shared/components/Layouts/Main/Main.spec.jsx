import componentHelper from 'test/component-helper'
import Main from './Main'

const renderComponent = componentHelper(Main)

describe('components/Layouts/Main', () => {
  describe('Given this component', () => {
    it('renders without crashing', () => {
      const { wrapper } = renderComponent()

      expect(wrapper.exists()).toBe(true)
    })
  })
})
