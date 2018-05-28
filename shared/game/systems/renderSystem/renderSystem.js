export default class RenderSystem {
  constructor ({ manager, game }) {
    this.manager = manager
    this.game = game
  }

  renderScene () {
  }

  update (delta) {
    // draw tiles
    this.renderScene()
  }
}
