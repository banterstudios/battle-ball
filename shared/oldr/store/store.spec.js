import store from './store'

describe('store - store', () => {
  it('should exist', () => {
    expect(store).toBeDefined()
  })

  it('should be an object', () => {
    expect(store).toBeInstanceOf(Object)
  })
})
