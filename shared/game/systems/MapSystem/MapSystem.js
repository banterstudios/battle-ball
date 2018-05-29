import isDev from 'isdev'
import { mapToIsoCoord } from '../../helpers'

const defaultMap = [
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
]

export default class MapSystem {
  constructor ({ manager, game, map, camera }) {
    this.manager = manager
    this.game = game
    this.camera = camera
    this.map = map || defaultMap
    this.tiles = []

    this.init()
  }

  init () {
    this.createLevel()
  }

  createLevel () {
    const { map } = this

    if (!map) {
      throw new Error(`map is invalid: ${typeof map} - Expected an array`)
    }

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const mapEntity = map[y][x]

        if (mapEntity === 0) {
          continue
        }

        const floorTile = this.manager.createEntityFromAssemblage('FloorTile')

        if (mapEntity === 1) {
          this.manager.updateComponentDataForEntity('Sprite', floorTile, {
            name: 'beach_floor',
            width: 100,
            height: 65
          })
        }

        this.manager.updateComponentDataForEntity('Position', floorTile, {
          x,
          y
        })

        this.tiles.push(floorTile)
      }
    }
  }

  renderScene () {
    const { x: cameraX, y: cameraY } = this.manager.getComponentDataForEntity('Position', this.camera)

    this.tiles.forEach((tileId) => {
      const { width, name, height } = this.manager.getComponentDataForEntity('Sprite', tileId)
      const { x, y } = this.manager.getComponentDataForEntity('Position', tileId)

      const img = this.game.assetManager.getAsset(name)

      const {
        x: tileX,
        y: tileY
      } = mapToIsoCoord(x, y)

      if (img) {
        this.game.ctx.drawImage(img, tileX + cameraX, tileY + cameraY, width, height)
      }
    })
  }

  update (delta) {
    // draw tiles
    this.renderScene()
  }
}
