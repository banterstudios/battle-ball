import { isArray } from '../../../utils/objectUtils'
import { getImage } from '../../../utils/imageUtils'
import { getAudio } from '../../../utils/audioUtils'
import { ASSET_TYPES } from '../../consts'

const checkAssetValidity = (assets) => {
  if (!isArray(assets)) {
    throw new Error(`Assets is an invalid type: ${typeof assets} - Assets needs to be an array`)
  }

  return true
}

const loadAssetByType = ({ type, src }) => {
  switch (type) {
    case ASSET_TYPES.IMAGE:
      return getImage(src)

    case ASSET_TYPES.AUDIO:
      return getAudio(src)

    default:
      return null
  }
}

export default class AssetManager {
  constructor () {
    this.assets = new Map()
  }

  /**
   * @description Really good for splash screen shit.
   * @param {Array} assets
   */
  async loadAssets (assets, progressUpdateCallback) {
    checkAssetValidity(assets)

    for (const asset of assets) {
      try {
        this.assets.set(asset.name, { loading: true, img: null })

        const img = await loadAssetByType(asset)

        this.assets.set(asset.name, { loading: false, img })

        if (progressUpdateCallback) {
          progressUpdateCallback(img)
        }
      } catch (e) {
        throw new Error(e)
      }
    }

    return this.assets
  }

  getAsset (name) {
    return this.assets.get(name)
  }
}
