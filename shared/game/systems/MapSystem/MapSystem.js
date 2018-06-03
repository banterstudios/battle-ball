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
            name: 'beach_floor',
            width: 100,
            height: 65,
            offsetX: 0,
            offsetY: 15
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
      const { width, name, height, offsetX, offsetY } = this.manager.getComponentDataForEntity('Sprite', tileId)
      const { x, y } = this.manager.getComponentDataForEntity('Position', tileId)
      const { img } = this.game.assetManager.getAsset(name)

      const {
        x: tileX,
        y: tileY
      } = mapToIsoCoord(x, y)

      if (img) {
        this.game.ctx.drawImage(img, (tileX + cameraX) - offsetX, (tileY + cameraY) - offsetY, width, height)
      }
    })
  }

  update (delta) {
    // draw tiles
    this.renderScene()
  }
}
