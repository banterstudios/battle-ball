export default {
  name: 'FloorTile',
  description: 'Floor tile for battleball',
  components: [
    'Position',
    'Sprite',
    'Input'
  ],
  initialState: {
    Input: {
      clickable: true,
      hoverable: true
    }
  }
}
