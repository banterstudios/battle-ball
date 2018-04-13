import { rehydrate } from 'glamor'

export default () => {
  if (process.browser) {
    const initialStyleIds = (window.__INITIAL_STYLE_IDS__ || '')
    rehydrate(initialStyleIds)
  }
}
