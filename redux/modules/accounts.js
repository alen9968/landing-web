import I from 'immutable'
import { Map } from 'immutable'
import immutableHandler from '../immutableHandler'

export const ACCOUNT_SET_IN = 'ACCOUNT_SET_IN'
export const ACCOUNT_SET = 'ACCOUNT_SET'
export const ACCOUNT_MERGE = 'ACCOUNT_MERGE'

const initialState = I.fromJS({
  loginState: false,
  self:{
    username: ''
  }
})

export default immutableHandler((accounts = initialState, action) => {
  const { path, value } = action
  switch (action.type) {
    case ACCOUNT_SET:
      return value
    case ACCOUNT_MERGE:
      return accounts.merge(value)
    case ACCOUNT_SET_IN:
      return accounts.setIn(path, value)
        default:
      return accounts
  }
})

export const accountMerge = value => ({ type: ACCOUNT_MERGE, value })

export const accountSet = value => {
console.info('fju')
return {
  type: ACCOUNT_SET, value }
}

export const accountSetIn = (path, value) => ({ type: ACCOUNT_SET_IN, path, value })


