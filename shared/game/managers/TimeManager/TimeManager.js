import { FRAME_DIVIDER, STEP } from '../../consts'

export default class TimeManager {
  constructor () {
    this.now = 0
    this.delta = 0
    this.last = 0
  }

  reset () {
    this.now = 0
    this.last = 0
    this.delta = 0
  }

  run (gameUpdate, gameRender) {
    this.now = window.performance.now()
    this.delta = this.delta + Math.min(1, (this.now - this.last) / FRAME_DIVIDER)

    while (this.delta > STEP) {
      this.delta = this.delta - STEP
      gameUpdate(STEP)
    }

    gameRender(this.delta)

    this.last = this.now
  }
}
