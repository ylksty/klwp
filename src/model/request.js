import wepy from 'wepy'
import authModel from './authModel'

async function syncRequest(apiConfig) {
  apiConfig = apiConfig.apiConfigPre()
  let sk = await authModel.getSessionKey()
  if (!sk) {
    return false
  }
  apiConfig.header = {}
  apiConfig.header.cookie = 'SESSION=' + sk
  let response = await wepy.request(apiConfig)
  return response
}

/**
 * 异步请求
 * @param apiConfig
 * @param cb
 */
function asyncRequest(apiConfig, cb) {
  // console.log(apiConfig)
  // apiConfig = apiConfig.apiConfigPre()
  getSk().then(res => {
    apiConfig.header = {}
    apiConfig.header.cookie = 'SESSION=' + res
    wepy.request(apiConfig).then(d => cb(d))
  })
}

async function getSk() {
  return new Promise(async (res, rej) => {
    let sk = await authModel.getSessionKey()
    if (!sk) {
      rej(false)
    } else {
      res(sk)
    }
  })
}

export default {
  syncRequest,
  asyncRequest
}
