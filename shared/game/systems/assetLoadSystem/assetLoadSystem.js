import { isArray } from '../../../utils/objectUtils'
import { getImage } from '../../../utils/imageUtils'
import { getAudio } from '../../../utils/audioUtils'

const IMAGE_REGEX = /(jpeg|jpg|gif|png)$/
const AUDIO_REGEX = /(wav|mp3|ogg|aac|m4a)$/

export default class LoadManager {
  loadAsset (url) {
    switch (true) {
      case url.match(IMAGE_REGEX):
        return getImage(url)

      case url.match(AUDIO_REGEX):
        return getAudio(url)

      default:
        return null
    }
  }

  loadAssets (assets) {
    if (!isArray(assets)) {
      throw new Error(`assets is an invalid type: ${typeof assets}. Please pass an array`)
    }

    return Promise.all(
      assets.reduce((arr, url) => {
        const assetToLoad = this.loadAsset(url)
        return assetToLoad ? [...arr, assetToLoad()] : arr
      }, [])
    )
  }
}
