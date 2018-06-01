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
    this.createProgressBar()

    await this.game.assetManager.loadAssets(assetsToPreload, () => {
      this.totalAssetsLoaded++
    })

    if (isDev) {
      console.log('Done preloading')
    }

    this.game.stateManager.start('play')
  }

  createProgressBar () {
    const { gameWidth, gameHeight } = this.game

    const width = (gameWidth / 2)
    const height = 20

    this.progressBar = {
      x: (gameWidth / 2) - (width / 2),
      y: (gameHeight / 2) - (height / 2),
      width,
      height,
      color: '#fff'
    }
  }

  render () {
    const { x, y, width, height, color } = this.progressBar

    this.game.ctx.save()

    this.game.ctx.shadowBlur = 10

    this.game.ctx.shadowColor = 'white'

    this.game.ctx.fillStyle = color

    this.game.ctx.fillRect(x, y, width / (this.totalAssets / this.totalAssetsLoaded), height)

    this.game.ctx.restore()
  }
}
