import { combineReducers } from 'redux'
import counter from './counter'
import demo from './demo'

export default combineReducers({
  counter,
  demo
})
