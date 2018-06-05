export default {
  name: 'Player',
  description: 'Playable character',
  components: [
    'BoundingBox',
    'Moveable',
    'Player',
    'Position',
    'Sprite'
  ],
  initialState: {
    'BoundingBox': {
      x: 0,
      y: 0,
      width: 128,
      height: 128
    },
    'Position': {
      x: 2,
      y: 0
    },
    'Sprite': {
      width: 128,
      height: 128,
      name: 'player_blue'
    }
  }
}
