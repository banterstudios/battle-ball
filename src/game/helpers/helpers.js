import { STATIC_TILE_WIDTH, STATIC_TILE_HEIGHT } from '../consts'

export const mapToIsoCoord = (x, y) => ({
  x: (x - y) * (STATIC_TILE_WIDTH / 2),
  y: (x + y) * (STATIC_TILE_HEIGHT / 2)
})

export const isoToMapCoord = (x, y) => ({
  x: (x / (STATIC_TILE_WIDTH / 2) + y / (STATIC_TILE_HEIGHT / 2)) / 2,
  y: (y / (STATIC_TILE_HEIGHT / 2) - (x / (STATIC_TILE_WIDTH / 2))) / 2
})

export const isInView = ({ x, y, gameWidth, gameHeight, height, width }) => (
  !(x >= gameWidth ||
  (x + width) <= 0 ||
  y >= gameHeight ||
  y + height <= 0)
)
export const setFullScreen = () => {
  const doc = window.document
  const docEl = doc.documentElement

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  }
}

export const doRectsIntersect = (r1, r2) => (
  !(
    r2.x > (r1.x + r1.width) ||
    (r2.x + r2.width) < r1.x ||
    r2.y > (r1.y + r1.height) ||
    (r2.y + r2.height) < r1.y
  )
)
