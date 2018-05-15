import {
  clone,
  path,
  omit
} from '../../../utils/objectUtils'

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
    let { entityComponentData } = this

    for (let componentId in entityComponentData) {
      if (
        entityComponentData.hasOwnProperty(componentId) &&
        entityComponentData[componentId][entityId]
      ) {
        delete entityComponentData[componentId][entityId]
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
    const { components, entities } = this

    componentIds.forEach((componentId) => {
      if (!components[componentId]) {
        throw new Error(`Trying to use unknown component: ${componentId}`)
      }

      if (!entities.includes(entityId)) {
        throw new Error(`Trying to use unknown entity: ${entityId}`)
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
    const { components } = this

    componentIds.forEach((componentId) => {
      if (!components[componentId]) {
        throw new Error(`Trying to use unknown component: ${componentId}`)
      }

      if (path([componentId, entityId], this.entityComponentData)) {
        delete this.entityComponentData[componentId][entityId]
      }
    })
  }

  doesComponentExist (componentId, entityId) {
    const { components, entityComponentData } = this

    if (!components[componentId]) {
      return false
    }

    if (
      !entityComponentData.hasOwnProperty(componentId) ||
      !entityComponentData[componentId].hasOwnProperty(entityId)
    ) {
      return false
    }

    return true
  }

  getComponentDataForEntity (componentId, entityId) {
    const { entityComponentData, doesComponentExist } = this

    if (!doesComponentExist(componentId, entityId)) {
      throw new Error(`No data for component: ${componentId} and/or entity ${entityId}`)
    }

    return entityComponentData[componentId][entityId]
  }

  updateComponentDataForEntity (componentId, entityId, newComponentState) {
    let currentComponentState = this.getComponentDataForEntity(componentId, entityId)

    const safeNewComponentState = omit(newComponentState, ['entityId'])

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
  addsystem (system) {
    this.systems.push(system)
  }

  removeSystem (systemToRemove) {
    this.systems = this.systems.filter((system) => system !== systemToRemove)
  }

  update (dt) {
    this.systems.forEach(system => system.update(dt))
  }
}
