import { isArray } from '../../../utils/objectUtils'
import { getImage } from '../../../utils/imageUtils'
import { getAudio } from '../../../utils/audioUtils'

const loadAsset = (component) => {
  switch (component.type) {
    case 'sprite':
      return getImage(component.url).then(component.setImage)

    case 'audio':
      return getAudio(component.url).then(component.setAudio)

    default:
      return null
  }
}

/**
 * @description Will loop around all entities and load in either a sprite or audio source.
 * @param {Array} entities - Sprite or Audio entities
 * @returns {Promise}
 */
export default (entities) => (
  Promise.all(
    isArray(entities) ? (
      entities.reduce((arr, component) => (
        [...arr, loadAsset(component)]
      ), [])
    ) : []
  )
)
