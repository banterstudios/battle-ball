export default class InputManager {
  constructor (game) {
    this.game = game

    this.mouse = {
      x: 0,
      y: 0,
      width: 32,
      height: 32,
      isDown: false
    }

    this.init()
  }

  init () {
    this.game.canvas.addEventListener('mousedown', this.handleMouse, false)
    this.game.canvas.addEventListener('mousemove', this.handleMouse, false)
    this.game.canvas.addEventListener('mouseup', this.handleMouse, false)
  }

  handleMouse = ({ type, clientX, clientY }) => {
    const { canvas: { offsetLeft, offsetTop } } = this.game

    switch (type) {
      case 'mouseup':
        this.mouse.isDown = false
        break

      case 'mousedown':
        this.mouse.isDown = true
        break

      default:
        break
    }

    this.mouse.x = (clientX - offsetLeft) >> 0
    this.mouse.y = (clientY - offsetTop) >> 0
  }

  destroy () {
    this.game.canvas.removeEventListener('mousedown', this.handleMouse, false)
    this.game.canvas.removeEventListener('mousemove', this.handleMouse, false)
    this.game.canvas.removeEventListener('mouseup', this.handleMouse, false)
  }
}
