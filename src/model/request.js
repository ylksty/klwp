import wepy from 'wepy'
import authModel from './authModel'

async function syncRequest(apiConfig) {
  if (apiConfig.auth) {
    let sk = authModel.getSessionKey()
    apiConfig.header = {}
    apiConfig.header.cookie = 'SESSION=' + sk
  }
  let response = await wepy.request(apiConfig)
  return response
}

function asyncRequest(apiConfig, cb) {
  if (apiConfig.auth) {
    let sk = authModel.getSessionKey()
    apiConfig.header = {}
    apiConfig.header.cookie = 'SESSION=' + sk
  }
  wepy.request(apiConfig).then(d => cb(d))
}

export default {
  syncRequest,
  asyncRequest
}
