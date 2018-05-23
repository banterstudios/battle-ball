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
    this.createManagers()
    this.initCallback(this)
    this.loop()
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
