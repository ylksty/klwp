// ENV
// const env = 'development' // 'development' or 'production'
const env = 'development' // 'development' or 'production'
// const env = 'production' // 'development' or 'production'

// WXAPP VERSION
const version = 2.0

// development and production host
const hosts = {
  // development: 'http://wx.ylkget.cn',
  development: 'https://result.eolinker.com/HZRfx7E8cd7842bc3895f872138e9ac67da967d8b3aaa6c?uri=',
  production: 'https://wx.ylkget.com'
}

// apis
const api = {
  user: {
    /**
     * login api
     * need header:
     * {
     *   'x-wechat-code': code,
     *   'x-wechat-encrypted': encryptedData,
     *   'x-wechat-iv': iv
     * }
     */
    login: {
      method: 'POST',
      url: '/wx/user/login',
      data: {
        code: 'required'
      }
    },
    info: {
      method: 'GET',
      url: '/wx/user/info/{id}'
    },
    blog: {
      method: 'GET',
      url: '/v2/user'
    }
  },
  blog: {
    list: {
      method: 'GET',
      url: '/v2/blogs'
    },
    detail: {
      method: 'GET',
      url: '/v2/blogs'
    },
    like: {
      method: 'POST',
      url: '/blog/like'
    },
    delete: {
      method: 'POST',
      url: '/blog/delete'
    },
    imageUpload: {
      method: 'POST',
      url: '/blog/image'
    },
    new: {
      method: 'POST',
      url: '/v2/blogs'
    },
    comment: {
      method: 'POST',
      url: '/v2/comments'
    },
    deleteComment: {
      method: 'DELETE',
      url: '/v2/comments'
    }
  },
  notifications: {
    count: {
      method: 'GET',
      url: '/v2/notifications'
    },
    messages: {
      method: 'GET',
      url: '/v2/notifications/messages'
    },
    read: {
      method: 'PUT',
      url: '/v2/notifications'
    }
  },
  ads: {
    method: 'GET',
    url: '/v2/ads'
  },
  configs: {
    method: 'GET',
    url: '/v2/configs'
  }
}

module.exports = {
  env,
  version,
  api: disposeUrl(api, hosts[env])
}

function disposeUrl (obj, prefix) {
  Object.keys(obj).forEach(v => {
    if (obj[v].url) {
      obj[v].url = prefix + obj[v].url
    } else {
      obj[v] = disposeUrl(obj[v], prefix)
    }
  })

  return obj
}
