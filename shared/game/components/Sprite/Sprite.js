export default class Sprite {
  constructor ({ url, name }) {
    this.img = null
    this.url
    this.name = name
    this.hasLoaded = false
    this.type = 'sprite'
  }

  setImage (image) {
    this.image = image
  }
}
