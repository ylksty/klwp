import { combineReducers } from 'redux'
import counter from './counter'
import demo from './demo'
import user from './user'

export default combineReducers({
  counter,
  demo,
  user
})
