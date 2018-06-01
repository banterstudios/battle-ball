import {
  EntityManager,
  TimeManager,
  AssetManager,
  GameStateManager,
  InputManager
} from './managers'

import {
  requestAnimationFrame,
  cancelAnimationFrame
} from '../utils/domUtils'

const noop = () => {}

export default class Game {
  constructor ({ canvas, init, width, height }) {
    // Dom related st00f
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: false })
    this.reqAnimFrameId = null

    // Images
    this.antialias = true

    // Game Dimensions
    this.gameWidth = width
    this.gameHeight = height

    // Callbacks
    this.initCallback = init || noop

    // Managers
    this.timeManager = null
    this.globalEntityManager = null
    this.assetManager = null
    this.stateManager = null
    this.inputManager = null

    this.start()
  }

  start () {
    if (this.antialias) {
      this.addImageOptimisation()
    }

    this.createManagers()
    this.initCallback(this)
    this.bindEvents()
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
    this.inputManager = new InputManager(this)
    this.stateManager = new GameStateManager(this)
  }

  bindEvents () {
    window.addEventListener('resize', this.handleResize, false)
  }

  handleResize = () => {
    this.addImageOptimisation()
  }

  update = (step) => {
    this.stateManager.update(step)
  }

  render = (delta) => {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight)

    this.stateManager.render(delta)
  }

  loop = () => {
    this.timeManager.run(this.update, this.render)
    this.reqAnimFrameId = requestAnimationFrame(this.loop)
  }

  unBindEvents () {
    window.removeEventListener('resize', this.handleResize, false)
  }

  stop () {
    cancelAnimationFrame(this.reqAnimFrameId)
    this.unBindEvents()
  }
}
