import { EntityManager } from '../../managers'

export default class Play {
  constructor ({ game }) {
    this.game = game
  }

  init () {
    this.manager = new EntityManager()
  }

  update (step) {
    this.manager.update(step)
  }

  destroy () {
    this.manager.destroy()
    this.manager = null
  }
}
