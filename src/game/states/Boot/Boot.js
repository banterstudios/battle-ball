import isDev from 'isdev'

export default class Boot {
  constructor ({ game }) {
    this.game = game
  }

  init () {
    if (isDev) {
      console.log('Booting GangstaClaus')
    }

    this.game.stateManager.start('preload')
  }

  update () {
  }

  render () {
  }

  destroy () {
  }
}
