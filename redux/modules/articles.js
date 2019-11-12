import { Map } from 'immutable'
import immutableHandler from '../immutableHandler'

export const ARTICLES_SET = 'ARTICLES_SET'
export const ARTICLES_SET_IN = 'ARTICLES_SET_IN'
export const ARTICLE_SET = 'ARTICLE_SET'
export const ARTICLES_MERGE = 'ARTICLES_MERGE'

export default immutableHandler((articles = Map({}), action) => {
  const { id, value, path } = action
  switch (action.type) {
    case ARTICLES_SET:
      return value
    case ARTICLE_SET:
      return articles.set(id, value)
    case ARTICLES_MERGE:
      return articles.mergeDeep(value)
    case ARTICLES_SET_IN:
      return articles.setIn(path, value)
    default:
      return articles
  }
})

export const articlesSet = value => ({ type: ARTICLES_SET, value })
export const articleSet = (id, value) => ({ type: ARTICLE_SET, id, value })
export const articlesSetIn = (path, value) => ({
  type: ARTICLES_SET_IN,
  path,
  value
})
export const articlesMerge = value => ({ type: ARTICLES_MERGE, value })
