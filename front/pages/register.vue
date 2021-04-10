<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

        <el-form-item class="input-prepend restyle" prop="name" :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="你的昵称" v-model="params.name"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="phone" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="params.phone"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="注册" @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  import loginApi from "@/api/login";

  export default {
    layout: 'sign',
    data() {
      return {
        params: {
          phone: '',
          name: '',
          password: '',
        }
      }
    },
    methods: {
      submitRegister() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            console.log("this.params",this.params)
            loginApi.register(this.params).then(response => {
              let data = response.data
              if(data.code==-1){
                this.$message.error(data.message);
              }else{
                this.$router.push({path: '/login'})
                this.$message.success(data.message);
              }
            })
          }
        })
      },

      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
