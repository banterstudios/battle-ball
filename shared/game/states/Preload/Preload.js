import { ASSET_TYPES } from '../../consts'
import isDev from 'isdev'

const assetsToPreload = [{
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor',
  src: '/static/assets/images/battleball/tiles/beach.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_es',
  src: '/static/assets/images/battleball/tiles/beachES.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_n',
  src: '/static/assets/images/battleball/tiles/beachN.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_e',
  src: '/static/assets/images/battleball/tiles/beachE.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_ne',
  src: '/static/assets/images/battleball/tiles/beachNE.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_nw',
  src: '/static/assets/images/battleball/tiles/beachNW.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_s',
  src: '/static/assets/images/battleball/tiles/beachS.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_sw',
  src: '/static/assets/images/battleball/tiles/beachSW.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'beach_floor_w',
  src: '/static/assets/images/battleball/tiles/beachW.png'
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

  update () {}

  render () {}
}
