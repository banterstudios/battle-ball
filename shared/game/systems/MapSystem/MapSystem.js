import { mapToIsoCoord } from '../../helpers'

export default class MapSystem {
  constructor ({ manager, game, map, camera }) {
    this.manager = manager
    this.game = game
    this.camera = camera
    this.tiles = []
    this.level = null

    this.init()
  }

  init () {
    this.createLevel()
  }

  createLevel () {
    this.level = this.manager.createEntityFromAssemblage('Level')

    const { tiles } = this.manager.getComponentDataForEntity('TileMap', this.level)

    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        const mapEntity = tiles[y][x]

        if (mapEntity === 0) {
          continue
        }

        const floorTile = this.manager.createEntityFromAssemblage('FloorTile')

        if (mapEntity === 1) {
          this.manager.updateComponentDataForEntity('Sprite', floorTile, {
            name: 'tile_thin',
            width: 128,
            height: 72
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

  renderScene (delta) {
    const { x: cameraX, y: cameraY } = this.manager.getComponentDataForEntity('Position', this.camera)

    this.tiles.forEach((tileId) => {
      const { width, name, height } = this.manager.getComponentDataForEntity('Sprite', tileId)
      const { x, y, z } = this.manager.getComponentDataForEntity('Position', tileId)
      const { hit } = this.manager.getComponentDataForEntity('Collidable', tileId)
      const { img } = this.game.assetManager.getAsset(name)

      const {
        x: tileX,
        y: tileY
      } = mapToIsoCoord(x, y)

      if (img) {
        this.game.ctx.drawImage(img, tileX + cameraX, (tileY - z) + cameraY, width, height)
      }

      if (hit) {
        this.game.ctx.strokeStyle = '#ffff00'
        this.game.ctx.strokeRect(tileX + cameraX, (tileY - z) + cameraY, width, height)
        this.game.ctx.strokeStyle = '#000000'
      }
    })
  }

  update (delta) {
    // draw tiles
    this.renderScene(delta)
  }
}
