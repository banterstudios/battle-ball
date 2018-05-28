export default {
  name: 'FloorTile',
  description: 'Floor tile for battleball',
  components: [
    'Movable',
    'Position',
    'Sprite'
  ],
  initialState: {
    Sprite: {
      name: 'floortile'
    }
  }
}
