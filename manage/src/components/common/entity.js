import XLSX from 'xlsx';
import moment from "moment";
import Vue from "vue";
import $ from 'jquery'
import {
  LOCATION_USER_KEY,
  LOCATION_TOKEN_KEY,
} from "./constants"


export const CentralInterface = new Vue();

export const RequestParams = class RequestParams {

  constructor(obj = {}) {

    obj && $.extend(this, obj);
  }

  getJsonParams() {
    return this;
  }

  addAttributes(objs) {
    for (let key in objs) {
      this.addAttribute(key, objs[key]);
    }
    return this;
  }

  addAttribute(name, value) {
    if (value || typeof value == "number") {
      this[String(name).trim()] = value;
    } else delete this[String(name).trim()];
    return this;
  }

  addDateAttribute(name, value, format = "YYYY-MM-DD HH:mm:ss") {
    if (value || typeof value == "number") {
      return this.addAttribute(name, moment(value).format(format))
    }
    return this
  }

  addAttributeQuery(value, appendValue) {
    let query = value ? $.extend(true, {}, value) : null;
    if (appendValue) {
      if (!query) query = { $and: [] }
      if (!query.$and) query.$and = [];
      query.$and.push(appendValue)
    }
    this.addAttribute("query", query);

    return this;
  }

}

export const ResponseBody = class ResponseBody {

  constructor(obj = {}, code = 1) {
    if (typeof(obj) == 'string') {
      this.message = obj;
      this.code = code;
    } else $.extend(this, obj);
  }
}

/**用户数据管理 */
export const User = new class User {

  constructor() {
    this.__info = $.extend(true, {}, JSON.parse(localStorage.getItem(LOCATION_USER_KEY)));
    this.__token = localStorage.getItem(LOCATION_TOKEN_KEY);
  }

  set info(v) {
    if (v) {
      localStorage.setItem(LOCATION_USER_KEY, JSON.stringify(this.__info = v))
    } else {
      this.__info = {}
      localStorage.removeItem(LOCATION_USER_KEY)
    }
  }

  set token(v) {
    if (v) {
      /**防止用户身份被盗取, 在此做了加密存储 */
      localStorage.setItem(LOCATION_TOKEN_KEY, this.__token = v)
    } else {
      this.__token = ''
      localStorage.removeItem(LOCATION_TOKEN_KEY)
    }
  }

  get token() {
    return this.__token;
  }

  /**Token 是否有效[0有效,1过期,2失效] */
  get IS_TOKEN_EFFECTIVE() {
    if (this.__token.access_token) {
      if (this.__token.expires_in) {
        if (moment(this.__token.expires_in).isAfter()) {
          return 0;
        } else {
          return 1;
        }
      }
    }
    return 2;
  }

  get info() {
    return this.__info;
  }

  clear() {
    this.info = null;
    this.password = null;
    this.token = null
  }
};

/**系统参数 */
export const SystemParameter = new class SystemParameter {

  constructor() {}

  /**生成一个30位的随机数字字符串, 经测试在[9138.4541015625ms]内生成[1000000]个字符串没有一个重复 */
  get RANDOMSTR30() {
    return "R" + "".concat(Math.random()).substr(-13).concat("000").concat(new Date().getTime()).split("").sort(e => .5 - Math.random()).join("") //经测试去掉这部分生成[1000000]个随机字符串仅需要[1196.651123046875ms]同样没有重复,但是有明显规则
  }

  /**当前时间的字符串 */
  get CURRENTTIME() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }

  get SERVICE_HOST_ADDR() {
    return `http://localhost:18080/api/1.0`
  }

}

/**
 * 导出 Excel 表格数据到文件
 */
export const ExcelSheets = class ExcelSheets {

  static get SPLICE_CHAR() {
    return "|$|"
  }

  static get dictionary() {
    return {

    };
  }

  constructor() {
      this.sheets = {};
    }
    /**
     * 添加工作蒲
     * @param {*} name 工作铺名称
     */
  addSheet(name) {
    if (!this.sheets[name]) {
      this.sheets[name] = {
        rows: [],
        headers: []
      };
    }
    return this;
  }

  setSheetHeader(name, headers) {
    this.addSheet(name);
    this.sheets[name].headers = headers;
    return this;
  }

  /**
   * 添加表格一行数据
   * @param {*} sheetName 添加到哪个工作簿下
   * @param {*} row 数据对象，以[KEY]作为标题
   */
  addRow(sheetName, row) {
      this.sheets[sheetName].rows.push(row);
      return this;
    }
    /**
     * 批量添加数据行
     * @param {*} sheetName 工作部名称
     * @param {*} rows 数据列表
     */
  addRows(sheetName, rows) {
    if (!Array.isArray(rows)) return new Error("addRows(sheetName, rows[必须是数组])");
    for (let row of rows) {
      this.addRow(sheetName, row);
    }
    return this;
  }

  /**
   * 导出数据到文件
   * 导出数据会自动以对象的[Key]为标题
   * 导出直接下载
   * @param {*} filename 文件名称不带后缀
   */
  exportExcel(filename) {
    const wb = XLSX.utils.book_new();
    for (let sheetName in this.sheets) {
      let header = null;
      if (this.sheets[sheetName].headers.length) {
        header = this.sheets[sheetName].headers
      }
      const ws = XLSX.utils.json_to_sheet(this.sheets[sheetName].rows.map(o => {
        if (header) {
          let data = {};
          for (let k of header) {
            data[k] = o[k]
          }
          return data;
        }
        return o
      }), { header: header });
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }
    XLSX.writeFile(wb, filename + ".xlsx");
  }

  /**
   * 解析 Excel 表格文件
   * @param {*} file 文件
   */
  importExcel(file) {
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = (e => {
        let binary = "";
        let bytes = new Uint8Array(e.target.result);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        /* read workbook */
        var wb = XLSX.read(binary, { type: 'binary', cellStyles: true });
        let data = {};
        let header = 2;
        if (Object.values(this.sheets).length) {
          for (let name in this.sheets) {
            if (this.sheets[name].headers.length) {
              header = this.sheets[name].headers
            }
            data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: header }).slice(1);
          }
        } else {
          for (let name of wb.SheetNames) {
            data[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: header }).slice(1);
          }
        }
        resolve(data);
      }).bind(this);
      reader.readAsArrayBuffer(file);
    });
  }


  empty() {
    this.sheets = {};
    return this;
  }

}

window.User = User
window.SystemParameter = SystemParameter
window.ExcelSheets = ExcelSheets
