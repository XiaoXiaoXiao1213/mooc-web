<template>
  <div id="forum">
    <section class="container">
      <div class="title">
        <button class="add_forum" @click="dialogFormVisible = true">+ 新增话题</button>
      </div>
      <el-dialog title="新增话题" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="话题标题" label-width="120px">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddForumTitle()">确 定</el-button>
        </div>
      </el-dialog>
      <section class="c-sort-box">
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-666 f-fM">当前话题数：</i>
              <i class="c-master f-fM">{{data.total}}</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':GmtCreate!=''}">
                <a title="最新话题" href="javascript:void(0);" @click="searchGmtCreate()" style="text-decoration: none">最新话题
                <span :class="{hide:GmtCreate==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':hot!=''}">
                <a title="最热话题" href="javascript:void(0);" @click="searchHot()" style="text-decoration: none">最热话题
                <span :class="{hide:hot==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':Answer!=''}">
                <a title="最多回复" href="javascript:void(0);" @click="searchAnswer()" style="text-decoration: none">最多回复
                <span :class="{hide:Answer==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
      </section>
      <div class="mt20 commentHtml">
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul>
              <li v-for="(comment, index) in data.edu_comment" :key="index" class="comment" style="padding-left: 30px">
                <aside class="comment_aside" :class="index+1<4?'comment_active':''">
                  {{index+1}}
                </aside>
                <a class="comment_title" style="text-decoration: none" :href="'/forum/'+comment._id">
                  <div>{{comment.title}}</div>
                  <div class="comment_button">
                    <span>发布日期：{{comment.gmt_create}}</span>
                    <span class="comment_num">{{comment.comment_num}} 回复</span>
                  </div>
                </a>
                <div class="comment_hot fr"><img src="@/assets/img/hot.png" width="20px" height="20px">{{comment.point_num}}</div>
              </li>
            </ul>
          </section>
        </section>
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{ undisable: !data.hasPrevious }"
            title="首页"
            @click.prevent="gotoPage(1)"
            >首</a
          >
          <a
            :class="{ undisable: !data.hasPrevious }"
            title="前一页"
            @click.prevent="gotoPage(data.current - 1)"
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
            @click.prevent="gotoPage(page)"
            >{{ page }}</a
          >
          <a
            :class="{ undisable: !data.hasNext }"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(data.current + 1)"
            >&gt;</a
          >
          <a
            :class="{ undisable: !data.hasNext }"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)"
            >末</a
          >
          <div class="clear" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import forum from "@/api/forum"
import cookie from 'js-cookie';
export default {
  data () {
    return {
      dialogFormVisible: false,
      page: 1,
      data:{
        pages: 1,      //总页数
        total: 1,     //课程数量
        hasPrevious: true,    //能否往前翻页
        hasNext: true,      //能否往后翻页
        current: 1,   //当前页
        items: [],
        edu_comment:[]
      },//返回分页结果
      hot:"",         // 最热话题
      GmtCreate:"1",   //最新话题
      Answer:"",    //最多回复
      form: {}
    }
  },
  //加载完渲染时
  created() {
    this.gotoPage();
  },
  methods: {
    //分页查询
    gotoPage(pageNo=1) {
      this.data.edu_comment = [];
      forum.getForumList({pageNo}).then(response => {
        let data = response.data.data
        this.data.pages = Math.ceil(data.count/10)
        this.data.total = data.count
        this.data.current = data.pageNo
        let forumList = data.list
        forumList.forEach(e => {
          forum.getAnswerList({id: e._id}).then(response => {
            this.data.edu_comment.push({...e,comment_num:response.data.data.count})
          })
        })
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
    //排序方法
    compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    //最新查询
    searchGmtCreate() {
      this.hot = "";
      this.GmtCreate = "1";
      this.Answer = "";
      this.gotoPage()
    },
    //热度查询
    searchHot() {
      // debugger
      this.hot = "1";
      this.GmtCreate = "";
      this.Answer = "";
      this.data.edu_comment.sort(this.compare('point_num'))
    },
    //回复查询
    searchAnswer() {
      // debugger
      this.hot = "";
      this.GmtCreate = "";
      this.Answer = "1";
      this.data.edu_comment.sort(this.compare('comment_num'))
    },
    //新增帖子标题
    handleAddForumTitle(){
      let token = cookie.get('token');
      forum.addForum({title: this.form.title, token}).then(response=> {
        let data = response.data
        if(data.code){
          this.$message.error(data.message);
        }else{
          this.$message.success(data.message);
          this.gotoPage()
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style>
  .active {
    background: #bbb;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }

#forum .container .title{position: relative;;height: 180px;width: 100%;background-image: url("https://tb1.bdstatic.com/tb/cms/frs/bg/default_head20141014.jpg");}
#forum .container .title button{position: absolute;bottom: 20px;right: 20px;line-height: 30px;font-size: 18px;height: 30px;width: 160px;}
.comment{display: flex;flex-direction: row;margin-top: 10px;position: relative;}
.comment_aside{background-color: #999;color: white;font-weight: bolder;height: 30px;width: 30px;text-align: center;line-height: 30px;}
.comment_title{margin-left: 20px;font-size: 22px;line-height: 40px;cursor: pointer;}
.comment_hot{position: absolute;right: 10px;top: 20px;}
.comment_button{font-size: 14px;color: #aaa;}
.comment_active{background-color: tomato;}
.comment_num{margin-left: 14px;background-color: #eee;color: #666;border-radius: 40%;display:inline-block;width: 90px;text-align: center;line-height: 24px;}
</style>