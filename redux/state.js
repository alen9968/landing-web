import { combineReducers } from 'redux'
import accounts from './modules/accounts'
import view from './modules/view'
import reduceReducers from './reduceReducers'
import articles from './modules/articles'

const STATE_SET = 'STATE_SET'
const STATE_SET_IN = 'STATE_SET_IN'

export const stateSet = (key, value) => ({ type: STATE_SET, key, value })

export const stateSetIn = (key, path, value) => ({
  type: STATE_SET_IN,
  key,
  path,
  value
})

export default asyncReducers =>
  reduceReducers(
    combineReducers({
      articles,
      accounts,
      view,
      ...asyncReducers
    }),
    (state, action) => {
      const { type, key, value } = action
      switch (type) {
        case STATE_SET:
          return {
            ...state,
            [key]: value
          }
        case STATE_SET_IN:
          return {
            ...state,
            [key]: state[key].setIn(action.path, action.value)
          }
        default:
          return state
      }
    }
  )
