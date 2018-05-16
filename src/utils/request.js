import wepy from 'wepy'
import interfaces from '../interfaces'

export default async function request (options) {
  // if (options.header) {
  //   options.header['x-wechat-session'] = wepy.getStorageSync('_session')
  // } else {
  //   options.header = {
  //     'x-wechat-session': wepy.getStorageSync('_session')
  //   }
  // }

  console.log(options)
  wepy.request(options).then(d => console.log(d))
  // let response = await wepy.request(options)
  // console.log(response)
  //
  // if (response.statusCode === 401) {
  //   await interfaces.login()
  //   return await wepy.request(options)
  // } else if (response.statusCode === 500) {
  //   wepy.showModal({
  //     title: '提示',
  //     content: `服务器错误，请截图本提示，并联系深大汪峰。${response.data.errmsg}`
  //   })
  // } else {
  //   return response
  // }
}
