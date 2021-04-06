import { HTTP_REQUEST_METHOD } from "./constants";

export default {
  // operator: {
  //   getlist: {
  //     /**接口地址 */
  //     url: '/operator/getlist',
  //     /**接口方法 */
  //     method: HTTP_REQUEST_METHOD.POST,
  //     /**请求参数 */
  //     param: { b: 234 },
  //   },
  // },
  login: {
    /**接口地址 */
    url: '/login',
    /**接口方法 */
    method: HTTP_REQUEST_METHOD.POST,
    param: { username: "", password: "" }
  },
  modifyAdministratorPassword: {
    /**接口地址 */
    url: '/modifyAdministratorPassword',
    /**接口方法 */
    method: HTTP_REQUEST_METHOD.POST,
    param: { username: "", password: "", newPassword: "" }
  },


  /**获取所有页面列表数据 */
  getCourseList: {
    url: '/getCourseList',
    method: HTTP_REQUEST_METHOD.POST,
    param: { keyword: "", pageNo: 1, pageSize: 10 }
  },
  getTeacherList: {
    url: '/getTeacherList',
    method: HTTP_REQUEST_METHOD.POST,
    param: { keyword: "", pageNo: 1, pageSize: 10 }
  },
  getMemberList: {
    url: '/getMemberList',
    method: HTTP_REQUEST_METHOD.POST,
    param: { keyword: "", pageNo: 1, pageSize: 10 }
  },

  /**添加、更新所有页面列表数据 */
  editCourse: {
    url: '/editCourse',
    method: HTTP_REQUEST_METHOD.POST,
    param: { keyword: "", pageNo: 1, pageSize: 10 }
  },
  editCourseStatus: {
    url: '/editCourseStatus',
    method: HTTP_REQUEST_METHOD.POST,
    confirm:{
      message:"发布/下架课程",
      title:"确定要发布/下架课程吗？"
    }
  },

  /**删除所有页面列表数据 */
  delCourse: {
    url: '/delCourse',
    method: HTTP_REQUEST_METHOD.GET,
    confirm:{
      message:"删除记录",
      title:"确定要删除此记录吗？"
    }
  },
  delMember: {
    url: '/delMember',
    method: HTTP_REQUEST_METHOD.GET,
    confirm:{
      message:"删除记录",
      title:"确定要删除此记录吗？"
    }
  },
  logoutMember: {
    url: '/delMember',
    method: HTTP_REQUEST_METHOD.GET,
    confirm:{
      message:"注销记录",
      title:"确定要注销此记录吗？"
    }
  },

  /**获取页面单个数据 */
  getCourse: {
    url: '/getCourse',
    method: HTTP_REQUEST_METHOD.GET,
    param: { keyword: "", pageNo: 1, pageSize: 10 }
  },
  getMember: {
    url: '/getMember',
    method: HTTP_REQUEST_METHOD.GET,
    param: { keyword: "", pageNo: 1, pageSize: 10 }
  },
}
