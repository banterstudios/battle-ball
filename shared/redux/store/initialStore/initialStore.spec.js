import initialStore from './initialStore'

describe('store - initialStore', () => {
  it('should exist', () => {
    expect(initialStore).toBeDefined()
  })

  it('should be an object', () => {
    expect(initialStore).toBeInstanceOf(Object)
  })
})
