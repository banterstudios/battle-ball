let entityIdCounter = 0

/**
 * @class Entity
 * @description Holds a collection of components
 */
export default class Entity {
  constructor () {
    this.id = entityIdCounter++
    this.components = {}
  }

  addComponent (component) {
    this.components = { ...this.components, [component.name]: component }
  }

  removeComponent (componentName) {
    const { [componentName]: _, ...components } = this.components
    this.components = components
  }
}
