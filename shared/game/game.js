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
    this.entityManager = null
    this.assetManagement = null
    this.gameStateManagement = null

    this.start()
  }

  get gameProps () {
    const {
      entityManager,
      assetManagement: asset,
      gameStateManagement: state
    } = this

    return {
      entityManager,
      asset,
      state
    }
  }

  start () {
    this.createManagers()
    this.initCallback(this.gameProps)
    this.loop()
  }

  createManagers () {
    this.timeManager = new TimeManager()
    this.entityManager = new EntityManager()
    this.assetManagement = new AssetManager()
    this.gameStateManagement = new GameStateManager(this.gameProps)
  }

  update = (step) => {
    this.gameStateManagement.update(step)
  }

  render = (delta) => {
    this.gameStateManagement.render(delta)
  }

  loop = () => {
    this.timeManager.run(this.update, this.render)
    this.reqAnimFrameId = requestAnimationFrame(this.loop)
  }

  stop () {
    cancelAnimationFrame(this.reqAnimFrameId)
  }
}
