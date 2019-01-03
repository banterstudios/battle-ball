import { isoToMapCoord } from '../../helpers'

export default class CollisionSystem {
  constructor ({ manager, game, camera }) {
    this.manager = manager
    this.game = game
    this.camera = camera
  }

  update (delta) {
    const collidables = this.manager.getComponentsData('Collidable')
    const { x: cameraX, y: cameraY } = this.manager.getComponentDataForEntity('Position', this.camera)
    const { x: mouseX, y: mouseY } = this.game.inputManager.mouse

    for (const collidableId in collidables) {
      const collidable = collidables[collidableId].entityId
      const { x, y } = this.manager.getComponentDataForEntity('Position', collidable)
      const mousePos = isoToMapCoord(mouseX - cameraX, mouseY - cameraY)
      let collidableData = this.manager.getComponentDataForEntity('Collidable', collidable)

      if (Math.round(mousePos.x) - 1 === x && Math.round(mousePos.y) === y) {
        collidableData.hit = true
      } else {
        collidableData.hit = false
      }
    }
  }
}
