import { handleAction } from 'redux-actions'
import { USER_INFO_SET } from '../types/user'

export default handleAction(
  USER_INFO_SET,
  (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  }, {
    nickName: '自己',
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIcIiaFaIstAv2DxVDkSZ7Kkp7obGDwTuAFvIx2XgQiavsYv6EwabICC6uQMIiajuyqvUCHribsnE4kEw/132',
    gender: '未知',
    city: '未知',
    province: '未知',
    country: '未知',
    language: '未知'
  }
)
