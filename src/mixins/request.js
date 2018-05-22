import wepy from 'wepy'
import request from '../model/request'
import _ from '../model/wx.promise'

export default class requestMixin extends wepy.mixin {
  data = {
    userInfoButton: 1
  }
  watch = {
    userInfoButton (newValue, oldValue) {
      console.log(newValue)
    }
  }
  async mxsyncRequest (apiConfig) {
    if (!this.mxcheckApi(apiConfig)) {
      return false
    }
    return await request.syncRequest(apiConfig)
  }
  mxasyncRequest (apiConfig, cb) {
    if (!this.mxcheckApi(apiConfig)) {
      return false
    }
    return request.asyncRequest(apiConfig)
  }
  mxcheckApi(apiConfig) {
    if (apiConfig.auth) {
      _.getSetting().then(res => {
        if (res.authSetting['userInfo']) {
          // 曾经确实是授过权，直接 resolved
          return true
        } else {
          this.userInfoButton++
          this.$apply()
        }
      })
    }
  }
}
