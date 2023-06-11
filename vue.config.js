const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/dealershipVue/',
  transpileDependencies: true,
  devServer: {
    proxy: 'http://localhost:8000'
  }
})
