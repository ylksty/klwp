import wepy from 'wepy'
import _ from './wx.promise'
import { api } from '../config'

function authGet(key) {
  // 合成接口对应的授权名
  var scope = 'scope.' + key
  // Promise
  return new Promise((resolve, reject) => {
    // 获取授权情况
    _.getSetting().then(res => {
      if (res.authSetting[scope]) {
        // 曾经确实是授过权，直接 resolved
        resolve(true)
      } else {
        // 尚未授权，则需要主动挑起授权
        _.authorize({
          // 希望授权的名字
          scope: scope
        }).then(suc => {
          // 用户同意授权， resolved
          resolve(suc)
        }, rej => {
          // 不然的话 就是我刚刚提到的递归请求授权了
          // 因此编写 reGet
          reGet(scope, resolve)
        })
      }
    })
  })
}
function reGet(scope, authRes) {
  // 弹窗询问
  _.showModal({
    title: '授权提醒',
    content: '拒绝授权会影响小程序的使用, 请点击重新授权',
    confirmText: '重新授权',
    // 只有确定，没有取消
    showCancel: false
  }).then(() => {
    // 打开设置 用户自己设置被拒绝的权限为允许
    _.openSetting().then(() => {
      // 用户结束了设置框
      // 但是还要检查
      _.getSetting().then(res => {
        if (!res.authSetting[scope]) {
          // 居然什么也没做就退出来设置了
          // 递归地 reGet
          // 写一个 setTimeout 防止太阻塞 JSCore ...
          setTimeout(() => {
            reGet(scope, authRes)
          })
        } else {
          // resolved！
          authRes()
        }
      })
    })
  })
}
async function getSessionKey(force = false) { // 获得sessionKey
  let checkSession = await _.checkSession().then(res => {
    return true
  }, res => {
    return false
  })
  let storageSession = wepy.getStorageSync('storageSession')
  if (checkSession && storageSession && !force) { // 返回缓存
    return storageSession
  } else {
    let ldata = await _.login() // 同步登陆
    console.log(ldata)
    let code = ldata.code
    console.log(api.user.login)
    let config = Object.assign({}, api.user.login, {data: { code }})
    let res = await wepy.request(config).then(res => {
      return res
    })
    console.log(res)
  }
  return checkSession
}
async function getUserInfo() {
  await authGet('userInfo')
  let res = wepy.getStorageSync('userInfo')
  if (!res) {
    res = await _.getUserInfo()
    wepy.setStorageSync('userInfo', res)
  }
  return res
}
async function getLocation() {
  await authGet('userLocation')
  let res = wepy.getStorageSync('userLocation')
  if (!res) {
    res = await _.getLocation()
    wepy.setStorageSync('userLocation', res)
  }
  return res
}

export default {
  getSessionKey,
  authGet,
  getUserInfo,
  getLocation
}
