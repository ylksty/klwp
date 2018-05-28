import wepy from 'wepy'
import request from '../model/request'

export default class requestMixin extends wepy.mixin {
  components = {
  }
  data = {
  }
  watch = {
  }
  methods = {
  }
  async mxRequestSync (apiConfig) {
    return await request.syncRequest(apiConfig)
  }
  mxRequestAsync (apiConfig, cb) {
    return request.asyncRequest(apiConfig)
  }
}
