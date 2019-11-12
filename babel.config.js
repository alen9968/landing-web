module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: '.',
            rootPathPrefix: '~'
          },
          {
            rootPathSuffix: './redux/modules/',
            rootPathPrefix: '%'
          }
        ]
      }
    ]
  ]
}
