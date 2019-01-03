import isDev from 'isdev'
import { mapToIsoCoord, isoToMapCoord } from '../../helpers'
import { Graph, aStar } from '../../pathfinding'

const lerp = (a, b, c) =>
  a + c * (b - a)

export default class PlayerFollowSystem {
  constructor ({ manager, game, camera }) {
    this.manager = manager
    this.game = game
    this.camera = camera
    this.graph = null
    this.targetPositions = []

    if (isDev) {
      window.pfs = this
    }
  }

  init () {
    const levels = this.manager.getComponentsData('TileMap')
    const tiles = levels[0].tiles

    this.graph = new Graph(tiles, { diagonal: true })
  }

  startPathfinding ({ x, y }) {
    const { x: mouseX, y: mouseY, isDown } = this.game.inputManager.mouse

    if (isDown) {
      const { x: cameraX, y: cameraY } = this.manager.getComponentDataForEntity('Position', this.camera)
      const { x: isoMouseX, y: isoMouseY } = isoToMapCoord(mouseX - cameraX, mouseY - cameraY)

      const start = this.graph.at(Math.round(x), Math.round(y))
      const end = this.graph.at((Math.round(isoMouseX) - 1), Math.round(isoMouseY))

      this.targetPositions = aStar.search(this.graph, start, end)
    }
  }

  movePlayerToTarget (player, delta) {
    if (!this.targetPositions.length) {
      return false
    }

    const { x, y } = this.targetPositions[0]
    const { speed } = this.manager.getComponentDataForEntity('Moveable', player)
    const position = this.manager.getComponentDataForEntity('Position', player)

    const pX = lerp(position.x, x, speed)
    const pY = lerp(position.y, y, speed)

    if (pX <= 1 && pY <= 1) {
      this.targetPositions.shift()
    }

    this.manager.updateComponentDataForEntity('Position', player, {
      x: pX,
      y: pY
    })
  }

  updatePlayer (delta) {
    const players = this.manager.getComponentsData('Player')

    for (const playerId in players) {
      const player = players[playerId].entityId
      const { x, y } = this.manager.getComponentDataForEntity('Position', player)

      this.startPathfinding({ x, y })
      this.movePlayerToTarget(player, delta)
    }
  }

  update (delta) {
    if (!this.graph) {
      this.init()
    }

    this.updatePlayer(delta)
  }

  destroy () {
    this.graph = null
  }
}
