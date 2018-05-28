import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { actionUserInfoSet } from '../store/actions'
import User from '@/components/user' // aliasFields example
import _ from '@/model/wx.promise'

@connect({
  getName (state) {
    return state.user.nickName
  }
}, {
  actionUserInfoSet
})

export default class userMixin extends wepy.mixin {
  components = {
    user: User
  }
  data = {
  }
  watch = {
  }
  methods = {
    bindGetUserInfo (e) {
      if (e.detail.rawData) {
        if ((wepy.getStorageSync('storageUserInfo') !== e.detail.rawData)) {
          this.$invoke('user', 'comUserInfoSet', e.detail.rawData)
        } else {
          console.log('用户数据未更新')
        }
      }
    }
  }
  onLoad() {
    _.getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        _.getUserInfo().then(res => {
          if (res.rawData === wepy.getStorageSync('storageUserInfo')) {
            this.$invoke('user', 'actionUserInfoSet', wepy.getStorageSync('storageUserInfo'))
          } else {
            this.$invoke('user', 'comUserInfoSet', res.rawData)
          }
        })
      }
    })
  }
}
