import request from '../utils/request'

export default {
    //创建课程
    createCourse(req) {
        return request({
            url: `/video/create`,
            method: 'post',
            data: req
        })
    },

    //删除课程
    deleteCourse(id) {
        return request({
            url: `/video/delete/${id}`,
            method: 'put',
        })
    },

    // 通过课程id 获取课程信息
    getCourseById(id) {
        return request({
            url: `/video/id/${id}`,
            method: 'get'
        })
    },
    //通过类型获取课程
    getCourseByType(req, type) {
        return request({
            url: `/video/type/${type}`,
            method: 'get',
            params: req
        })
    },

    getCourseAll(req) {
        return request({
            url: `/video/all`,
            method: 'get',
            params: req
        })
    },
}

export const STATIC_URL = "http://127.0.0.1:18080/images/"