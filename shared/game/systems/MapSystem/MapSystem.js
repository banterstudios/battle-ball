export default class MapSystem {
  constructor ({ manager, game }) {
    this.manager = manager
    this.game = game

    this.init()
  }

  init () {
   this.createFloorTiles()
  }

  createFloorTiles () {
    
  }

  renderScene () {
  }

  update (delta) {
    // draw tiles
    this.renderScene()
  }
}
