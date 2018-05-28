export default {
  name: 'FloorTile',
  description: 'Floor tile for battleball',
  components: [
    'Moveable',
    'Position',
    'Sprite'
  ],
  initialState: {
    Sprite: {
      name: 'floorTile',
      width: 90,
      height: 45
    }
  }
}
