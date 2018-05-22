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
