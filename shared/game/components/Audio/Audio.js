export default class Audio {
  constructor ({ url, name }) {
    this.img = null
    this.url
    this.name = name
    this.hasLoaded = false
    this.type = 'Audio'
  }

  setAudio (audio) {
    this.hasLoaded = true
    this.audio = audio
  }
}
