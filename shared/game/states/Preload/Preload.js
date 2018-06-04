import { ASSET_TYPES } from '../../consts'
import isDev from 'isdev'

const assetsToPreload = [{
  type: ASSET_TYPES.IMAGE,
  name: 'tile_flat',
  src: '/static/assets/images/battleball/tiles/tile-single.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'tile_thin',
  src: '/static/assets/images/battleball/tiles/tile-thin.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'tile_highlight',
  src: '/static/assets/images/battleball/tiles/tile-highlight.png'
}, {
  type: ASSET_TYPES.IMAGE,
  name: 'player_blue',
  src: '/static/assets/images/battleball/player/playerblue.png'
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
      currentWidth: 0,
      color: '#fff'
    }
  }

  update () {
    if (Math.round(this.progressBar.currentWidth) >= this.progressBar.width) {
      this.game.stateManager.start('play')
    }

    this.progressBar.currentWidth += (this.progressBar.width / (this.totalAssets / this.totalAssetsLoaded) - this.progressBar.currentWidth) * 0.1
  }

  render () {
    const { x, y, currentWidth, height, color } = this.progressBar

    this.game.ctx.save()

    this.game.ctx.shadowBlur = 10

    this.game.ctx.shadowColor = 'white'

    this.game.ctx.fillStyle = color

    this.game.ctx.fillRect(x, y, currentWidth, height)

    this.game.ctx.restore()
  }
}
