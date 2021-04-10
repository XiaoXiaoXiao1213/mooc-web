(async function (model) {

    // const BaseUrl = "https://wx.couplefish.com/bswapi/";
    const BaseUrl = "http://localhost:18080/api/1.0/";

    const Utils = {
        set Token(token) {
            localStorage.setItem("TOKEN_KEY", token)
        },
        get Token() {
            return localStorage.getItem("TOKEN_KEY");
        },
        /**
         * 发送HTTPS 安全连接的 POST 请求
         * @param {*} url 
         * @param {*} da 
         * @param {*} headers 
         */
        POST(url, da = {}, headers = {}) {
            // if (!url.includes("http")) {
            //     url = BaseUrl  + url
            // }
            return new Promise((resolve, reject) => {
                axios.post(url, da, { headers: Object.assign({ token: Utils.Token }, headers) }).then(({ data }) => {
                    if (data.code == 0) {
                        return resolve(data.data)
                    }
                    alert(data.message)
                    reject()
                })
                    .catch(e => {
                        reject(e)
                    })
            })
        },
        /**
         * 发送HTTPS 安全连接的 GET请求
         * @param {*} url 
         * @param {*} headers 
         */
        GET(url, headers = {}) {
            // if (!url.includes("http")) {
            //     url = BaseUrl+ url
            // }
            return new Promise((resolve, reject) => {
                axios.get(url, { headers: Object.assign({ token: Utils.Token }, headers) }).then(({ data }) => {
                    if (data.code == 0) {
                        return resolve(data.data)
                    }
                    alert(data.message)
                    reject()
                })
                    .catch(e => {
                        console.log(e)
                        reject(e)
                    })
            })
        },

    }


    model.Utils = Utils
})(window)