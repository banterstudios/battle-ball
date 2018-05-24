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
        const data = await loadAssetByType(asset)

        this.assets.set(asset.name, data)

        if (progressUpdateCallback) {
          progressUpdateCallback(data)
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
