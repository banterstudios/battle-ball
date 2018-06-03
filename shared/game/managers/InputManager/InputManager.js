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
    window.addEventListener('mousedown', this.handleMouse, false)
    window.addEventListener('mousemove', this.handleMouse, false)
    window.addEventListener('mouseup', this.handleMouse, false)
  }

  handleMouse = ({ type, pageX, pageY }) => {
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

    this.mouse.x = pageX
    this.mouse.y = pageY
  }

  destroy () {
    window.removeEventListener('mousedown', this.handleMouse, false)
    window.removeEventListener('mousemove', this.handleMouse, false)
    window.removeEventListener('mouseup', this.handleMouse, false)
  }
}
