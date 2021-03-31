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
            <img width="100%" :src="banner.imageUrl" :alt="banner.subTitle" />
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
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="(course, index) in courseList" :key="index">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      />
                      <div class="cc-mask">
                        <a
                          :href="'/course/' + course.id"
                          title="开始学习"
                          class="comm-btn c-btn-1"
                          >开始学习</a
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        title="听力口语"
                        class="course-title fsize18 c-333"
                        >{{ course.title }}</a
                      >
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span
                        class="fr jgTag bg-green"
                        v-if="Number(course.price) === 0"
                      >
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fr jgTag bg-green" v-else>
                        <i class="c-fff fsize12 f-fA">￥{{ course.price }}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.buy_count }}人学习</i>
                        |
                        <i class="c-999 f-fA">{{ course.view_count }}评论</i>
                      </span>
                    </section>
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
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="(teacher, index) in teacherList" :key="index">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/' + teacher.id" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar" height="110px" width="110px"/>
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a
                        :href="'/teacher/' + teacher.id"
                        :title="teacher.name"
                        class="fsize18 c-666"
                        >{{ teacher.name }}</a
                      >
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.intro }}</span>
                    </div>
                    <br>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{ teacher.career }}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import index from "@/api/index";
import course, {STATIC_URL} from "@/api/course";
import cookie from 'js-cookie'
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
      teacherList: [
        {
          id: "1", // 讲师ID
          name: "张三", // 讲师姓名
          intro:
            "近年主持国家自然科学基金（6项）、江苏省重大科技成果转化项目（5项）、江苏省产学研前瞻性联合研究项目（3项）、省工业科技支撑、省高技术、省自然科学基金等省部级及其企业的主要科研项目40多个，多个项目在企业成功转化，产生了较好的经济、社会和环境效益。积极开展产学研科技合作，并与省内16家企业建立了江苏省研究生工作站，其中6家为江苏省优秀研究生工作站", // 讲师简介
          career: "高级", // 讲师资历
          level: 1, // 头衔 1高级讲师 2首席讲师
          avatar:
            "https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg", // 讲师头像
          sort: 0, // 显示排序(默认是0，降序)
          is_deleted: 0, // 逻辑删除 1（true）已删除， 0（false）未删除
          gmt_create: "2019-10-30 14:18:46", // 创建时间
          gmt_modified: "2019-10-30 11:53:03", // 更新时间
        },
        {
          id: "1189389726308478977", // 讲师ID
          name: "晴天", // 讲师姓名
          intro: "高级讲师简介", // 讲师简介
          career: "高级讲师资历", // 讲师资历
          level: 2, // 头衔 1高级讲师 2首席讲师
          avatar:
            "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/de47ee9b-7fec-43c5-8173-13c5f7f689b2.png", // 讲师头像
          sort: 1, // 显示排序(默认是0，降序)
          is_deleted: 0, // 逻辑删除 1（true）已删除， 0（false）未删除
          gmt_create: "2019-10-30 11:53:03", // 创建时间
          gmt_modified: "2019-10-30 11:53:03", // 更新时间
        },
        {
          id: "1189390295668469762", // 讲师ID
          name: "李刚", // 讲师姓名
          intro: "高级讲师简介", // 讲师简介
          career: "高级讲师", // 讲师资历
          level: 2, // 头衔 1高级讲师 2首席讲师
          avatar:
            "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/b8aa36a2-db50-4eca-a6e3-cc6e608355e0.png", // 讲师头像
          sort: 2, // 排序(默认是0)
          is_deleted: 0, // 逻辑删除 1（true）已删除， 0（false）未删除
          gmt_create: "2019-10-30 11:55:19", // 创建时间
          gmt_modified: "2019-10-30 11:55:19", // 更新时间
        },
        {
          id: "1189426437876985857", // 讲师ID
          name: "王二", // 讲师姓名
          intro: "高级讲师简介", // 讲师简介
          career: "高级讲师", // 讲师资历
          level: 1, // 头衔 1高级讲师 2首席讲师
          avatar:
            "https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/11/08/e44a2e92-2421-4ea3-bb49-46f2ec96ef88.png", // 讲师头像
          sort: 3, // 排序(默认是0)
          is_deleted: 0, // 逻辑删除 1（true）已删除， 0（false）未删除
          gmt_create: "2019-10-30 14:18:56", // 创建时间
          gmt_modified: "2019-10-30 14:18:56", // 更新时间
        },
      ], // 4位名师
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
      index.getSuggest({token}).then( response => {
        console.log(response);
      });
      course.getCourseList({pageSize: 8}).then(response => {
        let data = response.data.data
        for(let e of data.list) e.cover = STATIC_URL + "/" + e.cover
        this.courseList = data.list
      })
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
</style>