import wepy from 'wepy'
import request from '../model/request'

export default class requestMixin extends wepy.mixin {
  async syncRequest (apiConfig) {
    return await request.syncRequest(apiConfig)
  }
  asyncRequest (apiConfig, cb) {
    return request.asyncRequest(apiConfig)
  }
}
