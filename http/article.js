import request from '../utils/request'
import _ from 'lodash'
import I from 'immutable'
import { articlesSet ,articlesSetIn } from '../redux/modules/articles'


export const getArticles = () => D =>
  request
    .get('articles')
    .then(res => res.json())
    .then(body => {
      const { data, ok } = body
      console.info(body)
      if (ok) {
        D(articlesSet(I.fromJS(_.keyBy(data || [], 'id'))))
      }
      return ok
    })
    .catch(e => console.info(e))

export const createArticle = (title, content) => D =>
  request
    .post('articles', { title, content })
    .then(res => res.json())
    .then(body => {
      const { ok } = body
      if(ok) {
        return ok
      }
    })

// export const deleteArticle = (id) => D =>
//   request
//     .delete(`articles/${id}`)
//     .then(res => res.json())
//     .then(body => {
//       const { ok } = body
//       console.info(body)
//       if (ok) {
//         return ok
//       }
//     })
//     .catch(e => console.info(e,'Delete faild'))
