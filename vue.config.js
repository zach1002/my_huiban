const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    https: false,
    // hotOnly: false,
    proxy: {
      '/api': {
        //修改为后端提供的api的地址
        //target: 'https://lianghj.top:8888/api/private/v1/',
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        // 8版本用prependData:
        additionalData: `
          @import "@/styles/variables.scss";  // scss文件地址
          @import "@/styles/mixin.scss";     // scss文件地址
        `
      }
    }
  }
})
