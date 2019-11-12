import request from '../utils/request'
import { viewSetIn } from '../redux/modules/view'
import { HttpState } from '../consts'

const loginState = () => D => {
  const statePath = ['state']
  // if (view.getIn(statePath) !== HttpState.REQUESTING) {
  viewSetIn(statePath, HttpState.REQUESTING)
  return request
    .get('sessions/login_state')
    .then(r => r.json())
    .then(body => {
      D(viewSetIn(['loginState', 'result'], body))
      return body
    })
    .finally(() => {
      D(viewSetIn(statePath, HttpState.REQUESTED))
    })
  // }
  // return false
}

export default loginState
