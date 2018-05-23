import { ASSET_TYPES } from '../../consts'
import isDev from 'isdev'

const assetsToPreload = [{
  type: ASSET_TYPES.IMAGE,
  src: '/static/assets/images/charactergood.png'
}, {
  type: ASSET_TYPES.IMAGE,
  src: '/static/assets/images/characterbad.png'
}]

export default class Preload {
  constructor ({ game }) {
    this.game = game
    this.totalAssets = assetsToPreload.length
    this.totalAssetsLoaded = 0
  }

  async init () {
    const { assetManager } = this.game

    for (const [, loadedAssetsAmount] of await assetManager.loadGeneratorAsset(assetsToPreload)) {
      this.totalAssetsLoaded = loadedAssetsAmount
    }

    if (isDev) {
      console.warn('If there was an error loading an asset, currently we do not handle it!')
      console.log('Done preloading')
    }

    this.game.stateManager.start('play')
  }

  update () {
    const percent = (this.totalAssets / this.totalAssetsLoaded)

    console.log(`Percent done: ${percent}%`)
  }

  render () {
    // Render out the splash screen!
  }
}
