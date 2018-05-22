import { handleAction } from 'redux-actions'
import { DEMOMSGCHANGE } from '../types/demo'

export default handleAction(
  DEMOMSGCHANGE,
  (state, action) => {
    return {
      ...state,
      msg: state.msg + action.payload
    }
  }, {
    msg: 'xxx'
  }
)
