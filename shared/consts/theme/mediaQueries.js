const breakpoints = require('./breakpoints')

const createMinWidth = (value) => (
  `(min-width: ${value}px)`
)

const createMaxWidth = (value) => (
  (typeof value === 'number') ? ` and (max-width: ${value}px)` : ''
)

const createQueries = (obj, [ key, { min, max } ]) => (
  {
    ...obj,
    [`${key}Query`]: `@media screen and ${createMinWidth(min)}${createMaxWidth(max)}`
  }
)

module.exports = Object.entries(breakpoints).reduce(createQueries, {})
