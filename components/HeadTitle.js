import React from 'react'
import _ from 'lodash'

export default ({ pathname, systemSettings, notification, showOpenBrowserMask }) => {
  function matchPath(path, map, deflt) {
    const matched = _.find(map, ([matcher]) => path.match(matcher))
    if (matched) return matched[1]
    return deflt
  }

  const HeaderTitle = pathname => {
    return matchPath(
      pathname,
      [
        ['^/?index', ['首页']],
        ['^/?login', ['登录']],
        ['^/?logout', ['退出']],
        ['^/?publish', ['发布文章']]
      ],
      null
    )
  }

  const title = HeaderTitle(pathname, systemSettings, notification, showOpenBrowserMask)
  return (
    <div>
      {title ? (
        <div>
          <div className="hero" />
          <div className="text-hero">
            <div className="title-wrapper">
              <h1 className="navbar-header-title">{title[0]}</h1>
              <div className="navbar-header-subtitle">{title[1]}</div>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
      <style jsx>
        {`
          .hero {
            position: relative;
            height: 70px;
            color: #eee;
            background: #eee;
          }
          .text-hero {
            position: relative;
            height: 190px;
            color: #eee;
            background: #eee;
          }
          }
          .text-hero > .title-wrapper {
            position: absolute;
            top: 40%;
            transform: translateY(-50%);
            width: 100%;
            text-align: center;
          }
          .navbar-header-title {
            margin: 0 auto;
            color: black;
            font-size: 20px;
            font-family: PingFangSC-Bold, sans-serif;
            text-align: center;
          }
          .navbar-header-subtitle {
            color: black;
            font-size: 16px;
            text-align: center;
            margin-top: 10px;
          }
`}
      </style>
    </div>
  )
}
