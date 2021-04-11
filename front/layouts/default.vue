<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/person" tag="li" active-class="current">
              <a>个人中心</a>
            </router-link>
          </ul>

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
                <span id="userName" class="vam disIb" :title="loginInfo.name">{{ loginInfo.name }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>

          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入课程名"  v-model="searchText" name="queryCourse.courseName" value>
                <button @click.prevent="getCourse" class="s-btn">
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
import Bus from '@/utils/bus.js';

export default {
  data() {
    return {
      token: '',
      searchText: '',
      loginInfo: {
        avatar: '',
        phone: '',
        name: ''
      }
    }
  },

  created() {
    this.showInfo()
  },

  methods: {
    // 用户信息回显
    showInfo() {
      let token = cookie.get("token");
      let name = cookie.get("name")
      let avatar = cookie.get('avatar')
      this.token = token
      this.loginInfo = {avatar, name}
    },

    logout() {
      let token = cookie.get("token");
      loginApi.logout(token).then(response => {
        let data = response.data
        if (data.code == -1) {
          this.$message.error(data.message);
          window.location.href = "/"
        } else {
          this.$message.success(data.message);
          //debugger
          cookie.set('avatar', "", {domain: 'localhost'})
          cookie.set('token', "", {domain: 'localhost'})
          cookie.set('name', "", {domain: 'localhost'})
          //跳转页面
          window.location.href = "/"
        }
      })
    },
    getCourse() {
      Bus.$emit('searchCourse', this.searchText);
      this.$router.push("/course")
      return undefined;
    }
  }
};
</script>
