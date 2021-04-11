module.exports = {
    publicPath: './',
    assetsDir: "./static",
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api/1.0': {
                target: 'http://localhost:18080', // 目标接口域名
                changeOrigin: true, // 表示是否跨域
                pathRewrite: {
                    '^': '',
                }
            },
        }
    },
}