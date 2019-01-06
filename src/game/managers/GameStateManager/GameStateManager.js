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

    const state = gameStates.get(currentGameState) || {}

    if (state.destroy) {
      state.destroy()
    }
  }

  start (name) {
    const { gameStates } = this

    const stateToStart = gameStates.get(name)

    if (!stateToStart) {
      throw new Error(`You're trying to start a state that has not been set: ${name}`)
    }

    this.safelyDestroyCurrentGameState()

    this.currentGameState = name

    if (stateToStart.init) {
      stateToStart.init()
    }
  }

  update (step) {
    const state = this.gameStates.get(this.currentGameState) || {}

    if (state.update) {
      state.update(step)
    }
  }

  render (delta) {
    const state = this.gameStates.get(this.currentGameState) || {}

    if (state.render) {
      state.render(delta)
    }
  }
}
