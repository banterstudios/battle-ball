import componentHelper from 'test/component-helper'
import withScaledWrapper from './withScaledWrapper'

const DummyComponent = () => <div />

const renderComponent = componentHelper(withScaledWrapper(DummyComponent))

describe('components/GameBoard', () => {
  describe('Given this component', () => {
    it('renders without crashing', () => {
      const { wrapper } = renderComponent()

      expect(wrapper.exists()).toBe(true)
    })
  })
})
