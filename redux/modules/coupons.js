import I, { Map } from 'immutable'
import request from '../../utils/request'
import immutableHandler from '../immutableHandler'

export const COUPONS_SET = 'COUPONS_SET'
export const COUPONS_SET_IN = 'COUPONS_SET_IN'

export default immutableHandler((coupons = Map({}), action) => {
  const { path, value } = action
  switch (action.type) {
    case COUPONS_SET:
      return value
    case COUPONS_SET_IN:
      return coupons.setIn(path, value)
    default:
      return coupons
  }
})

export const couponsSet = value => ({ type: COUPONS_SET, value })

export const createCoupons = () => (D, S) =>
  request.post('coupons').then(res => {
    const { ok, coupon } = res.body
    if (ok) {
      D(couponsSet(S().coupons.set(coupon.id, I.fromJS(coupon))))
    }
  })

export const couponsSetIn = (path, value) => ({
  type: COUPONS_SET_IN,
  path,
  value
})
