export default {
  name: 'FloorTile',
  description: 'Floor tile for battleball',
  components: [
    'Position',
    'Sprite'
  ],
  initialState: {
    Position: {
      x: 0,
      y: 0,
      z: 0
    }
  }
}
