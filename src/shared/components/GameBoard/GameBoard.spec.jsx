import componentHelper from 'test/component-helper'
import GameBoard from './GameBoard'

const renderComponent = componentHelper(GameBoard)

describe('components/GameBoard', () => {
  describe('Given this component', () => {
    it('renders without crashing', () => {
      const { wrapper } = renderComponent()

      expect(wrapper.exists()).toBe(true)
    })
  })
})
