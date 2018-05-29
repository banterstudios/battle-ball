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
