import React from 'react'
import Link from 'next/link'
import { Input} from 'antd'
import localforage from 'localforage'
import { Menu, Icon, Button, Dropdown } from 'antd'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { accountSetIn } from '../redux/modules/accounts'

const { SubMenu  } = Menu
const { Search } = Input
const layoutStyle = {
  margin:20,
  padding: 20,
  border: '1px solid #DDD'
}
const linkStyle = {
  marginRight: 15
}

export default (props) => {
    return (
    <div className="content-wrapper">
      <Head>
        <title>{props.title ? `${props.title} | Hello` : 'Hello'}</title>
      </Head>
      <div style={layoutStyle}>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Search
          placeholder="search articles"
          onSearch={value => console.info(value)}
          enterButton >
        </Search>
      </div>
      <div className="main-content">{props.children}</div>
    <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          height: 100%;
        }

        body {
          margin: 0;
          font-size: 20px;
          line-height: 1.7;
          font-weight: 400;
          background: #fff;
          background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
          color: #353535;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue',
            'Lucida Grande', sans-serif;
          text-rendering: optimizeLegibility;
          height: 100%;
        }

        a {
          color: #353535;
          text-decoration: none;
        }

        a:hover {
          color: #151515;
        }

        h1,
        h2,
        h3 {
          margin: 40px 0 30px;
        }

        h1 {
          font-size: 42px;
        }

        h2 {
          font-size: 36px;
        }

        p {
          margin: 0 0 10px;
        }

        .btn {
          background: #111;
          padding: 12px 24px;
          color: #fff;
          font-size: 18px;
          border: 0;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Layout */

        .content-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 30px;
        }
      `}</style>
      </div>
  )
}

