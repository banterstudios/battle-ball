import { GAME_STATES } from './consts'
import { TimeManager, assetLoadManager, ASSET_TYPES } from './helpers'
import { EntityManager } from './managers'
import { Player } from './assemblages'
import {
  requestAnimationFrame,
  cancelAnimationFrame
} from '../utils/domUtils'

export default class Game {
  constructor ({ canvas }) {
    this.currentState = GAME_STATES.LOADER
    this.reqAnimFrameId = null
    this.timeManager = new TimeManager()
    this.entityManager = new EntityManager()
  }

  async start () {
    await this.loadAssets()

    this.addComponents()
    this.addAssemblages()
    this.addSystems()
    this.loop()
  }

  async loadAssets () {
    const assets = [{
      type: ASSET_TYPES.IMAGE,
      src: '/public/images/jeff.jpg'
    }, {
      type: ASSET_TYPES.IMAGE,
      src: '/public/images/machinegun.png'
    }]

    for (const [value, index] of await assetLoadManager(assets)) {
      console.log(value)
    }
  }

  addComponents () {
    // Add all components
  }

  addAssemblages () {
    this.entityManager.addAssemblage(Player.name, Player)
  }

  addSystems () {
    // Add all systems
  }

  update = (step) => {
    switch (this.currentState) {
      case GAME_STATES.PLAY:
        break

      case GAME_STATES.MENU:
        this.timeManager.reset()
        break

      case GAME_STATES.END:
        break

      case GAME_STATES.LOADER:
        break
    }
  }

  render = () => {

  }

  loop = () => {
    this.timeManager.run(this.update, this.render)
    this.reqAnimFrameId = requestAnimationFrame(this.loop)
  }

  stop () {
    cancelAnimationFrame(this.reqAnimFrameId)
  }
}
