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

    /**
     * @todo Add in a condition to see if its mobile or not
     */
    this.game.canvas.addEventListener('touchstart', this.handleMouse, false)
    this.game.canvas.addEventListener('touchend', this.handleMouse, false)
  }

  handleMouse = ({ type, clientX, clientY }) => {
    const { left, top, width, height } = this.game.canvas.getBoundingClientRect()
    const scaleX = this.game.canvas.width / width
    const scaleY = this.game.canvas.height / height

    switch (type) {
      case 'mouseup':
      case 'touchend':
        this.mouse.isDown = false
        break

      case 'touchstart':
      case 'mousedown':
        this.mouse.isDown = true
        break

      default:
        break
    }

    this.mouse.x = ((clientX - left) * scaleX) >> 0
    this.mouse.y = ((clientY - top) * scaleY) >> 0
  }

  destroy () {
    this.game.canvas.removeEventListener('mousedown', this.handleMouse, false)
    this.game.canvas.removeEventListener('mousemove', this.handleMouse, false)
    this.game.canvas.removeEventListener('mouseup', this.handleMouse, false)
  }
}
