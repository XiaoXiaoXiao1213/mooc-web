

import CryptoJS from "crypto-js"
import $ from 'jquery'
import { MessageBox, Loading, Message } from 'element-ui';
/**
 * 数组转对象
 * @param {*} arr
 * @param {*} key
 */
export const array2Object = function (arr = [], key = "id", type = 1) {
  let result = {}, results = [];
  for (let o of arr) {
    if (o[key]) result[o[key]] = o;
  }
  return result;
}

/**
 * 讲一个列表数据根据某个Key[pid]作为列表的子孙关系，重新生成一个带子孙关系对象
 * @param {*} arr
 * @param {*} idKey 自己的Key
 * @param {*} pidKey 父级ID的Key
 * @param {*} type 返回类型 1 数组 0 以ID为Key的对象
 */
export const array2Descendants = function (arr = [], idKey = "id", pidKey = "pid", type = 1) {
  if (!arr) return type ? [] : {}
  let objs = {}, objarr = [];
  for (let item of arr) {
    let id = item[idKey], pid = item[pidKey];

    /**初始化所有人 */
    if (!(id in objs)) {
      objs[id] = item;
      if (type) {
        objs[id]["children"] = [];
        objarr.push(item);
      }
      else {
        objs[id]["children"] = {};
      }
    }

    for (let itemId in objs) {
      /**找到孩子 */
      if (pid == itemId) {
        type ?
          objs[itemId]["children"].push(objs[id]) :
          objs[itemId]["children"][id] = objs[id];
      }
      /**找到父亲 */
      else if (id == objs[itemId][pidKey]) {
        type ?
          objs[id]["children"].push(objs[itemId]) :
          objs[id]["children"][itemId] = objs[itemId];
      }
    }
  }

  /**找出所有的终极父亲 */
  let results = {}, resultArr = [];
  for (let itemId in objs) {
    if (!(objs[itemId][pidKey] in objs)) {
      type ?
        resultArr.push(objs[itemId]) :
        results[itemId] = objs[itemId];
    }
  }

  return JSON.parse(JSON.stringify(type ? resultArr : results, (a,b)=>{
    if(typeof(b) == 'object' && isBlank(b.children)){
       delete b.children
    }
    return b
  }));
}


export const findParents = function (arr = [], pid, obj) {
  let parents = [], objs = arr.map(o => o)
  if (obj) parents.push(obj)
  function _findParents(objs, pid) {
    for (let i = 0; i < objs.length; i++) {
      let item = objs[i]
      if (item.id == pid) {
        objs.splice(i, 1);
        parents.push(item)
        _findParents(objs, item.pid)
      }
    }
    return parents;
  }
  return _findParents(objs, pid);
}

export const findChildrens = function (arr = [], id, obj) {
  let parents = [], objs = arr.map(o => o)
  if (obj) parents.push(obj)
  function _findChildrens(objs, id) {
    for (let i = 0; i < objs.length; i++) {
      let item = objs[i]
      if (item.pid == id) {
        objs.splice(i, 1);
        parents.push(item)
        _findChildrens(objs, item.id)
      }
    }
    return parents;
  }
  return _findChildrens(objs, id);
}

/**
 * 是否为空
 * @param {*} any
 */
export function isBlank(any) {
  switch (typeof (any)) {
    case "string": {
      return /^\s*$/.test(any) || "null" == any || "undefined" == any || "NaN" == any;
    }
    case "object": {
      if (Array.isArray(any)) {
        return any.length == 0;
      }
    }
  }
  return JSON.stringify(any) == "{}" || any == null || any == undefined || any == NaN;
}


export function LocalhostIP() {
  return new Promise(r => {
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var mediaConstraints = {
      optional: [{ RtpDataChannels: true }]
    };
    var servers = undefined;
    if (window.webkitRTCPeerConnection) servers = { iceServers: [{ urls: "stun:stun.services.mozilla.com" }] };
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    pc.onicecandidate = (ice) => {
      if (ice.candidate) {
        var ip_addr = (/([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate) || [])[1];
        if (ip_addr) {
          r(ip_addr);
        }
      }
    };
    pc.createDataChannel("");
    pc.createOffer(e => { pc.setLocalDescription(e, e => { }) }, e => { });
  })
}

/**
 * 加密加密综合对象
 */
export const Crypto = new class Crypto {
  constructor() {
    this.__AES = new class AES {
      constructor() {
        // 由于对称解密使用的算法是 AES-128-CBC算法，数据采用 PKCS#7 填充 ， 因此这里的 key 需要为16位！
        this.__key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
        this.__iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

      }
      /**解密 */
      decrypt(word) {
        try {
          let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
          let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
          let decrypt = CryptoJS.AES.decrypt(srcs, this.__key, { iv: this.__iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
          let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
          return decryptedStr.toString();
        } catch (error) {
          console.log(error)
          return word
        }
      }
      /**加密 */
      encrypt(word) {
        try {
          let srcs = CryptoJS.enc.Utf8.parse(word);
          let encrypted = CryptoJS.AES.encrypt(srcs, this.__key, { iv: this.__iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
          return encrypted.ciphertext.toString().toUpperCase();
        } catch (error) {
          console.log(error)
          return word
        }
      }
    }


  }

  get AES() {
    return this.__AES;
  }


}
/**
 * 生成指定范围的随机数
 * @param {*} min
 * @param {*} max
 */
export function Random(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**平铺数组 */
export const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

/** equal：判断两个对象是否键值对应相等*/
export function equal(a, b) {
  //如果a和b本来就全等
  if (a === b) {
    //判断是否为0和-0
    return a !== 0 || 1 / a === 1 / b;
  }
  //判断是否为null和undefined
  if (a == null || b == null) {
    return a === b;
  }
  //接下来判断a和b的数据类型
  var classNameA = toString.call(a), classNameB = toString.call(b);
  //如果数据类型不相等，则返回false
  if (classNameA !== classNameB) {
    return false;
  }
  //如果数据类型相等，再根据不同数据类型分别判断
  switch (classNameA) {
    case '[object RegExp]':
    case '[object String]':
      //进行字符串转换比较
      return '' + a === '' + b;
    case '[object Number]':
      //进行数字转换比较,判断是否为NaN
      if (+a !== +a) {
        return +b !== +b;
      }
      //判断是否为0或-0
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
    case '[object Object]':
      //获取a和b的属性长度
      var propsA = Object.getOwnPropertyNames(a), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i];
        //如果对应属性对应值不相等，则返回false
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    case '[object Array]':
      if (a.toString() == b.toString()) {
        return true;
      }
      return false;
  }
}

/**
 * 保存数据到文件并下载到本地
 * @param {*} any 数据
 * @param {String} filename 文件名
 * @param {String} type MIME类型;charset=utf-8
 */
export function SaveData2File(any = {}, filename, type = "text/plain;charset=utf-8"){
  if(!isBlank(any)){
    let downloader = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    downloader.download = filename
    downloader.href = URL.createObjectURL(new File([JSON.stringify(any)], filename, {type}));
    downloader.dispatchEvent(new MouseEvent("click"));
    window.URL.revokeObjectURL(downloader.href)
  }
}

export function alertMessage (message, fun = "error") {
  Message[fun] && Message[fun]({
    message: message,
    center: true,
    duration: 3000
  })
}
/**
 * 展开二维数组
 * @param {*} arr
 */
export function open2DimensionArray(arr = []){
  arr = arr.filter(o=>o)
  return eval(`var [${arr.map((e,i)=>"c"+i).join(",")}] = arr; [${arr.map((e,i)=>"...c"+i).join(",")}]`)
}
/**
 * 对象拷贝
 * @param {*} obj
 */
export function copy(obj){
  return $.extend(true, Array.isArray(obj)?[]:{}, obj);
}
