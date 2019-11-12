import _ from 'lodash'
import I, { Map } from 'immutable'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { Modal, notification } from 'antd'
import moment from 'moment'
import Router from 'next/router'
import { settingsSetIn } from '../redux/modules/settings'
import { notificationOpen } from '../utils'
import { couponsSet } from '../redux/modules/coupons'
import request from '../utils/request'
import { selfMerge, selfSet } from '../redux/modules/self'
import { paymentsMerge } from '../redux/modules/payments'
import { goodsSet } from '../redux/modules/goods'
import { TR, TV } from '../utils/translation'
import { trafficsMergeIn, trafficsReset } from '../redux/modules/traffic'
import { viewSetIn, setFetching, getFetching, setLoggedIn, viewSet } from '../redux/modules/view'
import loginState from './sessions'

const { confirm } = Modal

export const getAvailableGoods = () => D =>
  request
    .get('users/available_goods')
    .then(res => res.json())
    .then(body => {
      const { data, ok } = body
      if (ok) {
        D(goodsSet(I.fromJS(_.keyBy(data || [], 'id'))))
      }
      return ok
    })

export const sendFindPasswordCode = () => (D, S) => {
  const v = S().view.get('findPasswordEmailOrMobile')
  return request
    .post('users/send_find_password_code', {
      email_or_mobile: v
    })
    .then(res => {
      console.info(res.text())
    })
}

export const buyService = (good, months) => (D, S) => {
  const goodId = good.get('id')
  const { view } = S()
  const couponId = view.getIn(['payment', 'coupon', 'id'])
  Modal.confirm({
    title: TR('Confirm to buy?'),
    content: TR('Click OK to buy'),
    onOk: () =>
      request
        .post('users/buy_service')
        .send({ couponId, goodId, months })
        .then(res => {
          const { ok, self } = res.body
          if (ok) {
            D(selfSet(I.fromJS(self)))
            Router.push('/my/account')
          }
        })
  })
}

export const updateNickname = () => (D, S) => {
  const { self } = S()
  const nickname = self.get('nickname')
  request
    .post('/users/set_nickname', { nickname })
    .then(res => res.json())
    .then(body => {
      if (body.ok) {
        D(stellarNotification()) // eslint-disable-line no-use-before-define
        D(selfSet(self.set('nickname', nickname)))
      }
    })
}

export const updateKcptunCustomAssign = (kcptunCustomAssign, id) => () =>
  request
    .post('users/update_kcptun_custom_assign', {
      kcptunCustomAssign,
      id
    })
    .then(res => res.json())

export const getVerificationCode = (mobile, countryCode) => (D, S) => {
  request
    .post('users/verification_code', {
      mobile,
      country_code: countryCode.trim()
    })
    .then(res => res.json())
    .then(body => {
      if (body.ok) {
        const { self } = S()
        D(selfSet(self.set('mobile', mobile)))
        D(selfSet(self.set('data', I.fromJS(body.data))))
        return true
      }
      return false
    })
}

export const getMobileLoginCode = (mobile, countryCode) => (D, S) =>
  request
    .post('users/send_mobile_login_code')
    .send({
      mobile,
      country_code: countryCode.trim()
    })
    .then(res => {
      if (res.body.ok) {
        const { self } = S()
        D(selfSet(self.set('mobile', mobile)))
      }
      return res.body
    })

export const verifyMobile = (mobile, code) => D =>
  request
    .post('users/verify_mobile', {
      mobile,
      code
    })
    .then(res => res.json())
    .then(body => {
      if (body.ok) {
        const { self } = body
        D(selfSet(I.fromJS(self)))
      }
    })

export const saveArea = area => D => {
  return request
    .post('users/save_area', { area })
    .then(res => res.json())
    .then(body => {
      if (body.ok) {
        D(selfSet(body.self))
        D(stellarNotification()) // eslint-disable-line no-use-before-define
      }
    })
}

export const getSelf = () => D =>
  request.get('users/self').then(res => {
    const { ok, self } = res.body
    if (ok) {
      D(selfSet(I.fromJS(self)))
    }
    return ok
  })

export const paymentsIndex = () => D => {
  if (!D(getFetching('payments'))) {
    D(setFetching('payments', true))
    return request
      .get('user/payments')
      .then(res => res.json())
      .then(body => {
        const { ok, payments } = body
        if (ok) {
          D(paymentsMerge(I.fromJS(payments)))
        }
        D(setFetching('payments', false))
      })
  }
  return false
}

export const resendAccountActivationEmail = () => (D, S) =>
  request
    .post('users/resend_account_activation_email', {
      email: S().self.get('email')
    })
    .end()

export const logoutAllDevices = () => {
  confirm({
    title: TV('Logout all devices?'),
    context: TV('All devices will be logged out after confirmed. Be careful!'),
    onOk() {
      return request.post('users/logout_all_other_sessions')
    }
  })
}

export const trafficIndex = (_year, _month) => (D, S) => {
  let year = _year
  let month = _month
  if (!year) year = moment().year()
  if (!month) month = moment().month() + 1
  if (
    S()
      .traffic.get('byMonth')
      .getIn([year.toString(), month.toString()], null)
  )
    return true
  return request
    .get('user/traffic', { year, month })
    .then(res => res.json())
    .then(body => {
      const { ok, data } = body
      if (ok) {
        data.currentYear = year
        data.currentMonth = month
        D(trafficsMergeIn(['byMonth'], data || {}))
      }
      return ok
    })
}

export const leftTrafficIndex = (_year, _month, _day) => (D, S) => {
  const year = _year || moment().year()
  const month = _month || moment().month() + 1
  const day = _day || moment().date()
  if (
    S()
      .traffic.get('byDay')
      .getIn([year.toString(), month.toString(), day.toString()], null)
  )
    return true
  return request
    .get('user/traffic', { year, month, day })
    .then(res => res.json())
    .then(body => {
      const { ok, data } = body
      if (ok) {
        data.dCurrentYear = year
        data.dCurrentMonth = month
        data.dCurrentDay = day
        D(trafficsMergeIn(['byDay'], data || {}))
      }
      return ok
    })
}

export const updateUserSource = userSource => D =>
  request
    .post('/users/set_user_source')
    .send({ userSource })
    .then(res => {
      const { ok, self } = res.body
      if (ok) {
        D(selfSet(self))
      }
    })

export const updateProfessions = () => (D, S) => {
  const professions = S().view.getIn(['professionsSelection', 'selectedOptions'])
  D(showLoading())
  return request
    .post('/users/update_professions')
    .send({ professions })
    .then(res => {
      const { ok, self } = res.body
      if (ok) {
        D(selfSet(self))
        D(viewSetIn(['professionsSelection', 'open'], false))
        D(stellarNotification()) // eslint-disable-line no-use-before-define
      }
      D(hideLoading())
      return ok
    })
}

const emptyPromise = (val = null) => {
  return new Promise(resolve => resolve(val))
}

export const stellarNotification = () => (D, S) => {
  return S().view.getIn(['loginState', 'result', 'ok']) === true
    ? request
        .get('r')
        .then(res => res.json())
        .then(body => {
          const { ok } = body
          const { self, coupons, systemNotification, areas } = body
          if (ok) {
            const filterAreas = areas.filter(a => !a.includes('-'))
            D(selfMerge(I.fromJS(self)))
            D(couponsSet(I.fromJS(coupons || {})))
            D(settingsSetIn(['areas'], filterAreas))
            // checkIfAccountComplete()
            const { message, show, link } = systemNotification
            if (show) {
              notificationOpen('systemNotification', TR('New Message'), message, () => {
                notification.close('systemNotification')
                if (link) {
                  window.location.href = link
                }
              })
            }
          }
          return body
        })
        .catch(e => {
          throw e
        })
    : emptyPromise()
}

export const signup = signupBy => (D, S) => {
  const { view } = S()
  D(showLoading())
  return request
    .post('/users/register', {
      data: view.get('signup'),
      signup_by: signupBy
    })
    .then(res => {
      return res.json()
    })
    .then(r => {
      const { ok, session_id } = r
      if (ok) {
        request.setSessionId(session_id).then(() => {
          D(loginState())
        })
      }
      D(hideLoading())
    })
}

export const getTickets = () => D =>
  request
    .get('tickets')
    .then(res => res.json())
    .then(body => {
      const { data, ok } = body
      if (ok) {
        D(viewSetIn(['tickets'], I.fromJS(_.keyBy(data || [], 'id'))))
      }
    })

export const createTicket = (title, message, succeed, fail) => () =>
  request
    .post('tickets', { title, message })
    .then(res => res.json())
    .then(body => {
      if (body.ok) {
        succeed()
      } else {
        fail()
      }
    })

export const addTicketMessage = (id, message) => () => request.post('tickets/new_message', { id, message }).then()

export const closeTicket = id => () =>
  request
    .post('tickets/deal')
    .send({ id })
    .then()

export const destroyTicket = id => (D, S) => {
  const { view } = S()
  request.delete(`tickets/${id}`).then(res => {
    const { ok } = res.body
    if (ok) {
      D(viewSet(view.deleteIn(['tickets', id])))
    }
  })
}

export const updateTicket = data => D => {
  D(viewSetIn(['tickets', data.id], data))
}

export const addTicket = data => D => {
  D(viewSetIn(['tickets', data.id], data))
}

export const setSessionId = s => D => {
  return request.setSessionId(s).then(() => {
    D(loginState())
    D(stellarNotification())
  })
}

export const setToken = s => D =>
  request.setToken(s).then(() => {
    D(loginState())
  })

export const postLogin = param => D => {
  D(showLoading())
  return request
    .post('login', param)
    .then(res => {
      return res.json()
    })
    .then(r => {
      const { ok, session_id } = r
      if (ok) {
        D(setSessionId(session_id))
      }
      D(hideLoading())
      return ok
    })
}

export const login = (u, l, method = 'password') => D => {
  switch (method) {
    case 'mobileCode':
      return D(
        postLogin({
          mobile: u.trim(),
          code: l.trim()
        })
      )
    default:
      return D(
        postLogin({
          email_or_mobile_or_username: u.trim(),
          login_password: l.trim()
        })
      )
  }
}

export const logout = () => D => {
  return
  // return Promise.all([request.post('logout'), request.setSessionId('')]).then(() => {
  //   D(setLoggedIn({ ok: false }))
  //   D(selfSet(Map()))
  //   D(trafficsReset())
  //   Router.push('/login')
  // })
}

export const changePassword = () => (D, S) => {
  const fields = ['password', 'passwordConfirmation', 'oldPassword']
  request
    .post('sessions/change_password', {
      data: S().self.filter((v, k) => fields.indexOf(k) !== -1)
    })
    .then(res => res.json())
    .then(body => {
      const { ok, session_id } = body
      const { self } = S()
      if (ok) {
        D(selfSet(self.deleteAll(fields)))
        D(stellarNotification())
        return request.setSessionId(session_id).then(() => Router.push('/my/account'))
      }
      return false
    })
}

export const setPassword = () => (D, S) => {
  const { self, view } = S()
  return request
    .post('users/set_password', {
      password: self.get('password'),
      code: self.get('verificationCode'),
      email_or_mobile: view.get('findPasswordEmailOrMobile')
    })
    .then(res => {
      console.info(res.text())
    })
  // .end((err, res) => {
  //   if (!err && res.body.ok) {
  //     D(push('/login'))
  //   }
  // })
}

export const processSignupQuery = query => (D, S) => {
  const { c, email } = query
  const { view } = S()
  D(
    viewSet(
      view.update('signup', s1 =>
        s1.withMutations(s2 => {
          s2.setIn(['settings', 'area'], 'EC')
          if (!_.isEmpty(c)) {
            s2.set('referrer_short_id', c)
          }
          if (!_.isEmpty(email)) {
            const { form } = this.props
            s2.set('email_or_mobile', email)
            form.setFieldsValue({
              email,
              mobile: email
            })
          }
        })
      )
    )
  )
}

export const getUser = shortId => D =>
  request
    .get('users/name', { short_id: shortId })
    .then(res => {
      return res.json()
    })
    .then(r => {
      const { data } = r
      D(viewSetIn(['signup', 'settings', 'referrer_name'], data))
    })

export const createAccessToken = deviceType => D =>
  request
    .post('developers/create_access_token')
    .send({ for_device_type: deviceType })
    .then(res => {
      if (res.body.ok) {
        D(viewSetIn(['tokens'], res.body.tokens))
      }
    })

export const tokensIndex = () => D =>
  request.get('developers/access_tokens').then(res => {
    if (res.body.ok) {
      D(viewSetIn(['tokens'], res.body.tokens))
    }
  })

export const deleteToken = accessToken => D =>
  request
    .post('developers/remove_access_token')
    .send({ access_token: accessToken })
    .then(res => {
      if (res.body.ok) {
        D(viewSetIn(['tokens'], res.body.tokens))
      }
    })

export const withdraw = (alipayAccount, alipayName) => () =>
  request
    .post('users/withdraw')
    .send({ alipayAccount, alipayName })
    .then()

export const isUserExist = (value, callback) => () =>
  request
    .post('users/exists_by_any', {
      value
    })
    .then(res => {
      return res.json()
    })
    .then(r => {
      const { exists, message } = r
      if (exists) {
        callback(message)
      }
    })

export const getProfessions = () => D => {
  return request
    .get('professions')
    .then(res => res.json())
    .then(body => {
      const { data, ok } = body
      D(viewSetIn(['professionsSelection', 'options'], data || []))
      return ok
    })
}
