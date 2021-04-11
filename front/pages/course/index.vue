<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <!-- 课程类别显示 -->
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="javascript:void(0);" @click="getData(1,'','',1)">全部</a>
                </li>
                <li v-for="(value,index) in subjectNestedList" :key="value" :class="{active:oneIndex==index}">
                  <a :title="value" href="javascript:void(0);" @click="getData(1,value)">{{ value }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"/>
        </section>
        <!-- 课程排序选项 开始 -->
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-666 f-fM">总数：</i>
              <i class="c-master f-fM">{{ data.total }}</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="默认" href="javascript:void(0);" @click="searchAll()">默认
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchHot()">最热
                  <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <!-- 课程排序选项结束 -->
        <!-- 课程数据显示 开始 -->
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="Number(data.total) === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表 开始-->
          <article v-if="data.total>0" class="comm-course-list">
            <ul id="bna" class="of">
              <li v-for="item in data.items" :key="item.id" @click="handleClickCourse(item.id,item.video_url)">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.video_img" class="img-responsive" :alt="item.name">
                    <div class="cc-mask">
                      <a title="开始学习" class="comm-btn c-btn-1" style="cursor: pointer;">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :title="item.name" class="course-title fsize18 c-333"
                       style="cursor: pointer;text-decoration: none">{{ item.name }}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fl jgAttr c-ccc f-fA">
                                  <i class="c-999 f-fA">{{ item.click }}点击量</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"/>
          </article>
          <!-- /数据列表 结束-->
        </div>
        <!-- 课程数据显示 结束 -->
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="getData(1,'','',0)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="getData(data.current-1,'','',0)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="getData(page,'','',0)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="getData(data.current+1,'','',0)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="getData(data.pages,'','',0)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi, {STATIC_URL} from "@/api/course"
import history from "@/api/history"
import cookie from 'js-cookie'
import Bus from '@/utils/bus.js';

export default {
  data() {
    return {
      page: 1,
      data: {
        pages: 1,      //总页数
        total: 1,     //课程数量
        hasPrevious: true,    //能否往前翻页
        hasNext: true,      //能否往后翻页
        current: 1,   //当前页
        items: []   //当前可的所有课程
      },//返回分页结果
      subjectNestedList: ["计算机", "外语", "理学", "工学", "21/22考研", "期末不挂科", "应试英语", "实用英语", "经济管理", "心理学",
        "文史哲", "艺术设计", "医药卫生", "教育教学", "法学", "农林园艺", "音乐与舞蹈"],  //课程标签
      searchObj: {}, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      gmtCreateSort: "",
      priceSort: "",
      key: "",
      type: ""
    }
  },
  //加载完渲染时
  created() {
    Bus.$on('searchCourse', key => {
      this.getData(1, "", key)
    });
    //获取课程列表
    this.getData()
  },
  mounted() {
  },
  methods: {
    //查询课程列表
    getData(page = 1, type = "", key = "", all = 0) {
      if (this.gmtCreateSort!==""){
        this.searchHot(page)
        return
      }

      if (key === "") {
        key = this.key
      } else {
        this.key = key
      }
      if (type === "") {
        type = this.type
      } else {
        this.type = type
      }
      if (all === 1) {
        this.type = ""
        this.key = ""
        type = ""
        key = ""
      }

      let res
      if (type === "") {
        res = courseApi.getCourseAll({
          "content": key,
          "page": page,
          "page_size": 10,
        })
      } else {
        res = courseApi.getCourseByType({
          "content": key,
          "page": page,
          "page_size": 10,
        }, type)
      }
      res.then(response => {
        let data = response.data.data
        if (data.total !== 0) {
          for (let e of data.videos) e.video_img = STATIC_URL + "/" + e.video_img
          this.data.items = data.videos
          this.data.pages = Math.ceil(data.total / 10)
        } else {
          this.data.items = []
        }
        this.data.total = data.total
        this.data.current = page
        this.data.hasPrevious = false
      })
      if (page === 1) {
        this.data.hasPrevious = false
      } else {
        this.data.hasPrevious = true
      }
      if (page === this.data.pages) {
        this.data.hasNext = false
      } else {
        this.data.hasNext = true
      }
    },

    //点击一级分类，显示对应的二级分类，查询数据
    searchOne(val, index) {
      //debugger
      this.oneIndex = index
      this.twoIndex = -1
      this.searchObj.subject_child = val
      this.gotoPage(this.page)
    },


    //点击课程，进入详情页，并添加历史记录
    async handleClickCourse(courseId, url) {
      let token = cookie.get('token')
      console.log("token", token)
      console.log(courseId)
      await history.addHistory(courseId, token).then(response => {
        window.open(url, "_blank");
      })
    },


    //热度查询
    searchHot(page = 1) {
      // debugger
      this.gmtCreateSort = "1";
      this.priceSort = "";
      courseApi.getHotCourseByType({
        "content": this.key,
        "type": this.type,
        "page": page,
        "page_size": 10,
      }).then(response => {
        let data = response.data.data
        if (data.total !== 0) {
          for (let e of data.videos) e.video_img = STATIC_URL + "/" + e.video_img
          this.data.items = data.videos
          this.data.pages = Math.ceil(data.total / 10)
        } else {
          this.data.items = []
        }
        this.data.total = data.total
        this.data.current = page
        this.data.hasPrevious = false
      })
      if (page === 1) {
        this.data.hasPrevious = false
      } else {
        this.data.hasPrevious = true
      }
      if (page === this.data.pages) {
        this.data.hasNext = false
      } else {
        this.data.hasNext = true
      }
    },

    //价格查询
    searchAll() {
      this.gmtCreateSort = "";
      this.priceSort = "1";
      this.getData()
    },
    //排序方法
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    }
  }
}
</script>
<style scoped>
.active {
  background: #bbb;
}

.hide {
  display: none;
}

.show {
  display: block;
}
</style>
