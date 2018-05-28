import {
  EntityManager,
  TimeManager,
  AssetManager,
  GameStateManager
} from './managers'

import {
  requestAnimationFrame,
  cancelAnimationFrame
} from '../utils/domUtils'

const noop = () => {}

export default class Game {
  constructor ({ canvas, init }) {
    // Dom related st00f
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.reqAnimFrameId = null

    // Callbacks
    this.initCallback = init || noop

    // Managers
    this.timeManager = null
    this.globalEntityManager = null
    this.assetManager = null
    this.stateManager = null

    this.start()
  }

  start () {
    this.addImageOptimisation()
    this.createManagers()
    this.initCallback(this)
    this.loop()
  }

  addImageOptimisation () {
    this.ctx['imageSmoothingEnabled'] = false
    this.ctx['mozImageSmoothingEnabled'] = false
    this.ctx['oImageSmoothingEnabled'] = false
    this.ctx['webkitImageSmoothingEnabled'] = false
    this.ctx['msImageSmoothingEnabled'] = false
  }

  createManagers () {
    this.timeManager = new TimeManager()
    this.globalEntityManager = new EntityManager()
    this.assetManager = new AssetManager()
    this.stateManager = new GameStateManager(this)
  }

  update = (step) => {
    this.stateManager.update(step)
  }

  render = (delta) => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.stateManager.render(delta)
  }

  loop = () => {
    this.timeManager.run(this.update, this.render)
    this.reqAnimFrameId = requestAnimationFrame(this.loop)
  }

  stop () {
    cancelAnimationFrame(this.reqAnimFrameId)
  }
}
