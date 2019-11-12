import { Col, Row, Card } from 'antd'
import Abc from '../components/Abc'
import Layout from '../components/Layout'

const Bcd = (props) => {
  return (
    <div>
      <p> 自定义组件</p>
    </div>

  )
}

const Test2 = () => {

  return (
    <div className="main">
      <Layout>
        <p>This is man content!</p>
        <Abc />
        <Bcd />
      </Layout>


    </div>
  )
}

export default Test2


