import Entity from '../Entity'
import { Sprite } from '../../components'

export default () => {
  const Player = new Entity()
  Player.addComponent(new Sprite({ spriteName: 'player' }))

  return Player
}
