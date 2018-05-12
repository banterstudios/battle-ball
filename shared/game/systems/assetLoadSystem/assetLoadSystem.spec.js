import assetLoadSystem from './assetLoadSystem'

jest.mock('../../../utils/audioUtils', () => ({
  getAudio: (url) => url === 'reject' ? (
    Promise.reject(new Error('failed'))
  ) : Promise.resolve('audio')
}))

jest.mock('../../../utils/imageUtils', () => ({
  getImage: (url) => url === 'reject' ? (
    Promise.reject(new Error('failed'))
  ) : Promise.resolve('image')
}))

describe('@assetLoadSystem', () => {
  describe('Given this function', () => {
    describe('When called', () => {
      describe('And entities is not an array', () => {
        it('resolves to an empty array', async () => {
          const data = await assetLoadSystem()
          expect(data).toEqual([])
        })
      })

      describe('And entities is an array', () => {
        describe('And entities src resolves', () => {
          it('updates components correctly', async () => {
            const entities = [{
              type: 'sprite',
              setImage: jest.fn(),
              url: ''
            }, {
              type: 'audio',
              setAudio: jest.fn(),
              url: ''
            }]

            await assetLoadSystem(entities)

            expect(entities[0].setImage).toHaveBeenCalledTimes(1)
            expect(entities[0].setImage).toHaveBeenCalledWith('image')

            expect(entities[1].setAudio).toHaveBeenCalledTimes(1)
            expect(entities[1].setAudio).toHaveBeenCalledWith('audio')
          })
        })

        describe('And entities src rejects', () => {
          it('throws an error', () => {
            const entities = [{
              type: 'sprite',
              setImage: jest.fn(),
              url: 'reject'
            }, {
              type: 'audio',
              setAudio: jest.fn(),
              url: 'reject'
            }]

            expect(assetLoadSystem(entities)).rejects.toThrowError('failed')
          })
        })

        describe('And entities are incorrect type', () => {
          it('resolves', async () => {
            const entities = [{
              type: 'fake'
            }, {
              type: 'fake'
            }]

            const data = await assetLoadSystem(entities)

            expect(data).toEqual([null, null])
          })
        })
      })
    })
  })
})
