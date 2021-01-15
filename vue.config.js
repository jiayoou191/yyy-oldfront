module.exports = {
  pages: {
    index: {
      entry: 'src/entry/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '简宜运',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    welcome: {
      entry: 'src/entry/welcome/main.js',
      template: 'public/welcome.html',
      filename: 'welcome.html',
      title: 'Eztrans',
      chunks: ['chunk-vendors', 'chunk-common', 'welcome']
    }
  },
  productionSourceMap: false,
  devServer: {
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://test.jianyiyun.com',
      },
    }
  }
}