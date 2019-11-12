import request from '../utils/request'
import _ from 'lodash'
import I from 'immutable'

export const findByUsername = (username, password)  =>
  request
    .get('accounts/index_by_username', { username, password })
    .then(res => res.json())
    .then(body=> {
      const { ok, data } =body
      if(data['password'] === password){
        return true
      } else
        return false
    })
    .catch(e => console.info(e, 'aaa'))

export const createAccount = (username, password)  =>
  request
    .post('accounts', { username, password })
    .then(res => res.json())
    .then(body => {
      const { ok } = body
      if(ok) {
        return ok
      }
    })
    .catch(e => console.info(e,'bbb'))



// import { useRouter } from 'next/router'
// import { useDispatch, useSelector } from 'react-redux'
//
// export default () => {
//   const router = useRouter()
//   const article = useSelector(state => state.articles.toJS())
//   console.info(article)
//   console.info(
//     router.query.id,
//   Object.values(article)[0].title
// )
//   const getArticle = () => {
//   }
//   
//   return (
//     <div>
//       <h2>{ Object.values(article)[0].title }</h2>
//       <br />
//       <p fontSize='22'>{ Object.values(article)[0].content }</p>
//     </div>
//   )
// }
