import { GAME_STATES } from './consts'
import { TimeManager } from './managers'
import { Player } from './entities'
import { assetLoadSystem } from './systems'
import { requestAnimationFrame, cancelAnimationFrame } from '../utils/domUtils'

export default class Game {
  constructor ({ canvas }) {
    this.currentState = GAME_STATES.LOADER
    this.reqAnimFrameId = null
    this.timeManager = new TimeManager()

    this.entities = []
  }

  async start () {
    this.createEntities()

    await this.loadAssets()

    this.loop()
  }

  createEntities () {
    this.entities.push(Player())
  }

  loadAssets () {
    return assetLoadSystem(this.entities)
  }

  update (step) {
    switch (this.gameState) {
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

  render () {

  }

  loop () {
    this.timeManager.run(this.update, this.render)
    this.reqAnimFrameId = requestAnimationFrame(this.loop)
  }

  stop () {
    cancelAnimationFrame(this.reqAnimFrameId)
  }
}
