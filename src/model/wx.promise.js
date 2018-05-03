/**
 * Created by yanglk on 17/8/29.
 */

/* global wx */
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (err) {
        reject(err)
      }
      fn(obj)
    })
  }
}

export default [
  'login', 'getUserInfo', 'getLocation', 'authorize', 'getSetting', 'startRecord', 'stopRecord',
  'showModal', 'showToast', 'openSetting', 'checkSession'
].reduce((acc, cur) => {
  acc[cur] = wxPromisify(wx[cur])
  return acc
}, {
  wxPromisify: wxPromisify
})
