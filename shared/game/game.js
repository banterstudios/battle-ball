import { GAME_STATES } from './consts'
import { TimeManager } from './helpers'
import { EntityManager } from './managers'
import { requestAnimationFrame, cancelAnimationFrame } from '../utils/domUtils'

export default class Game {
  constructor ({ canvas }) {
    this.currentState = GAME_STATES.LOADER
    this.reqAnimFrameId = null
    this.timeManager = new TimeManager()
    this.entityManager = new EntityManager()
  }

  async start () {
    this.createEntities()

    await this.loadAssets()

    this.loop()
  }

  createEntities () {
  }

  loadAssets () {
    return Promise.resolve()
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
