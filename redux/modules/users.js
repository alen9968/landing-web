import { Map } from 'immutable'
import request from '../../utils/request'
import { viewSetIn } from './view'
import immutableHandler from '../immutableHandler'

export const USERS_SET = 'USERS_SET'
export const USERS_SET_IN = 'USERS_SET_IN'
export const USER_SET = 'USER_SET'
export const USER_MERGE = 'USER_MERGE'
export const USERS_MERGE = 'USERS_MERGE'
export const LIKES_USERS_SET = 'LIKES_USERS_SET'

export default immutableHandler((users = Map(), action) => {
  const { path, value } = action
  switch (action.type) {
    case USERS_SET:
      return value
    case USER_MERGE:
      return users.mergeDeepIn([value.get('id')], value)
    case USERS_MERGE:
      return users.mergeDeep(value)
    case USER_SET:
      return users.set(value.get('id'), value)
    case USERS_SET_IN:
      return users.setIn(path, value)
    default:
      return users
  }
})

export const likesUsers = (state = {}, action) => {
  const { value } = action
  switch (action.type) {
    case LIKES_USERS_SET:
      return value
    default:
      return state
  }
}
export const usersSet = value => ({ type: USERS_SET, value })
export const usersMerge = value => ({ type: USERS_MERGE, value })
export const usersSetIn = (path, value) => ({
  type: USERS_SET_IN,
  path,
  value
})
export const likesUsersSet = value => ({ type: LIKES_USERS_SET, value })

export const userSet = value => ({ type: USER_SET, value })
export const userMerge = value => ({ type: USER_MERGE, value })

export const userUpdate = id => (D, S) => {
  const { users } = S()
  return request
    .put(`superadmins/users/${id}`)
    .send({ data: users.get(id) })
    .then(res => {
      const { user } = res.body
      D(userSet(user))
    })
}

export const userUpdateIn = (id, path, value) => D =>
  request
    .post(`superadmins/users/${id}/update_in`)
    .send({ path, value })
    .then(res => {
      const { user } = res.body
      D(userSet(user))
    })

export const reward = userId => (D, S) => {
  const { view } = S()
  return request
    .post(`superadmins/users/${userId}/reward`)
    .send({ data: view.get('award') })
    .then(res => {
      const { ok, user } = res.body
      if (ok) {
        D(userSet(user))
        D(viewSetIn(['award'], {}))
      }
    })
}

export const redeem = userId => (D, S) => {
  const { view } = S()
  return request
    .post('superadmins/redeem_traffic')
    .send({ data: view.get('redeem').set('userId', userId) })
    .then(res => {
      const { ok, user } = res.body
      if (ok) {
        D(userSet(user))
      }
    })
}

export const emailMutipleRecipients = (subject, body) => (D, S) =>
  request
    .post('users/email_multiple_recipients')
    .send({
      user_ids: S().view.getIn(['tables', 'users', 'checked']),
      subject,
      body
    })
    .end()

export const smsMutipleRecipients = (D, S) => {
  const { view } = S()
  return request
    .post('users/sms_multiple_recipients')
    .send({
      user_ids: view.getIn(['tables', 'users', 'checked']),
      code: view.getIn(['sms', 'code'])
    })
    .end()
}
