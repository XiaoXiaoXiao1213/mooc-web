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
                  <a title="全部" href="javascript:void(0);" @click="searchOne('')">全部</a>
                </li>
                <li v-for="(value,key,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="key" href="javascript:void(0);" @click="searchOne(key, index)">{{key}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <!-- 二级标题 -->
          <dl>
            <dt>
              <span class="c-999 fsize14"/>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="item" href="javascript:void(0);" @click="searchTwo(item, index)">{{item}}</a>
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
              <i class="c-master f-fM">{{data.total}}</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchHot()">最热
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
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
                  <li v-for="item in data.items" :key="item._id" @click="handleClickCourse(item._id)">
                      <div class="cc-l-wrap">
                          <section class="course-img">
                              <img :src="item.cover" class="img-responsive" alt="听力口语">
                              <div class="cc-mask">
                                  <a title="开始学习" class="comm-btn c-btn-1" style="cursor: pointer;">开始学习</a>
                              </div>
                          </section>
                          <h3 class="hLh30 txtOf mt10">
                              <a :title="item.title" class="course-title fsize18 c-333" style="cursor: pointer;text-decoration: none">{{ item.title }}</a>
                          </h3>
                          <section class="mt10 hLh20 of">
                              <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                                  <i class="c-fff fsize12 f-fA">免费</i>
                              </span>
                              <span v-else class="fr jgTag bg-green">
                                  <i class="c-fff fsize12 f-fA">￥ {{ item.price }}</i>
                              </span>
                              <span class="fl jgAttr c-ccc f-fA">
                                  <i class="c-999 f-fA">{{ item.view_count }}人学习</i>
                                  |
                                  <i class="c-999 f-fA">{{ item.buy_count}}人已购买</i>
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
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="getData(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="getData(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="getData(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="getData(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="getData(data.pages)">末</a>
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
import course, { STATIC_URL } from "@/api/course"
import history from "@/api/history"
import cookie from 'js-cookie'
export default {
  data () {
    return {
      page: 1,
      data:{
        pages: 1,      //总页数
        total: 1,     //课程数量
        hasPrevious: true,    //能否往前翻页
        hasNext: true,      //能否往后翻页
        current: 1,   //当前页
        items: []   //当前可的所有课程
      },//返回分页结果
      subjectNestedList: {}, // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  //加载完渲染时
  created () {
    //获取课程列表
    this.getData()
    //获取分类
    this.initSubject()
  },
  methods: {
    //查询课程列表
    getData(pageNo=1) {
      course.getCourseList({
        keyword: this.searchObj.subject_child,
        pageNo
      }).then(response => {
        let data = response.data.data
        for(let e of data.list) e.cover = STATIC_URL + "/" + e.cover
        this.data.items = data.list
        this.data.pages = Math.ceil(data.count/8)
        this.data.total = data.count
        this.data.current = data.pageNo
        this.data.hasPrevious = false
      })
      if(pageNo==1){
        this.data.hasPrevious = false
      }else{
        this.data.hasPrevious = true
      }
      if(pageNo == this.data.pages){
        this.data.hasNext = false
      }else{
        this.data.hasNext = true
      }
    },
    //查询所有一级分类
    initSubject(){
      //debugger
      course.getCourseList().then(response => {
        let a = {}
        let data = response.data.data.list
        data.forEach(e => {
          if(a[e.subject]){
            if(a[e.subject].indexOf(e.subject_child)){
              a[e.subject].push(e.subject_child)
            }
          }else{
            a[e.subject]=[e.subject_child]
          }
        });
        this.subjectNestedList = a
      })
    },

    //点击一级分类，显示对应的二级分类，查询数据
    searchOne(val, index) {
      //debugger
      this.oneIndex = index
      this.twoIndex = -1
      this.searchObj.subject_child =val
      this.subSubjectList = this.subjectNestedList[val]
      this.gotoPage(this.page)
    },

    //点击课程，进入详情页，并添加历史记录
    async handleClickCourse(courseID){
      let memberToken = cookie.get('token')
      await history.addHistory({ courseID, memberToken }).then(response=>{
        this.$router.push('/course/'+courseID)
      })
    },

    //点击二级分类，查询数据
    searchTwo(item, index) {
      this.twoIndex = index
      this.searchObj.subject_child = item
      this.gotoPage(this.page)
    },
    
    //购买量查询
    searchBuyCount() {
      this.buyCountSort = "1";
      this.gmtCreateSort = "";
      this.priceSort = "";
      this.data.items.sort(this.compare('buy_count'))
    },
    //热度查询
    searchHot() {
      // debugger
      this.buyCountSort = "";
      this.gmtCreateSort = "1";
      this.priceSort = "";
      this.data.items.sort(this.compare('view_count'))
    },
    //价格查询
    searchPrice() {
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      this.priceSort = "1";
      this.data.items.sort(this.compare('price'))
    },
    //排序方法
    compare(property){
      return function(a,b){
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