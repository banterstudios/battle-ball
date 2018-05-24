import { ASSET_TYPES } from '../../consts'
import isDev from 'isdev'

const assetsToPreload = [{
  type: ASSET_TYPES.IMAGE,
  src: '/static/assets/images/badsky.png'
}, {
  type: ASSET_TYPES.IMAGE,
  src: '/static/assets/images/badtile.png'
}]

export default class Preload {
  constructor ({ game }) {
    this.game = game
    this.totalAssets = assetsToPreload.length
    this.totalAssetsLoaded = 0
  }

  async init () {
    await this.game.assetManager.loadAssets(assetsToPreload, () => {
      this.totalAssetsLoaded++
    })

    if (isDev) {
      console.log('Done preloading')
    }

    this.game.stateManager.start('play')
  }

  update () {
    const percent = (100 / (this.totalAssets / this.totalAssetsLoaded))

    if (isDev) {
      console.log(`Percent done: ${percent}%`)
    }
  }

  render () {
    // Render out the splash screen!
  }
}
