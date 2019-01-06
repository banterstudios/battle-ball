import { mapToIsoCoord } from 'game/helpers'
import isDev from 'isdev'

export default class RenderSystem {
  constructor ({ manager, game, camera }) {
    this.manager = manager
    this.game = game
    this.camera = camera
  }

  renderPlayer (delta) {
    const players = this.manager.getComponentsData('Player')
    const { x: cameraX, y: cameraY } = this.manager.getComponentDataForEntity('Position', this.camera)

    for (const playerId in players) {
      const player = players[playerId].entityId
      const { x, y, z } = this.manager.getComponentDataForEntity('Position', player)
      const { width, name, height } = this.manager.getComponentDataForEntity('Sprite', player)

      const { x: pX, y: pY } = mapToIsoCoord(x, y)

      const { img } = this.game.assetManager.getAsset(name)

      if (img) {
        this.game.ctx.drawImage(img, pX + cameraX, (pY - z) + cameraY, width, height)
      }

      if (isDev) {
        this.game.ctx.strokeRect(pX + cameraX, (pY - z) + cameraY, width, height)
      }
    }
  }

  renderMouse () {
    const { x, y, width, height } = this.game.inputManager.mouse
    this.game.ctx.strokeStyle = '#ff0000'
    this.game.ctx.strokeRect(x - (width / 2), y - (height / 2), width, height)
    this.game.ctx.strokeStyle = '#000000'
  }

  update (delta) {
    this.renderPlayer(delta)
    this.renderMouse(delta)
  }
}
