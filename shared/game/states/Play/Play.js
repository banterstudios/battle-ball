import { EntityManager } from '../../managers'

import { STATIC_TILE_HEIGHT } from '../../consts'

import {
  Moveable,
  Sprite,
  Position,
  BoundingBox,
  Collidable,
  TileMap,
  Player
} from '../../components'

import {
  FloorTile,
  IsometricCamera,
  Level,
  Player as PlayerAssemblage
} from '../../assemblages'

import {
  RenderSystem,
  MapSystem,
  CollisionSystem,
  PlayerFollowSystem
} from '../../systems'

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
    this.createPlayer()
    this.addSystems()
  }

  addComponents () {
    this.manager.addComponent(Player.name, Player)
    this.manager.addComponent(Collidable.name, Collidable)
    this.manager.addComponent(Moveable.name, Moveable)
    this.manager.addComponent(Sprite.name, Sprite)
    this.manager.addComponent(Position.name, Position)
    this.manager.addComponent(BoundingBox.name, BoundingBox)
    this.manager.addComponent(TileMap.name, TileMap)
  }

  addAssemblages () {
    this.manager.addAssemblage(PlayerAssemblage.name, PlayerAssemblage)
    this.manager.addAssemblage(Level.name, Level)
    this.manager.addAssemblage(FloorTile.name, FloorTile)
    this.manager.addAssemblage(IsometricCamera.name, IsometricCamera)
  }

  createCamera () {
    this.camera = this.manager.createEntityFromAssemblage(IsometricCamera.name)

    this.manager.updateComponentDataForEntity('Position', this.camera, {
      x: this.game.gameWidth / 2,
      y: -(STATIC_TILE_HEIGHT / 2)
    })
  }

  createPlayer () {
    this.manager.createEntityFromAssemblage(PlayerAssemblage.name)
  }

  addSystems () {
    this.manager.addLogicSystem(new CollisionSystem({ manager: this.manager, game: this.game, camera: this.camera }))
    this.manager.addLogicSystem(new PlayerFollowSystem({ manager: this.manager, game: this.game, camera: this.camera }))
    this.manager.addRenderSystem(new MapSystem({ manager: this.manager, game: this.game, camera: this.camera }))
    this.manager.addRenderSystem(new RenderSystem({ manager: this.manager, game: this.game, camera: this.camera }))
  }

  update (step) {
    this.manager.update(step)
  }

  render (delta) {
    this.manager.render(delta)
  }

  destroy () {
    this.manager.destroy()
    this.manager = null
  }
}
