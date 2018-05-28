import isDev from 'isdev'

const defaultMap = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
]

export default class MapSystem {
  constructor ({ manager, game, map }) {
    this.manager = manager
    this.game = game
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
        const floorTile = this.manager.createEntityFromAssemblage('FloorTile')

        this.manager.updateComponentDataForEntity('Position', floorTile, {
          x,
          y
        })

        this.tiles.push(floorTile)
      }
    }

    if (isDev) {
      window.mapManager = this.manager
    }
  }

  renderScene () {
    this.tiles.forEach((tileId) => {
      const { width, name, height } = this.manager.getComponentDataForEntity('Sprite', tileId)
      const { x, y } = this.manager.getComponentDataForEntity('Position', tileId)

      const img = this.game.assetManager.getAsset(name)

      this.game.ctx.drawImage(img, x * width, y * height)
    })
  }

  update (delta) {
    // draw tiles
    this.renderScene()
  }
}
