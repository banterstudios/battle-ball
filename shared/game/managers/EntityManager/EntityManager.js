import {
  clone,
  path,
  omit
} from '../../../utils/objectUtils'

const blackListedProps = ['entityId']

export default class EntityManager {
  constructor () {
    this.entities = []
    this.components = {}
    this.assemblages = {}
    this.entityComponentData = {}
    this.systems = []
    this.uid = 0
  }

  generateUid (uid) {
    if (uid > this.uid) {
      this.uid = uid
    } else {
      this.uid++
    }

    return this.uid
  }

  // Entity

  /**
   * Create a new entity in the system by creating a new instance of each of
   * its components.
   *
   * @param {array} componentIds - List of identifiers of the components that compose the new entity.
   * @param {int} entityId - Optional. Unique identifier of the entity. If passed, no new id will be generated.
   * @return {int} - Unique identifier of the new entity.
   */
  createEntity (componentIds, entityId) {
    const generatedEntityId = this.generateUid(entityId)

    this.addComponentsToEntity(componentIds, generatedEntityId)

    if (!this.entities.includes(generatedEntityId)) {
      this.entities.push(generatedEntityId)
    }

    return generatedEntityId
  }

  removeEntity (entityId) {
    for (let componentId in this.entityComponentData) {
      if (
        this.entityComponentData.hasOwnProperty(componentId) &&
        this.entityComponentData[componentId][entityId]
      ) {
        delete this.entityComponentData[componentId][entityId]
      }
    }

    this.entities = this.entities.filter((id) => id !== entityId)
  }

  // Components
  addComponent (id, component) {
    this.components[id] = component
  }

  removeComponent (componentId) {
    delete this.components[componentId]
    delete this.entityComponentData[componentId]
  }

  getComponentsList () {
    return Object.keys(this.components)
  }

  addComponentsToEntity (componentIds, entityId) {
    componentIds.forEach((componentId) => {
      if (!this.components[componentId]) {
        throw new Error(`Trying to use unknown component: ${componentId}`)
      }

      if (!this.entityComponentData[componentId]) {
        this.entityComponentData[componentId] = {}
      }

      let clonedComponentState = clone(this.components[componentId].state)
      clonedComponentState.entityId = entityId

      this.entityComponentData[componentId][entityId] = clonedComponentState
    })
  }

  removeComponentsFromEntity (componentIds, entityId) {
    componentIds.forEach((componentId) => {
      if (!this.components[componentId]) {
        throw new Error(`Trying to use unknown component: ${componentId}`)
      }

      if (path([componentId, entityId], this.entityComponentData)) {
        delete this.entityComponentData[componentId][entityId]
      }
    })
  }

  doesComponentExist (componentId, entityId) {
    if (!this.components[componentId]) {
      return false
    }

    if (
      !this.entityComponentData.hasOwnProperty(componentId) ||
      !this.entityComponentData[componentId].hasOwnProperty(entityId)
    ) {
      return false
    }

    return true
  }

  getComponentDataForEntity (componentId, entityId) {
    if (!this.doesComponentExist(componentId, entityId)) {
      throw new Error(`No data for component: ${componentId} and/or entity ${entityId}`)
    }

    return this.entityComponentData[componentId][entityId]
  }

  updateComponentDataForEntity (componentId, entityId, newComponentState) {
    let currentComponentState = this.getComponentDataForEntity(componentId, entityId) // eslint-disable-line no-unused-vars

    const safeNewComponentState = omit(newComponentState, blackListedProps)

    currentComponentState = Object.assign(
      currentComponentState,
      safeNewComponentState
    )
  }

  getComponentsData (componentId) {
    if (!this.components[componentId]) {
      throw new Error(`No data for component: ${componentId}`)
    }

    if (!this.entityComponentData.hasOwnProperty(componentId)) {
      return []
    }

    const components = this.entityComponentData[componentId]

    return Object.entries(components).map(([_, data]) => data)
  }

  entityHasComponent (entityId, componentId) {
    if (!this.components[componentId]) {
      return false
    }

    const hasComponent = (
      this.entityComponentData.hasOwnProperty(componentId) &&
      this.entityComponentData[componentId].hasOwnProperty(entityId)
    )

    return !!hasComponent
  }

  // Assemblages
  addAssemblage (id, assemblage) {
    this.assemblages[id] = assemblage
  }

  removeAssemblage (assemblageId) {
    delete this.assemblages[assemblageId]
  }

  createEntityFromAssemblage (assemblageId) {
    if (!this.assemblages[assemblageId]) {
      throw new Error(`Trying to use unknown assemblage: ${assemblageId}`)
    }

    const { components, initialState } = this.assemblages[assemblageId]

    const entity = this.createEntity(components)

    for (let componentId in initialState) {
      if (initialState.hasOwnProperty(componentId)) {
        const newState = initialState[componentId]
        this.updateComponentDataForEntity(componentId, entity, newState)
      }
    }

    return entity
  }

  // Systems
  addSystem (system) {
    this.systems.push(system)
  }

  removeSystem (systemToRemove) {
    this.systems = this.systems.filter((system) => system !== systemToRemove)
  }

  update (step) {
    this.systems.forEach((system) => system.update(step))
  }

  destroy () {
    this.entities = null
    this.components = null
    this.assemblages = null
    this.entityComponentData = null
    this.systems = null
    this.uid = null
  }
}
