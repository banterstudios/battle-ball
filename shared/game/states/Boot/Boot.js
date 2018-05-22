export default class Boot {
  constructor ({ game }) {
    this.game = game
  }

  init () {
    this.game.stateManager.start('preload')
  }

  update () {
  }

  render () {
  }

  destroy () {
  }
}
