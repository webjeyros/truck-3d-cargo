const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  
  devServer: {
    port: 8080,
    open: true
  },
  
  chainWebpack: config => {
    config.resolve.alias
      .set('@', require('path').resolve(__dirname, 'src'))
      .set('three', require('path').resolve(__dirname, 'node_modules/three'))
    
    // Оптимизация для Three.js
    config.module
      .rule('three')
      .test(/\.js$/)
      .include
      .add(require('path').resolve(__dirname, 'node_modules/three'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env']
      })
  },
  
  configureWebpack: {
    resolve: {
      fallback: {
        "fs": false,
        "path": false
      }
    }
  }
})