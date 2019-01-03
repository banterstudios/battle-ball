import isDev from 'isdev'
import { STEP, MAX_ALLOWED_UPDATES_PER_STEP } from '../../consts'

export default class TimeManager {
  constructor () {
    this.now = 0
    this.delta = 0
    this.last = 0

    if (isDev) {
      const Stats = require('stats-js')
      this.stats = new Stats()
      this.stats.showPanel(0)
      document.body.appendChild(this.stats.dom)
    }
  }

  reset () {
    this.now = 0
    this.last = 0
    this.delta = 0
  }

  panicAndBreakOutOfUpdate () {
    this.delta = 0
  }

  run (gameUpdate, gameRender) {
    if (isDev) {
      this.stats.begin()
    }

    this.now = window.performance.now()
    this.delta += this.now - this.last
    this.last = this.now

    let numberOfUpdatesPerStep = 0

    while (this.delta >= STEP) {
      gameUpdate(STEP)
      this.delta -= STEP

      if (++numberOfUpdatesPerStep >= MAX_ALLOWED_UPDATES_PER_STEP) {
        this.panicAndBreakOutOfUpdate()
        break
      }
    }

    gameRender(this.delta / STEP)

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
