import componentHelper from 'test/component-helper'
import App from './App'

const renderComponent = componentHelper(App)

describe('components/App', () => {
  describe('Given this component', () => {
    it('renders without crashing', () => {
      const { wrapper } = renderComponent()

      expect(wrapper.exists()).toBe(true)
    })
  })
})
