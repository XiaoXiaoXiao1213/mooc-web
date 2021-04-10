import request from '../utils/request'
export const STATIC_URL = "http://121.4.123.223:18080/api/1.0"
export default {
    //创建课程
    createCourse(req) {
        return request({
            url: STATIC_URL + `/video/create`,
            method: 'post',
            data: req
        })
    },

    //删除课程
    deleteCourse(id) {
        return request({
            url: STATIC_URL + `/video/delete/${id}`,
            method: 'put',
        })
    },

    // 通过课程id 获取课程信息
    getCourseById(id) {
        return request({
            url: STATIC_URL + `/video/id/${id}`,
            method: 'get'
        })
    },
    //通过类型获取课程
    getCourseByType(req, type) {
        return request({
            url: STATIC_URL + `/video/type/${type}`,
            method: 'get',
            params: req
        })
    },

    getCourseAll(req) {
        return request({
            url: STATIC_URL + `/video/all`,
            method: 'get',
            params: req
        })
    },
}

