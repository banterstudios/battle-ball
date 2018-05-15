const FUNCTION_PROTO = '[object Function]'

export const isArray = (arr) => Array.isArray(arr)

export const isObject = (obj) => typeof obj === 'object' && (Array.isArray(obj) === false)

export const isString = (value) => typeof value === 'string'

export const isFunction = (value) => {
  return Object.prototype.toString.call(value) === FUNCTION_PROTO
}

export const isDate = (date) => date instanceof Date

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

export const clone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (isDate(obj)) {
    const dateCopy = new Date()
    dateCopy.setTime(obj.getTime())
    return dateCopy
  }

  if (isArray(obj)) {
    return obj.map((entry) => clone(entry))
  }

  if (isObject(obj)) {
    return Object.entries(obj).reduce((acc, [key, value]) => (
      obj.hasOwnProperty(key) ? { ...acc, [key]: clone(value) } : acc
    ), {})
  }
}

export const removeFromObjectNoMutation = (id, data) => {
  const { [id]: _, ...newData } = data
  return newData
}

export const path = (paths, obj) => {
  let val = obj
  let index = 0

  while (index < paths.length) {
    if (val == null) {
      return
    }

    val = val[paths[index]]
    index += 1
  }

  return val
}
