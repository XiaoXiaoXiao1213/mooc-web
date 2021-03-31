<template>
  <div class="collection">
    <div class="course_item" v-for="(item, index) in collection" :key="index">
      <div class="course_cover"><img :src="item.cover" :alt="item.title"></div>
      <div class="course_explan">
        <div class="course_title">
          <span v-if="Number(item.price) === 0" class="jgTag bg-green">
              <i class="c-fff fsize12 f-fA">免费</i>
          </span>
          <span class="course_name">{{item.title}}</span>
        </div>
        <div class="course_teacher">讲师 {{item.teacherName}}</div>
        <div class="course_detail">
          <div class="course_num">总章节 {{item.lesson_num}}</div>
          <div class="course_buy_num">购买数 {{item.buy_count}}</div>
          <div class="course_view_num">浏览数 {{item.view_count}}</div>
        </div>
      </div>
      <a class="course_btn" :href="'/course/'+item._id">继续学习</a>
    </div>
  </div>
</template>

<script>
import collection from "@/api/collection"
import course, {STATIC_URL} from "@/api/course";
import teacher from "@/api/teacher";
import cookie from 'js-cookie'
export default {
  data() {
    return {
      collection: []
    }
  },
  //加载完渲染时
  created () {
    //获取收藏课程列表
    this.getData()
  },
  methods: {
    //查询收藏课程列表
    async getData() {
      this.collection = []
      let memberToken = cookie.get("token")
      await collection.getCollectionList(memberToken).then(response => {
        let data = response.data.data.list
        if(data){
          data.forEach(e=>{
            course.getCourse(e.courseID).then(response => {
              let courseList = response.data.data.course
              courseList.cover = STATIC_URL + "/" + courseList.cover
              teacher.getTeacher(courseList.teacher_id).then(response => {
                let teacherList = response.data.data.teacher
                this.collection.push({...teacherList,...courseList})
              })
            })
          })
        }
      })
    }
  }
}
</script>

<style>
.collection{margin-left: 50px;width: 100%;}
.course_item{position: relative;border-bottom: 0.5px solid #eee;padding: 10px 0 26px 5px;display: flex;flex-direction: row;}
.collection .course_item .course_cover img{display: block;height: 160px;width: 250px;}
.collection .course_item .course_explan{margin-left: 20px;}
.collection .course_item .course_explan .course_title .course_name{font-size: 40px;font-weight: bolder;margin-left: 20px;}
.collection .course_item .course_explan .course_detail{display: flex;flex-direction: row;margin-top: 30px;}
.collection .course_item .course_explan .course_teacher{font-size: 20px;color: #666;}
.collection .course_item .course_explan .course_detail .course_num{color: #aaa;margin-right: 20px;}
.collection .course_item .course_explan .course_detail .course_buy_num{color: #aaa;margin-right: 20px;}
.collection .course_item .course_explan .course_detail .course_view_num{color: #aaa;margin-right: 20px;}
.collection .course_item .course_btn{cursor: pointer;position: absolute;right: 0;bottom: 30px;font-size: 18px;color: #fff;width: 114px;height: 42px;line-height: 42px;text-align: center;background: rgba(240,20,20,.6);border-radius: 20px;}
</style>