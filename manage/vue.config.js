module.exports = {
    publicPath: './',
    assetsDir: "./static",
    productionSourceMap: false,
    // axios config
    // axios: {
    //     proxy: true, // 表示开启代理
    //     prefix: '/api/1.0', // 表示给请求url加个前缀 /api
    //     credentials: true // 表示跨域请求时是否需要使用凭证
    // },
    // modules: [
    //     '@nuxtjs/axios', '@nuxtjs/proxy'
    // ],

    devServer: {
        proxy: {
            '/api/1.0': {
                target: 'http://localhost:18080', // 目标接口域名
                changeOrigin: true, // 表示是否跨域
                pathRewrite: {
                    '^': '',
                }
            },
            // '/api': {
            //     target: 'http://jsonplaceholder.typicode.com',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '/api': ''
            //     }
            // },
            // '/ms': {
            //     target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
            //     changeOrigin: true
            // },
        }
    },
    //vendor: ['axios']

}