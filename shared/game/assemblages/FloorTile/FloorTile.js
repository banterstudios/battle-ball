export default {
  name: 'FloorTile',
  description: 'Floor tile for battleball',
  components: [
    'Position',
    'Sprite',
    'Input',
    'Collidable',
    'BoundingBox'
  ],
  initialState: {
    Input: {
      clickable: true,
      hoverable: true
    },
    Position: {
      x: 0,
      y: 0,
      z: 0
    }
  }
}
