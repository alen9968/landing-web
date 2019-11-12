import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
//import { deleteArticle } from '../../http/article'

export default () => {
  const index = useRouter().query.id -1
  const article = useSelector(state => state.articles.toJS())
  console.info(article)
  //const router = useRouter()
  // const destroy = (index) =>{
  //   deleteArticle(index)
  //   alert('Article delete success!')
  //   router.push('/index')
  // }

  console.info(article,index)
  return (
    <div className="manContent">
      <h2>{ Object.values(article)[index].title }</h2>
      <br />
      <p fontSize='22'>{ Object.values(article)[index].content }</p>
      <style jsx>{`
      .manContent {
        border: 3px solid #ccc;
        border-radius: 16px;
        margin: 0 30%;
        padding: 20px 20px;
      }
      h2 {
        margin-top: 0;
      }
      `}
    </style>
  </div>
  )
}
