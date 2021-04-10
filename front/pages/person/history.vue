<template>
  <div class="history">
    <div class="course_item" v-for="(item, index) in history" :key="index">
      <div class="course_cover"><img :src="item.video_img" :alt="item.name"></div>
      <div class="course_explan">
        <div class="course_title">
          <span class="course_name">{{ item.name }}</span>
        </div>
        <div class="course_detail">
          <div class="course_view_num">点击数 {{ item.click }}</div>
        </div>
      </div>
      <a class="course_btn" @click="handleClickCourse(item.id)">继续学习</a>
    </div>
  </div>
</template>

<script>
import history from "@/api/history"
import course, {STATIC_URL} from "@/api/course";
import cookie from 'js-cookie'

export default {
  data() {
    return {
      history: []
    }
  },
  //加载完渲染时
  created() {
    //获取收藏课程列表
    this.getData()
  },
  methods: {
    //查询历史课程列表
    async getData() {
      let token = cookie.get("token")
      await history.getHistoryList(token).then(response => {
        console.log(response)
        console.log(response.data.data)
        let data = response.data.data.videos
        this.history = data
        if (data) {
          data.forEach(e => {
            e.video_img = STATIC_URL + "/" + e.video_img
          })
        }
      })
    },

    async handleClickCourse(courseId) {
      let token = cookie.get('token')
      console.log("token", token)
      console.log(courseId)
      await history.addHistory(courseId, token).then(response => {
        window.open("http://baidu.com", "_blank");
        // this.$router.push('/course/' + courseId)
      })
    },
  }
}
</script>

<style>
.history {
  margin-left: 50px;
  width: 100%;
}

.course_item {
  position: relative;
  border-bottom: 0.5px solid #eee;
  padding: 10px 0 26px 5px;
  display: flex;
  flex-direction: row;
}

.history .course_item .course_cover img {
  display: block;
  height: 160px;
  width: 250px;
}

.history .course_item .course_explan {
  margin-left: 20px;
}

.history .course_item .course_explan .course_title .course_name {
  font-size: 40px;
  font-weight: bolder;
  margin-left: 20px;
}

.history .course_item .course_explan .course_detail {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}

.history .course_item .course_explan .course_teacher {
  font-size: 20px;
  color: #666;
}

.history .course_item .course_explan .course_detail .course_num {
  color: #aaa;
  margin-right: 20px;
}

.history .course_item .course_explan .course_detail .course_buy_num {
  color: #aaa;
  margin-right: 20px;
}

.history .course_item .course_explan .course_detail .course_view_num {
  color: #aaa;
  margin-right: 20px;
}

.history .course_item .course_btn {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 30px;
  font-size: 18px;
  color: #fff;
  width: 114px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background: rgba(240, 20, 20, .6);
  border-radius: 20px;
}
</style>
