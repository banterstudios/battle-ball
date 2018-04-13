const FUNCTION_PROTO = '[object Function]'

export const isArray = (arr) => Array.isArray(arr)

export const isObject = (obj) => typeof obj === 'object' && (Array.isArray(obj) === false)

export const isString = (value) => typeof value === 'string'

export const isFunction = (value) => {
  return Object.prototype.toString.call(value) === FUNCTION_PROTO
}

export const isTruthy = (value) => !!value

const allowOrOmit = (obj, props, allow) => {
  if (!isObject(obj) || !isArray(props)) {
    throw new Error('Either object or props is not correct. Please check your parameters.')
  }

  return Object.entries(obj).reduce((obj, [ key, value ]) => {
    if ((allow && props.includes(key)) || (!allow && !props.includes(key))) {
      obj[key] = value
    }

    return obj
  }, {})
}

export const omit = (obj, props) => {
  return allowOrOmit(obj, props, false)
}

export const allowOnly = (obj, props) => {
  return allowOrOmit(obj, props, true)
}

export const checkIfValueIsAllowedOrSetDefault = (value = '', allowedProps = [], defaultValue = '') => {
  return !allowedProps.includes(value) ? defaultValue : value
}
