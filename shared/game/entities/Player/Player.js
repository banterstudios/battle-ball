import Entity from '../Entity'
import { Sprite } from '../../components'

export default () => {
  const Player = new Entity()
  Player.addComponent(new Sprite())

  return Player
}
