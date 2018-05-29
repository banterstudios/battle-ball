import { mapToIsoCoord, isoToMapCoord } from './mathUtils'

describe('mathUtils', () => {
  describe('@mapToIsoCoord', () => {
    it('correctly provides iso coordinates', () => {
      expect(mapToIsoCoord(32, 32, 32, 32)).toEqual({ x: 0, y: 1024 })
    })
  })

  describe('@isoToMapCoord', () => {
    it('correctly provides map coordinates', () => {
      expect(isoToMapCoord(0, 1024, 32, 32)).toEqual({ x: 32, y: 32 })
    })
  })
})
