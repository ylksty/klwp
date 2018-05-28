import { USER_INFO_SET } from '../types/user'
import { createAction } from 'redux-actions'

export const actionUserInfoSet = createAction(USER_INFO_SET, (e) => {
  return JSON.parse(e)
})
