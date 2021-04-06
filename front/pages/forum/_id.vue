<template>
  <div id="forum">
    <section class="container">
      <div class="title"></div>
      <div class="forum_title">
        <div>帖子主题：{{data.title}}</div>
        <div style="font-size:14px;color:#666">发布日期：{{data.gmt_create}}</div>
      </div>
      <section class="c-sort-box">
        <div class="forum_box" v-for="(comment, index) in data.edu_comment" :key="index">
          <div class="lf_box">
            <img :src="comment.avatar" alt="" width="100px" height="100px">
            <div>{{comment.nickname}}</div>
          </div>
          <div class="rg_box">
            <div class="content">{{comment.content}}</div>
            <div class="explane">
              <span>{{index+1}}楼</span>
              <span class="date">评论日期：{{comment.gmt_create}}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="comment">
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">回复帖子</span>
        </h6>
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <img
                  width="50"
                  height="50"
                  class="picImg"
                  src="https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg"
                />
              </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea
                      name=""
                      v-model="content"
                      placeholder="输入您要评论的文字"
                      id="commentContent"
                    ></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl"
                      ><tt
                        class="c-red commentContentmeg"
                        style="display: none"
                      ></tt
                    ></span>
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
      </div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{ undisable: !data.hasPrevious }"
          title="首页"
          @click.prevent="getData(1)"
          >首</a
        >
        <a
          :class="{ undisable: !data.hasPrevious }"
          title="前一页"
          @click.prevent="getData(data.current - 1)"
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
          @click.prevent="getData(page)"
          >{{ page }}</a
        >
        <a
          :class="{ undisable: !data.hasNext }"
          href="#"
          title="后一页"
          @click.prevent="getData(data.current + 1)"
          >&gt;</a
        >
        <a
          :class="{ undisable: !data.hasNext }"
          href="#"
          title="末页"
          @click.prevent="getData(data.pages)"
          >末</a
        >
        <div class="clear" />
      </div>
    </section>
  </div>
</template>

<script>
import forum from "@/api/forum"
import member from "@/api/member";
import cookie from 'js-cookie';
export default {
  // 异步调用 初始化页面(改为得到路由中课程id值)
  asyncData({ params, error }) {
      return {
        forumId: params.id,
      };
  },
  data() {
    return {
      content: "",
      data:{
        pages: 1,      //总页数
        total: 1,     //课程数量
        hasPrevious: true,    //能否往前翻页
        hasNext: true,      //能否往后翻页
        current: 1,   //当前页
        title: "",    //帖子标题
        gmt_create: "",   //帖子创建日期
        edu_comment:[]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //查询课程列表
    getData(pageNo=1){
      this.data.edu_comment = [];
      forum.getAnswerList({id: this.forumId, pageNo}).then(response => {
        let data = response.data.data
        this.data.pages = Math.ceil(data.count/8)
        this.data.total = data.count
        this.data.current = data.pageNo
        let answerList = data.list
        answerList.forEach(e => {
          member.getMember({id: e.member_id}).then(response => {
            this.data.edu_comment.push({...response.data.data, ...e})
          })
        })
      })
      forum.getForumList({id: this.forumId}).then(response => {
        let data = response.data.data.list[0]
        this.data.title = data.title
        this.data.gmt_create = data.gmt_create
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
    //新增回复
    addComment(){
      let token = cookie.get('token')
      forum.addForumAnswer({token, content: this.content, forum_id: this.forumId}).then(response=>{
        let data = response.data
        if(data.code){
          this.$message.error(data.message);
        }else{
          this.$message.success(data.message);
          this.getData()
          this.content = ""
        }
      })
    }
  }
};
</script>
<style scoped>
#forum .container .title{position: relative;;height: 180px;width: 100%;background-image: url("https://tb1.bdstatic.com/tb/cms/frs/bg/default_head20141014.jpg");}
.forum_title{padding: 20px;color: rgb(51, 51, 51);box-sizing: content-box;font-family: "microsoft yahei";font-size: 20px;font-weight: 400;line-height: 56px;border: 1px solid #ddd;border-bottom: 0px;display: flex;justify-content: space-between;}
.forum_box{height: 300px;width: 1159px;border: 1px solid #ddd;border-bottom: 0px;display: flex;font-display: row;}
.forum_box .lf_box{text-align: center;background-color: rgb(248, 247, 247);color: rgb(45, 100, 179);font-size: 12px;}
.forum_box .lf_box img{margin: 20px;}
.rg_box{padding: 40px 40px 5px 40px;position: relative;width: 100%;}
.content{font-size: 16px;line-height: 24px;}
.explane{position: absolute;bottom: 10px;right: 20px;color: #999;}
.date{margin-left: 20px;}
.comment{border: 1px solid #ddd;padding: 30px 0 40px 20px;}


</style>