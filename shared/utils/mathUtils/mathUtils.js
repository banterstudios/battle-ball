export const mapToIsoCoord = (x, y, width, height) => ({
  x: (x - y) * (width / 2),
  y: (x + y) * (height / 2)
})

export const isoToMapCoord = (x, y, width, height) => ({
  x: (x / (width / 2) + y / (height / 2)) / 2,
  y: (y / (height / 2) - (x / (width / 2))) / 2
})

export const isInView = ({ x, y, gameWidth, gameHeight, height, width }) => (
  !(x >= gameWidth ||
  (x + width) <= 0 ||
  y >= gameHeight ||
  y + height <= 0)
)
