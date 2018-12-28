const initialStore = process.browser ? (window.__INITIAL_STATE__ || {}) : {}

export default initialStore
