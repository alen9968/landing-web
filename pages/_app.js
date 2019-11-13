import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import createStore from '../redux/createStore'
import withRedux from 'next-redux-wrapper'
import UserContext from '../components/UserContext'
import localStorage from 'localStorage'
import HeadMeta from '../components/HeadMeta'
import '../styles/main.scss'
import 'antd/dist/antd.css'

import { enquireScreen } from 'enquire-js';
import Nav0 from '../components/Home/Nav0';
import Footer0 from '../components/Home/Footer0';
import {
  Nav00DataSource,
  Footer00DataSource,
} from '../components/Home/data.source.js';


class MyApp extends App {
  state = {
    user: 'hello',
    loginState: false
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <UserContext.Provider  value={{ user: this.state.user, loginState: this.state.loginState }} >
        <Provider store={store}>
          <HeadMeta />
          <Nav0
            id="Nav0_0"
            key="Nav0_0"
            dataSource={Nav00DataSource}
          />
          <Component {...pageProps} />
          <Footer0
            id="Footer0_0"
            key="Footer0_0"
            dataSource={Footer00DataSource}
          />
        </Provider>
      </UserContext.Provider>
    )
  }
}

export default withRedux(createStore)(MyApp)
