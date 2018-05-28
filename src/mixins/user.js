import wepy from 'wepy'
import { connect } from 'wepy-redux'
import { actionUserInfoSet } from '../store/actions'
import User from '@/components/user' // aliasFields example
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
        if (wepy.getStorageSync('storageUserInfo') !== e.detail.rawData) {
          wepy.setStorageSync('storageUserInfo', e.detail.rawData)
          this.$invoke('user', 'actionUserInfoSet', e.detail.rawData)
        }
      }
    }
  }
  onLoad() {
    if (wepy.getStorageSync('storageUserInfo')) {
      this.$invoke('user', 'actionUserInfoSet', wepy.getStorageSync('storageUserInfo'))
    }
  }
}
