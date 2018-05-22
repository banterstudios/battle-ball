import isDev from 'isdev'

export default class GameStateManager {
  constructor (game) {
    this.currentGameState = null
    this.gameStates = new Map()
    this.game = game
  }

  add (name, State) {
    if (this.gameStates.has(name)) {
      if (isDev) {
        console.warn(`You're trying to add to an existing state.`)
      }

      return false
    }

    return this.gameStates.set(name, new State({ game: this.game }))
  }

  remove (name) {
    return this.gameStates.delete(name)
  }

  safelyDestroyCurrentGameState () {
    const { gameStates, currentGameState } = this

    const { destroy } = gameStates.get(currentGameState) || {}

    if (destroy) {
      destroy()
    }
  }

  start (name) {
    const { gameStates } = this

    const StateToStart = gameStates.get(name)

    if (!StateToStart) {
      throw new Error(`You're trying to start a state that has not been set: ${name}`)
    }

    this.safelyDestroyCurrentGameState()

    this.currentGameState = name

    StateToStart.init()
  }

  update (step) {
    const { update } = this.gameStates.get(this.currentGameState) || {}

    if (update) {
      update(step)
    }
  }

  render (delta) {
    const { render } = this.gameStates.get(this.currentGameState) || {}

    if (render) {
      render(delta)
    }
  }
}
