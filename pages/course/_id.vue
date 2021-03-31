<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <!-- 课程所属分类 开始 -->
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelOne }}</span>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
      </section>
      <!-- /课程所属分类 结束 -->
      <!-- 课程基本信息 开始 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section id="videoPlay" class="p-h-video-box">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic" width="100%" height="100%"/>
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size: 24px"
                >￥{{ course.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of" v-if="!iscollect" @click="handleCollect(true)">
              <span class="ml10 vam">
                <em class="icon18 scIcon" />
                <a class="c-fff vam" title="收藏" style="text-decoration: none;cursor: pointer;">收藏</a>
              </span>
            </section>
            <section class="c-attr-mt of" v-if="iscollect" @click="handleCollect(false)">
              <span class="ml10 vam sc-end">
                <em class="icon18 scIcon" />
                <a class="c-fff vam" title="已收藏" style="text-decoration: none;cursor: pointer;">已收藏</a>
              </span>
            </section>
            <section v-if="Number(course.price) == 0 || isbuyCourse" class="c-attr-mt">
              <a
                href="#"
                title="立即观看"
                class="comm-btn c-btn-3"
                >立即观看</a
              >
            </section>
            <section v-else class="c-attr-mt">
              <a
                href="#"
                title="立即购买"
                class="comm-btn c-btn-3"
                >立即购买</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.buy_count }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.lesson_num }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.view_count }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear" />
      </div>
      <!-- /课程基本信息 结束 -->
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <!-- 课程详情介绍 开始 -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- 将内容中的html翻译过来 -->
                      <p v-html="course.description">
                        {{ course.description }}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- /课程详情介绍 结束 -->
                <!-- 课程大纲 开始-->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li
                            v-for="(chapter, index) in chapterList"
                            :key="index"
                            class="lh-menu-stair"
                          >
                            <a
                              :title="chapter.title"
                              href="javascript: void(0)"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10" />{{
                                chapter.title
                              }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                v-for="(video, index) in chapter.child"
                                :key="index"
                                class="lh-menu-second ml30"
                              >
                                <a
                                  @click="showSlide='slideDown'"
                                  :title="video.title"
                                  target="_blank"
                                >
                                  <span v-if="video.free === true" class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ video.title }}
                                </a>
                                <div class="video-box" v-show="showSlide">
                                  <div class="overlay"></div>
                                  <div class="video" :class="showSlide">
                                    <span class="icon-close" @click="closeVideo"></span>
                                    <video :src="video.video_src" muted autoplay controls="controls"></video>
                                  </div>
                                </div>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 结束 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!-- 主讲讲师 开始-->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a>
                        <img :src="course.avatar" width="50" height="50" alt />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a
                        :href="'/teacher/' + course.teacher_id"
                        class="c-333 fsize16 fl"
                        target="_blank"
                        >{{ course.teacherName }}</a
                      >
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!-- /主讲讲师 结束 -->
          </div>
        </aside>
        <div class="clear"></div>

        <!-- 课程评论分页开始 -->
        <div class="mt50 commentHtml">
          <div>
            <h6 class="c-c-content c-infor-title" id="i-art-comment">
              <span class="commentTitle">课程评论</span>
            </h6>
            <section class="lh-bj-list pr mt20 replyhtml">
              <ul>
                <li class="unBr">
                  <aside class="noter-pic">
                    <img
                      width="50"
                      height="50"
                      class="picImg"
                      src="~/assets/img/avatar-boy.gif"
                    />
                  </aside>
                  <div class="of">
                    <section class="n-reply-wrap">
                      <fieldset>
                        <textarea
                          v-model="comment.content"
                          placeholder="输入您要评论的文字"
                          id="commentContent"
                        ></textarea>
                      </fieldset>
                      <p class="of mt5 tar pl10 pr10">
                        <input
                          type="button"
                          @click="addComment()"
                          value="回复"
                          class="lh-reply-btn"
                        />
                      </p>
                    </section>
                  </div>
                </li>
              </ul>
            </section>
            <section class="">
              <section class="question-list lh-bj-list pr">
                <ul class="pr10">
                  <li v-for="(comment, index) in data.items" :key="index">
                    <aside class="noter-pic">
                      <img
                        width="50"
                        height="50"
                        class="picImg"
                        :src="comment.avatar"
                      />
                    </aside>
                    <div class="of">
                      <span class="fl">
                        <font class="fsize12 c-blue">
                          {{ comment.nickname }}</font
                        >
                        <font class="fsize12 c-999 ml5">评论：</font></span
                      >
                    </div>
                    <div class="noter-txt mt5">
                      <p>{{ comment.content }}</p>
                    </div>
                    <div class="of mt5">
                      <span class="fr">
                        <font class="fsize12 c-999 ml5">
                          {{comment.gmt_create}}
                        </font>
                      </span>
                    </div>
                  </li>
                </ul>
              </section>
            </section>

            <!-- 公共分页 开始 -->
            <div class="paging">
              <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
              <a
                :class="{ undisable: !data.hasPrevious }"
                title="首页"
                @click.prevent="initComment(1)"
                >首</a
              >
              <a
                :class="{ undisable: !data.hasPrevious }"
                title="前一页"
                @click.prevent="initComment(data.current - 1)"
                >&lt;</a
              >

              <!-- 循环遍历中间页数 -->
              <a
                v-for="page in data.pages"
                :key="page"
                :class="{
                  current: data.current == page,
                  undisable: data.current == page,
                }"
                :title="'第' + page + '页'"
                @click.prevent="initComment(page)"
                >{{ page }}</a
              >

              <a
                :class="{ undisable: !data.hasNext }"
                href="#"
                title="后一页"
                @click.prevent="initComment(data.current + 1)"
                >&gt;</a
              >
              <a
                :class="{ undisable: !data.hasNext }"
                href="#"
                title="末页"
                @click.prevent="initComment(data.pages)"
                >末</a
              >

              <div class="clear" />
            </div>
            <!-- 公共分页 结束 -->
          </div>
        </div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import course, {STATIC_URL} from "@/api/course";
import teacher from "@/api/teacher";
import comment from "@/api/comment";
import member from "@/api/member";
import collection from "@/api/collection";
import cookie from 'js-cookie'
export default {
  // 异步调用 初始化页面(改为得到路由中课程id值)
  asyncData({ params, error }) {
    return {
      courseId: params.id
    };
  },
  data() {
    return {
      data: {
        pages: 1,
        hasPrevious: false,    //能否往前翻页
        hasNext: true,      //能否往后翻页
        current: 1,   //当前页
        items: []      //  评论
      },
      page: 1,
      comment: {
        content: "",
        courseId: "",
      },
      course: {
        chapter: []
      },       // 中和了课程和讲师的所有信息
      chapterList: [],    //  课程章节目录      
      isbuyCourse: false,
      iscollect: false,
      showSlide: ''  //控制视频动画效果
    };
  },
  created() {
    this.initCourseInfo()
    this.initComment();
  },
  methods: {
    // 获取课程详情
    initCourseInfo() {
      let memberToken = cookie.get('token')
      course.getCourse(this.courseId).then(response => {
        let courseList = response.data.data.course
        courseList.cover = STATIC_URL + "/" + courseList.cover
        let chapter = courseList.chapter
        this.chapterList = chapter
        teacher.getTeacher(courseList.teacher_id).then(response => {
          let teacherList = response.data.data.teacher
          this.course = {...this.course,...courseList,...teacherList}
          let lesson_num = this.course.chapter.length
          this.course = {...this.course,lesson_num}
        })
      })

      collection.getCollect({courseId: this.courseId, memberToken}).then(response=> {
        response.data.data?this.iscollect=true:this.iscollect=false;
      })
    },
    // 关闭视频
    closeVideo(){
      this.showSlide='slideUp';
      setTimeout(()=>{
        this.showSlide='';
      },600)
    },
    // 获取评论信息
    initComment(pageNo) {
      this.data.items = []
      
      comment.getComment({
        id: this.courseId,
        pageNo
      }).then(response => {
        let data = response.data.data.comment
        let commentList = data.list
        this.data.pages = Math.ceil(data.count/10)
        this.data.current = data.pageNo
        commentList.forEach(e=>{
          member.getMember({id: e.memberID}).then(response=>{
            this.data.items.push({...response.data.data, ...e})
          })
        })
      })
      if(pageNo == undefined){
        this.data.hasPrevious = false
      }else if(pageNo==1){
        this.data.hasPrevious = false
      }else{
        this.data.hasPrevious = true
      }

      if(this.data.pages == 1){
        this.data.hasNext = false
      }else  if(pageNo == this.data.pages){
        this.data.hasNext = false
      }else{
        this.data.hasNext = true
      }
    },
    addComment() {
      let memberToken = cookie.get('token')
      comment.addCourseAnswer({token: memberToken, content: this.comment.content, course_id: this.courseId}).then(response=>{
        if(response.data.code){
          this.$message.error(response.data.message);
        }else{
          this.$message.success(response.data.message);
          this.comment.content = ""
          this.initComment()
        }
      })
    },
    handleCollect(collect){
      let memberToken = cookie.get('token')
      collection.editCollection({iscollect: collect, courseID: this.courseId, memberToken }).then(response=>{
        if(response.data.code){
          this.$message.error(response.data.message);
        }else{
          this.$message.success(response.data.message);
          this.iscollect=collect
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';
.video-box{
  .overlay{
    @include position(fixed);
    background-color:#333333;
    opacity:.4;
    z-index:10;
  }
  @keyframes slideDown{
    from{
      top:-50%;
      opacity:0;
    }
    to{
      top:50%;
      opacity:1;
    }
  }
  @keyframes slideUp{
    from{
      top:50%;
      opacity:1;
    }
    to{
      top:-50%;
      opacity:0;
    }
  }
  .video{
    position:fixed;
    top:-50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:10;
    width:1000px;
    height:536px;
    opacity:1;
    &.slideDown{
      animation:slideDown .6s linear;
      top:50%;
    }
    &.slideUp{
      animation:slideUp .6s linear;
    }
    .icon-close{
      position:absolute;
      top:20px;
      right:20px;
      @include bgImg(20px,20px,'../../assets/img/icon-close.png');
      cursor:pointer;
      z-index:11;
    }
    video{
      width:100%;
      height:100%;
      object-fit:cover;
      outline:none;
    }
  }
}
</style>