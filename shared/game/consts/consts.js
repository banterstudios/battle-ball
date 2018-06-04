export const GAME_STATES = Object.freeze({
  PLAY: 0,
  MENU: 1,
  END: 2,
  LOADER: 3,
  PRELOAD: 4,
  BOOT: 5
})

export const FPS = 60

export const STEP = 1 / FPS

export const FRAME_DIVIDER = 1000

export const PUB_SUB = Object.freeze({
  UPDATE_STATE: 0
})

export const ASSET_TYPES = Object.freeze({
  IMAGE: 'image',
  AUDIO: 'audio'
})

export const GAME_WIDTH = 2048

export const GAME_HEIGHT = (GAME_WIDTH / 2)

export const STATIC_TILE_WIDTH = 128

export const STATIC_TILE_HEIGHT = (STATIC_TILE_WIDTH / 2)

export const GAME_INPUT = {

}
