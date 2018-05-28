import { EntityManager } from '../../managers'
import { Moveable, Sprite, Position } from '../../components'
import { FloorTile } from '../../assemblages'
import { RenderSystem } from '../../systems'

export default class Play {
  constructor ({ game }) {
    this.game = game
  }

  init () {
    this.manager = new EntityManager()

    this.addComponents()
    this.addAssemblages()
    this.addEntities()
    this.addSystems()
  }

  addComponents () {
    this.manager.addComponent(Moveable.name, Moveable)
    this.manager.addComponent(Sprite.name, Sprite)
    this.manager.addComponent(Position.name, Position)
  }

  addAssemblages () {
    this.manager.addAssemblage(FloorTile.name, FloorTile)
  }

  addEntities () {
  }

  addSystems () {
    this.manager.addSystems(new RenderSystem({ manager: this.manager, game: this.game }))
  }

  render (delta) {
    this.manager.update(delta)
  }

  destroy () {
    this.manager.destroy()
    this.manager = null
  }
}
