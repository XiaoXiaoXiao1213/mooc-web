module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  modules: [
    '@nuxtjs/axios','@nuxtjs/proxy'
  ],
  // axios config
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api/1.0', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  // proxy config
  proxy: {
    '/api/1.0': {
      target: 'http://121.4.123.223:18080', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^': '',
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios']
  },
  plugins: [
    {src: '~/plugins/nuxt-swiper-plugin.js', ssr: false}
  ],
  css: [
    'swiper/dist/css/swiper.css'
  ]

}

