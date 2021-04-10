<template>
  <div class="person">
    <div class="title">
      <div class="person_intro">
        <div class="person_name">{{ item.name }}</div>
        <div class="person_sign" v-if="!item.intro">说些什么介绍一下自己</div>
        <div class="person_sign" v-if="item.intro">{{ item.intro }}</div>
      </div>
    </div>
    <div class="container content">
      <div class="lt">
        <div class="aside_title" :class="select=='personal'?'active':''" @click="select='personal'">个人设置</div>
        <div class="aside_title" :class="select=='history'?'active':''" @click="select='history'">浏览记录</div>
      </div>
      <div class="rt">
        <personal v-show="select=='personal'"></personal>
        <history v-show="select=='history'"></history>
      </div>
    </div>
  </div>
</template>

<script>
import History from './history.vue'
import Personal from './personal.vue'
import member from "@/api/member";
import cookie from 'js-cookie'

export default {
  components: {
    History,
    Personal
  },
  data() {
    return {
      select: "history",
      item: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let token = cookie.get('token')
      await member.getMember(token).then(response => {
        console.log("大大",response.data.data)
        let member = response.data.data.user;
        this.item = member
      })
    },

  }
}
</script>

<style>
.title .person_intro {
  background-image: url("https://static3.sycdn.imooc.com/static/img/u/temp1.png");
  height: 200px;
  width: 100%;
  padding: 40px 0 0 360px;
  color: white;
  box-sizing: border-box;
}

.title .person_pic {
  height: 160px;
  width: 160px;
  float: left;
  margin: 50px 0 0 160px;
  border: 5px solid white;
  border-radius: 100%;
}

.gmt_create {
  float: right;
  margin: 80px 40px 0 0;
  font-size: 18px;
}

.person_name {
  font-weight: bolder;
  font-size: 40px;
}

.person_sign {
  font-size: 16px;
  margin: 10px 0 0 10px;
}

.content {
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  margin-bottom: 60px;
}

.content .lt {
  flex: 1;
}

.content .lt .aside_title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10%;
}

.content .lt .active {
  background-color: rgba(240, 20, 20, 0.8);
  color: white;
}

.content .rt {
  flex: 5;
}
</style>
