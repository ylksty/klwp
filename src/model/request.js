import wepy from 'wepy'
import authModel from './authModel'

async function syncRequest(apiConfig) {
  if (apiConfig.auth) {
    let sk = await authModel.getSessionKey()
    if (!sk) {
      return false
    }
    apiConfig.header = {}
    apiConfig.header.cookie = 'SESSION=' + sk
  }
  let response = await wepy.request(apiConfig)
  return response
}

function asyncRequest(apiConfig, cb) {
  if (apiConfig.auth) {
    getSk().then(res => {
      console.log(res)
      return
      apiConfig.header = {}
      apiConfig.header.cookie = 'SESSION=' + res
      wepy.request(apiConfig).then(d => cb(d))
    })
  }
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
