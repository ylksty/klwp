import { DEMOMSGCHANGE } from '../types/demo'
import { createAction } from 'redux-actions'

export const demoFun = createAction(DEMOMSGCHANGE, () => {
  return 2
})
