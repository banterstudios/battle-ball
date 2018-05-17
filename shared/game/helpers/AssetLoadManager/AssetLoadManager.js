import { isArray } from '../../../utils/objectUtils'
import { getImage } from '../../../utils/imageUtils'
import { getAudio } from '../../../utils/audioUtils'

export const ASSET_TYPES = Object.freeze({
  IMAGE: 'image',
  AUDIO: 'audio'
})

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

function * assetLoadManager (assets) {
  if (!isArray(assets)) {
    throw new Error(`Assets is an invalid type: ${typeof assets} - Assets needs to be an array`)
  }

  const totalAssets = []

  for (let i = 0, len = assets.length; i < len; i++) {
    try {
      const data = yield [loadAssetByType(assets[i]), i]
      totalAssets.push(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  return totalAssets
}

export default assetLoadManager
