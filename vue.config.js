'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL, // 放在子目录时使用./或者加你的域名
  outputDir: process.env.VUE_APP_BUILD_NAME,
  assetsDir: 'static',
  lintOnSave: false,
  // lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: false, // 启动服务后是否打开浏览器
    // host: '127.0.0.1',
    port: 8090, // 服务端口
    https: false,
    hotOnly: false, // 热更新
    proxy: 'http://192.168.10.200:9956', // 测试
  },
  configureWebpack: {
    name: '',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  transpileDependencies: ['element-ui', 'vuex'], //这里写你在main.js引入的包
  chainWebpack(config) {
    config.entry('polyfill').add('@babel/polyfill') // 增加这一句,如果报错,把这一句删掉
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
}
