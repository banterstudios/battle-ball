import { EntityManager } from '../../managers'
import { Moveable, Sprite, Position, BoundingBox, Input } from '../../components'
import { FloorTile, IsometricCamera } from '../../assemblages'
import { RenderSystem, MapSystem, InputSystem } from '../../systems'

export default class Play {
  constructor ({ game }) {
    this.game = game
    this.camera = null
  }

  init () {
    this.manager = new EntityManager()

    this.addComponents()
    this.addAssemblages()
    this.createCamera()
    this.addSystems()
  }

  addComponents () {
    this.manager.addComponent(Moveable.name, Moveable)
    this.manager.addComponent(Sprite.name, Sprite)
    this.manager.addComponent(Position.name, Position)
    this.manager.addComponent(BoundingBox.name, BoundingBox)
    this.manager.addComponent(Input.name, Input)
  }

  addAssemblages () {
    this.manager.addAssemblage(FloorTile.name, FloorTile)
    this.manager.addAssemblage(IsometricCamera.name, IsometricCamera)
  }

  createCamera () {
    this.camera = this.manager.createEntityFromAssemblage('IsometricCamera')

    this.manager.updateComponentDataForEntity('Position', this.camera, {
      x: this.game.gameWidth / 2,
      y: 25
    })
  }

  addSystems () {
    this.manager.addSystem(new InputSystem({ manager: this.manager, game: this.game }))
    this.manager.addSystem(new MapSystem({ manager: this.manager, game: this.game, camera: this.camera }))
    this.manager.addSystem(new RenderSystem({ manager: this.manager, game: this.game, camera: this.camera }))
  }

  render (delta) {
    this.manager.update(delta)
  }

  destroy () {
    this.manager.destroy()
    this.manager = null
  }
}
