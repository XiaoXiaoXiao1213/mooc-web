<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="banner in bannerList"
          :key="banner.id"
          class="swiper-slide banner"
          style="background: #040b1b"
        >
          <a target="_blank" :href="banner.linkUrl">
            <img width="100%" :src="banner.imageUrl" :alt="banner.subTitle"/>
            <div class="banner_title">{{ banner.title }}</div>
            <div class="banner_subTitle">{{ banner.subTitle }}</div>
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <a class="c-333 hotCourse" @click="change">热门课程</a>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(course, index) in courseList" :key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.video_img"
                        class="img-responsive"
                        :alt="course.name"
                      />
                      <div class="cc-mask" @click="handleClickCourse(course.id,course.video_url)">
                        <a
                          title="开始学习"
                          class="comm-btn c-btn-1"
                        >开始学习</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        title=""
                        class="course-title fsize18 c-333"
                      >{{ course.name }}</a
                      >
                    </h3>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course/" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
          <div class="clear"></div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
    </div>
  </div>
</template>

<script>
import index from "@/api/index";
import courseApi, {STATIC_URL} from "@/api/course";
import cookie from 'js-cookie'
import history from "@/api/history"

export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      bannerList: [
        {
          id: "1",
          linkUrl: "",
          imageUrl:
            "https://storyblok-image.ef.com.cn/unsafe/1920x960/filters:focal(2128x1416:2129x1417):quality(90)/f/10/4256x2832/f1eb1531ff/shutterstock_685773664.jpg",
          subTitle: "口袋时尚|全世界最受欢迎的8杯饮料",
          title: "旅游英语",
        },
        {
          id: "3",
          linkUrl: "",
          imageUrl:
            "https://storyblok-image.ef.com.cn/unsafe/1920x960/filters:focal(2512x3229:2513x3230):quality(90)/f/10/7360x4912/01c385441d/shutterstock_444495202.jpg",
          subTitle: "不会Relaxing的人，放假会比上班还累？",
          title: "旅游英语",
        },
        {
          id: "4",
          linkUrl: "",
          imageUrl:
            "https://storyblok-image.ef.com.cn/unsafe/1920x960/filters:focal(4259x2450:4260x2451):quality(90)/f/10/8517x5678/7a7116b1b7/shutterstock_381091648.jpg",
          subTitle: "《中餐厅》里让小凯和小紫为难的service charge到底是啥？",
          title: "旅游英语",
        },
      ], // 轮播图
      courseList: [], // 8个热门课程
    };
  },
  created() {
    this.intiDtaObj();
  },
  methods: {
    // 初始化推荐课程
    intiDtaObj() {
      let token = cookie.get('token')
      console.log("token")
      if (token) {
        index.getSuggest(token).then(response => {
          let data = response.data.data
          for (let e of data.videos) e.video_img = STATIC_URL + "/" + e.video_img
          this.courseList = data.videos
        });
      }
      if (this.courseList.length === 0 || !token) {
        index.getSuggestNotLogin().then(response => {
          let data = response.data.data
          for (let e of data.videos) e.video_img = STATIC_URL + "/" + e.video_img
          this.courseList = data.videos

        })
      }
    },
    async handleClickCourse(courseId,url) {
      let token = cookie.get('token')
      console.log("token", token)
      console.log(courseId)
      await history.addHistory(courseId, token).then(response => {
          window.open(url, "_blank");
        })
    },
    change(){
      let token = cookie.get('token')
      console.log("token")
      if (token) {
        index.getSuggest(token).then(response => {
          let data = response.data.data
          for (let e of data.videos) e.video_img = STATIC_URL + "/" + e.video_img
          this.courseList = data.videos
        });
      }
      if (this.courseList.length === 0 || !token) {
        index.getSuggestNotLogin().then(response => {
          let data = response.data.data
          for (let e of data.videos) e.video_img = STATIC_URL + "/" + e.video_img
          this.courseList = data.videos

        })
      }
    }
  }
};
</script>
<style>
.banner {
  position: relative;
}

.banner .banner_title {
  position: absolute;
  bottom: 30%;
  left: 100px;
  font-size: 30px;
  color: white;
  font-weight: bolder;
}

.banner .banner_subTitle {
  position: absolute;
  bottom: 20%;
  left: 100px;
  font-size: 24px;
  color: white;
}
.hotCourse {
  text-decoration: none;
  font-size: 29px;
}
</style>
