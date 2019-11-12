import fetch from 'isomorphic-unfetch'
import localforage from 'localforage'
import { message } from 'antd'
import queryString from 'query-string'


const R = {

  API_ROOT: 'http://106.13.165.252',
  API_ROOT_LOCAL: 'http://localhost',
  REMOTE_HOSTS: ['http://106.13.165.252'],
  //
  // API_ROOT: 'http://localhost',
  // API_ROOT_LOCAL: 'http://localhost',
  // REMOTE_HOSTS: ['http://localhost'],
  //

  getApiRootByRemote() {
    return Promise.race(R.REMOTE_HOSTS.map(rootUrl => fetch(`${rootUrl}/ping`)))
      .then(
        response => {
          const { url, ok, status } = response
          if (ok && status === 200) {
            return response.text().then(text => {
              if (text === 'pong') {
                R.API_ROOT = url.slice(0, -5)
                R.setApiRoot(R.API_ROOT)
                console.info(`${R.API_ROOT} is now at your service!`)
                return R.API_ROOT
              }
              return Promise.reject()
            })
          }
          return Promise.reject(new Error(`ok: ${ok}, status: ${status}`))
        },
        error => Promise.reject(error)
      )
      .catch(error => {
        message.error('Failed to ping any remote host')
        return Promise.reject(new Error(`Failed to ping any remote host: ${error}`))
      })
  },

  getApiRoot() {
    return localforage
      .getItem('API_ROOT')
      .then(apiRoot => {
        if (apiRoot) {
          R.API_ROOT = apiRoot
          return apiRoot
        }
        if (NODE_ENV === 'production') {
          return R.getApiRootByRemote()
        }
        R.API_ROOT = R.API_ROOT_LOCAL
        return R.API_ROOT
      })
      .catch(e => console.warn(e))
  },

  setApiRoot(newApiRoot) {
    R.API_ROOT = newApiRoot
    return localforage.setItem('API_ROOT', newApiRoot).catch(e => console.info(e))
  },

  intercept(...rest) {
    const callbacks = Array.prototype.slice.call(rest)
    return req => {
      const { callback } = req
      req.callback = (err, res) => {
        callbacks.forEach(e => {
          e.call(req, err, res)
        })
        callback.call(req, err, res)
      }
    }
  },

  wrapDefaults(r) {
    const extra = {}
    if (R.agentEnabled) {
      extra.agentname = R.agentname
    }
    if (R.fetchWithToken) {
      extra.token = R.token
    } else {
      extra.session_id = R.sessionId
    }
    return r
      .send({
        locale: global.window.LANGUAGE,
        DEVICE_TYPE,
        ORIGIN: global.location.origin,
        ...extra
      })
      .set('Authorization', R.authorization)
  },

  showMsg() {
    return R.intercept((err, res) => {
      if (!err) {
        if (!res.body || res.body.noMessage) return
        if (res.body.message) {
          message.info(res.body.message)
        } else if (res.body.ok) {
          message.success(TR('Operation Succeeded'))
        } else if (res.body.ok === false) {
          message.error(TR('Operation Failed'))
        }
      } else if (err.status === 401) {
        R.setAuthorization('')
        message.info('暂未登录')
      } else {
        message.error(TR('Known error occurred, might caused by failure in internet connection'))
      }
    })
  },

  delete(path, data) {
    fetch(`${R.API_ROOT}/${path}`, {
      method: 'DELETE',
      body: R.body(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },

  body(data) {
    const extra = {}
    if (R.agentEnabled) {
      extra.agentname = R.agentname
    }
    if (R.fetchWithToken) {
      extra.token = R.token
    } else {
      extra.session_id = R.sessionId
    }
    return {
      ...extra,
      ...data
    }
  },

  get(path, data = {}, root = null) {
      const params = R.body(data)
      const query = queryString.stringify(params)
      return fetch(`${root || R.API_ROOT}/${path}?${query}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  },

  delete(path, data) {
    console.info('abbbb')
    return fetch(`${R.API_ROOT}/${path}`, {
      method: 'DELETE',
      body: R.body(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  },

  patch(path, data) {
      return fetch(`${R.API_ROOT}/${path}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(R.body(data))
      })
  },

  post(path, data) {
    return fetch(`${R.API_ROOT}/${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(R.body(data))
    })
  },

  put(path, data) {
    return R.getSessionId().then(() => {
      return fetch(`${R.API_ROOT}/${path}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(R.body(data))
      })
    })
  }
}

export default R
