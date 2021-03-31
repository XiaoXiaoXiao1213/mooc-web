<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="谷粒学院">
            <img src="~/assets/img/logo.png" width="100%" alt="谷粒学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/forum" tag="li" active-class="current">
              <a>论坛</a>
            </router-link>
            <router-link to="/person" tag="li" active-class="current">
              <a>个人中心</a>
            </router-link>
          </ul>

          <!-- / nav 登录|注册 用户信息-->
          <ul class="h-r-login">
              <li v-if="!token" id="no-login">
                  <a href="/login" title="登录">
                      <em class="icon18 login-icon">&nbsp;</em>
                      <span class="vam ml5">登录</span>
                  </a>
                  |
                  <a href="/register" title="注册">
                      <span class="vam ml5">注册</span>
                  </a>
              </li>
              <li v-if="token" id="is-login-two" class="h-r-user">
                  <a href="/person">
                    <img
                      :src="loginInfo.avatar"
                      width="30"
                      height="30"
                      class="vam picImg"
                    >
                    <span id="userName" class="vam disIb" :title="loginInfo.nickname">{{ loginInfo.nickname }}</span>
                  </a>
                  <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
              </li>
              <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入课程名" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
      
    <!-- /公共头引入 -->
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank" style="marginRight: 20px">糖果超甜</a>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank" style="marginRight: 20px">糖果一般</a>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank">糖果好苦</a>
            </li>
          </ul>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <br>
                <span>服务热线：010-88888888(北京) 0755-888888888(深圳)</span>
                <br>
                <span>Email：aaaa@atguigu.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2018课程版权均归糖果超甜所有 京ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import loginApi from "@/api/login";

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        avatar: '',
        mobile: '',
        nickname: ''
      }
    }
  },

  created() {
    this.showInfo()
  },

  methods: {
    // 用户信息回显
    showInfo() {
      //debugger
      let token = cookie.get("token");
      let nickname = cookie.get("nickname")
      let avatar = cookie.get('avatar')
      this.token = token
      this.loginInfo = {avatar, nickname}
    },

    logout() {
      let token = cookie.get("token");
      loginApi.editUser({token, type:"logout"}).then(response => {
          let data = response.data
          if(data.code){
            this.$message.error(data.message);
          }else{
            this.$message.success(data.message);
            //debugger
            cookie.set('avatar', "", {domain: 'localhost'})
            cookie.set('token', "", {domain: 'localhost'})
            cookie.set('nickname', "", {domain: 'localhost'})
            //跳转页面
            window.location.href = "/"
          }
        })
    }
  }
};
</script>