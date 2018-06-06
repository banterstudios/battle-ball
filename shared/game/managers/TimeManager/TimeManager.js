import { FRAME_DIVIDER, STEP } from '../../consts'
import isDev from 'isdev'

export default class TimeManager {
  constructor () {
    this.now = 0
    this.delta = 0
    this.last = 0

    if (isDev) {
      const Stats = require('stats.js')
      this.stats = new Stats()
      this.stats.showPanel(1)
      document.body.appendChild(this.stats.dom)
    }
  }

  reset () {
    this.now = 0
    this.last = 0
    this.delta = 0
  }

  run (gameUpdate, gameRender) {
    if (isDev) {
      this.stats.begin()
    }

    this.now = window.performance.now()
    this.delta = this.delta + Math.min(1, (this.now - this.last) / FRAME_DIVIDER)

    while (this.delta > STEP) {
      this.delta = this.delta - STEP
      gameUpdate(STEP)
    }

    gameRender(this.delta)

    this.last = this.now

    if (isDev) {
      this.stats.end()
    }
  }

  destroy () {
    if (isDev) {
      document.body.removeChild(this.stats.dom)
      this.stats = null
    }
  }
}
