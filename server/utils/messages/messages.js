import { SUCCESS, ERROR } from '../../../shared/consts/codes'

export const successMessage = ({ data = {} }) => ({
  status: SUCCESS,
  data
})

export const errorMessage = ({ message = '', error = '' }) => ({
  status: ERROR,
  message,
  error
})
