import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import createStore from '../redux/createStore'
import withRedux from 'next-redux-wrapper'
import Head2 from '../components/Layout'
import UserContext from '../components/UserContext'
import localStorage from 'localStorage'
import HeadMeta from '../components/HeadMeta'
import HeadTitle from '../components/HeadTitle'
import '../styles/main.scss'
import 'antd/dist/antd.css'

class MyApp extends App {
  state = {
    user: 'hello',
    loginState: false
  }

  static async getInitialProps({ Component, ctx }) {
    // if(typeof 'windows' === 'undefine' ){
    //   global.navigator = {}
    //   global.navigator.languages = {}
    //   global.location = {}
    // }
    // // ctx 报错
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  LoginState = (username) => {
    this.setState({
      loginState: true,
      user: username
    })
  }

  LogoutState = () => {
    this.setState({
      loginState: false
    })
  }


  render() {
    const { Component, pageProps, store } = this.props

    return (
      <UserContext.Provider  value={{ user: this.state.user, loginState: this.state.loginState, LoginState: this.LoginState, LogoutState: this.LogoutState }} >
        <Provider store={store}>
          <HeadMeta />
          {/* <Nav /> */}
          {/* <HeadTitle /> */}
          {/* <Head2 title="Alen's Blog" /> */}
          <Component {...pageProps} />
        </Provider>
      </UserContext.Provider>
    )
  }
}

export default withRedux(createStore)(MyApp)
