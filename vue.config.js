const path = require('path')

// eslint-disable-next-line no-unused-vars
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: (config) => {
  },
  devServer: {
    host: process.env.VUE_APP_DEV_SERVER_HOST,
    port: process.env.VUE_APP_DEV_SERVER_PORT,
    proxy: {
      '/': {
        target: process.env.VUE_APP_API_SERVER_URL
      }
    },
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            '@notify-line-height': '20%',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            '@card-font-size': '16px',
            '@card-title-line-height': '19px'
          }
        }
      }
    }
  }
}
