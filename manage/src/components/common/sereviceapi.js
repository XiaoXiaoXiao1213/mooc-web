

/**常量 */
import { HTTP_REQUEST_METHOD, LOGIN_URL, TOKEN_KEY } from "./constants";
import APIS from "./serviceurls";
import axios from "axios";
import { ResponseBody, RequestParams, User, SystemParameter } from "./entity";
import { MessageBox, Loading, Message } from 'element-ui';
import { alertMessage, isBlank, reLoadingIco } from "./utils"
import Vue from 'vue'
import $ from 'jquery'

const axios_instance = axios.create();
const axios_instance_method = {
  [HTTP_REQUEST_METHOD.GET]: axios_instance.get,
  [HTTP_REQUEST_METHOD.GETURL]: axios_instance.get,
  [HTTP_REQUEST_METHOD.POST]: axios_instance.post,
  [HTTP_REQUEST_METHOD.POSTURL]: axios_instance.post,
  [HTTP_REQUEST_METHOD.PUT]: axios_instance.put,
  [HTTP_REQUEST_METHOD.PUTURL]: axios_instance.put,
  [HTTP_REQUEST_METHOD.DELETE]: axios_instance.delete,
  [HTTP_REQUEST_METHOD.DELETEURL]: axios_instance.delete,
};


/**后端接口 */
export default (function createApis(apis) {
  var api = apis;
  if (typeof (apis.url) != "string") {
    for (var k in apis) {
      apis[k] = createApis(apis[k]);
    }
  }
  /**
   * 接口调用
   * @param 接口入参
   */
  else {
    apis = function (params = new RequestParams(), loading = true, loadingText = "加载中...", loadingUrl) {
      return new Promise(async function (resolve, reject) {

        let { url, method, param = {}, config = {} } = $.extend(true, {}, api);

        if (api.confirm) {
          await MessageBox.confirm(api.confirm.message, api.confirm.title)
        }

        config = $.extend(true, config, {
          baseURL: SystemParameter.SERVICE_HOST_ADDR,
          headers: {
            [TOKEN_KEY]: User.token
          }
        })

        url = url.replace(/\$\w+/ig, function (key) {
          let __key = key.substr(1), value = null;
          if (params instanceof FormData) {
            value = params.get(__key)
            params.delete(__key)
          }
          else {
            value = params[__key];
            delete params[__key];
          }
          return value;
        });

        const axios_method = axios_instance_method[method]
        if (axios_method) {
          let loadingInstance = loading && Loading.service({
            fullscreen: true,
            lock: true,
            text: loadingText,
            background: 'rgba(0, 0, 0, 0.2)'
          });
          (requestBody => {
            switch (method) {
              case HTTP_REQUEST_METHOD.GET:
              case HTTP_REQUEST_METHOD.GETURL: {
                config.params = requestBody
                return axios_method(url, config)
              }
              case HTTP_REQUEST_METHOD.DELETEURL:
              case HTTP_REQUEST_METHOD.DELETE: {
                config.data = requestBody;
                return axios_method(url, config)
              }
              default: return axios_method(url, requestBody, config);
            }
          })(params instanceof RequestParams ? $.extend(true, param, params) : params).then(response => {
            loadingInstance && loadingInstance.close()
            ///因为到达这里的状态都是 ok ，再加上后端业务 Code 不做 ok 返回
            ///所以这里决定不做 code 的处理
            resolve(response.data);
          })
            .catch(error => {
              loadingInstance && loadingInstance.close()
              if (error.response) {
                if (error.response.status == 401) {
                  MessageBox.alert("登录过期").then(() => {
                    Vue.$Router && Vue.$Router.push(LOGIN_URL)
                  })
                }
                alertMessage(error.response.data.message || "服务器还没准备好")
              }
              else {
                alertMessage("服务器还没准备好")
              }
              //目前所有的code 自动弹出提示
              reject(error && error.response && error.response.data || "服务器还没准备好")
            })
        }
        else {
          reject(new ResponseBody(`无效请求方法-method[${method}]!`))
        };
      });
    };

  }

  return apis;
})(APIS);


