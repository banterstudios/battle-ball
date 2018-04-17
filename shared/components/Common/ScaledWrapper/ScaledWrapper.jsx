import glamorous from 'glamorous'

export default glamorous.div(({ theme: { game: { width, height } } }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width,
  height,
  transform: 'scale(1)',
  transformOrigin: 'top left',
  background: `url('/static/assets/images/menu/background.png') center / cover no-repeat`
}))
