export default class GameStateManager {
  constructor (game) {
    this.currentGameState = null
    this.gameStates = new Map()
    this.game = game
  }

  add (name, state) {
    return this.gameStates.set(name, state)
  }

  remove (name) {
    return this.gameStates.delete(name)
  }

  destroyCurrentGameState () {
    if (this.currentGameState) {
      if (this.currentGameState.destroy) {
        this.currentGameState.destroy()
      }

      this.currentGameState = null
    }
  }

  start (name, props) {
    const { gameStates, game } = this

    const StateToStart = gameStates.get(name)

    if (!StateToStart) {
      throw new Error(`You're trying to start a state that has not been set: ${name}`)
    }

    this.destroyCurrentGameState()

    this.currentGameState = new StateToStart({ props, game })
  }

  update (step) {
    const { currentGameState: { update } = {} } = this

    if (update) {
      update(step)
    }
  }

  render (delta) {
    const { currentGameState: { render } = {} } = this

    if (render) {
      render(delta)
    }
  }
}
