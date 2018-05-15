import EntityManager from './EntityManager'

const createFakeComponent = ({ name }) => ({
  [name]: {
    name,
    state: {
      test: name
    }
  }
})

const createFakeEntityData = ({ name, entityId }) => ({
  [name]: {
    [entityId]: {
      test: name,
      entityId
    }
  }
})

describe('@EntityManager', () => {
  let entityManager

  beforeEach(() => {
    entityManager = new EntityManager()
  })

  describe('Given this function', () => {
    describe('When calling "generateUid', () => {
      describe('And there is no id passed in', () => {
        it('increments "uid" by one', () => {
          entityManager.generateUid()
          expect(entityManager.uid).toBe(1)

          entityManager.generateUid()
          expect(entityManager.uid).toBe(2)
        })
      })

      describe('And there is a "uid" passed in', () => {
        describe('And "uid" is greater than current uid', () => {
          it('increments accordingly', () => {
            entityManager.generateUid(100)
            expect(entityManager.uid).toBe(100)

            entityManager.generateUid(99)
            expect(entityManager.uid).toBe(101)

            entityManager.generateUid()
            expect(entityManager.uid).toBe(102)
          })
        })

        describe('And "uid" is less than or equal to current uid', () => {
          it('increments current uid by 1', () => {
            entityManager.generateUid(0)
            expect(entityManager.uid).toBe(1)

            entityManager.generateUid(0)
            expect(entityManager.uid).toBe(2)
          })
        })
      })
    })

    describe('When calling "createEntity"', () => {
      beforeEach(() => {
        entityManager.addComponentsToEntity = jest.fn()
        entityManager.generateUid = jest.fn((id) => id)
      })

      it('calls generateUid with correct args', () => {
        entityManager.createEntity()

        expect(entityManager.generateUid)
          .toHaveBeenCalledTimes(1)

        expect(entityManager.generateUid)
          .toHaveBeenCalledWith(undefined)
      })

      it('calls addComponentsToEntity with correct args', () => {
        const props = [['comp-1', 'comp-2'], 0]
        entityManager.createEntity(...props)

        expect(entityManager.addComponentsToEntity)
          .toHaveBeenCalledTimes(1)

        expect(entityManager.addComponentsToEntity)
          .toHaveBeenCalledWith(...props)
      })

      it('returns generatedId', () => {
        expect(entityManager.createEntity([], 10)).toBe(10)
      })

      describe('And entities array does not include new id', () => {
        it('pushes entity id to entities array', () => {
          entityManager.createEntity([], 10)

          expect(entityManager.entities).toContain(10)
        })
      })

      describe('And entities array does include new id', () => {
        it('dont add new entity id', () => {
          entityManager.entities = [1, 2, 10]
          entityManager.createEntity([], 10)

          const entryAmount = entityManager.entities
            .reduce((acc, id) => (
              id === 10 ? (acc + 1) : acc
            ), 0)

          expect(entryAmount).toBe(1)
        })
      })
    })

    describe('When calling "removeEntity"', () => {
      beforeEach(() => {
        entityManager.entities = [0, 1]
        entityManager.entityComponentData = {
          ...createFakeEntityData({ name: 'comp1', entityId: 0 }),
          ...createFakeEntityData({ name: 'comp2', entityId: 1 })
        }
      })

      describe('And entity exists', () => {
        it('removes entity data', () => {
          entityManager.removeEntity(1)

          expect(entityManager.entityComponentData).toEqual({
            ...createFakeEntityData({ name: 'comp1', entityId: 0 }),
            'comp2': {}
          })

          expect(entityManager.entities.includes(1)).toBe(false)
        })
      })

      describe('And entry does not exist', () => {
        it('does not remove entities', () => {
          entityManager.removeEntity(10)

          expect(entityManager.entities).toEqual([0, 1])

          expect(entityManager.entityComponentData).toEqual({
            ...createFakeEntityData({ name: 'comp1', entityId: 0 }),
            ...createFakeEntityData({ name: 'comp2', entityId: 1 })
          })
        })
      })
    })

    describe('When calling "addComponent"', () => {
      it('adds new component to components array', () => {
        const component = {
          name: 'nick',
          state: {
            iLoveYou: true
          }
        }

        entityManager.addComponent(component.name, component)

        expect(entityManager.components).toEqual({
          [component.name]: component
        })
      })
    })

    describe('When calling "removeComponent"', () => {
      beforeEach(() => {
        entityManager.components = {
          ...createFakeComponent({ name: 'nick' }),
          ...createFakeComponent({ name: 'john' })
        }

        entityManager.entityComponentData = {
          ...createFakeEntityData({ name: 'nick', entityId: 0 }),
          ...createFakeEntityData({ name: 'john', entityId: 1 })
        }
      })

      it('removes correct component', () => {
        entityManager.removeComponent('nick')

        expect(entityManager.components)
          .toEqual(createFakeComponent({ name: 'john' }))

        expect(entityManager.entityComponentData)
          .toEqual(createFakeEntityData({ name: 'john', entityId: 1 }))
      })
    })

    describe('When calling "getComponentsList"', () => {
      describe('And there are entries', () => {
        it('returns an array of component ids', () => {
          entityManager.components = {
            ...createFakeComponent({ name: 'nick' }),
            ...createFakeComponent({ name: 'adam' })
          }

          expect(entityManager.getComponentsList()).toEqual([
            'nick',
            'adam'
          ])
        })
      })
    })

    describe('When calling "addComponentsToEntity"', () => {
      describe('And there is an invalid component', () => {
        it('throws an error', () => {
          const throwedFn = entityManager.addComponentsToEntity.bind(entityManager, ['lolol'])

          expect(
            throwedFn
          ).toThrowError('Trying to use unknown component: lolol')
        })
      })

      describe('And there is an invalid entity', () => {
        it('throws an error', () => {
          entityManager.components = createFakeComponent({
            name: 'nick'
          })

          const throwedFn = entityManager.addComponentsToEntity.bind(entityManager, ['nick'], 0)

          expect(
            throwedFn
          ).toThrowError('Trying to use unknown entity: 0')
        })
      })

      describe('And component is valid', () => {
        it('adds new component to entity', () => {
          entityManager.entities = [0]

          entityManager.components = {
            ...createFakeComponent({ name: 'nick' }),
            ...createFakeComponent({ name: 'john' })
          }

          entityManager.addComponentsToEntity(['nick', 'john'], 0)

          expect(
            entityManager.entityComponentData
          ).toEqual({
            ...createFakeEntityData({ name: 'nick', entityId: 0 }),
            ...createFakeEntityData({ name: 'john', entityId: 0 })
          })
        })
      })
    })
  })
})
