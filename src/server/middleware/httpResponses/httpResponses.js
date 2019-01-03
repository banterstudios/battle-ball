import * as payloads from './payloads'

export default () => (req, res, next) => {
  if (res.httpResponse) {
    throw new Error('httpResponse already exists on response object')
  }

  res.httpResponse = Object.entries(payloads).reduce((obj, [key, value]) => (
    {
      ...obj,
      [key]: (...params) => {
        const payload = payloads[key].apply(payloads, params)
        return res.status(payload.status).send(payload)
      }
    }
  ), {})

  next()
}
