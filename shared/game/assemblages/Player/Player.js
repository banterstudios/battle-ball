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
      width: 100,
      height: 65
    },
    'Position': {
      x: 0,
      y: 0
    },
    'Sprite': {
      width: 40,
      height: 60,
      name: 'player_blue'
    }
  }
}
