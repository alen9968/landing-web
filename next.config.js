const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')

const reScript = /\.(js|jsx|mjs)$/

const nextConfig = {
  // webpack: config => {
  //   // Fixes npm packages that depend on `fs` module
  //   config.node = {
  //     fs: 'empty'
  //   }
  //
  //   config.module.rules.push(
  //     // {
  //     //   test: reScript,
  //     //   loader: 'eslint-loader',
  //     //   exclude: ['/node_modules/', '/.next/', '/out/'],
  //     //   enforce: 'pre',
  //     //   options: {
  //     //     emitWarning: true
  //     //   }
  //     // }
  //   )
  //
  //   return config
  // },
  lessLoaderOptions: {
    javascriptEnabled: true
  }
}

module.exports = withSass(withCSS(withLess(nextConfig)))
