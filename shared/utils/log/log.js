import isDev from 'isdev'

const baseLog = (type, text, ...extra) => {
  if (isDev && console && console[type]) {
    console[type](text, ...extra)
  }
}

export const log = (text, ...extra) => {
  return baseLog('log', text, ...extra)
}

export const warn = (text, ...extra) => {
  return baseLog('warn', text, ...extra)
}

export const error = (text, ...extra) => {
  return baseLog('error', text, ...extra)
}

export default log
