<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Mooc系统管理后台登陆</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.password"
              @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips : 手机号和密码不能为空。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import {alertMessage} from "../common/utils";
import {User} from "../common/entity";
import LogApi from "../../../api/login"
import cookie from 'js-cookie'

export default {
  data: function () {
    return {
      ruleForm: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [
          {required: true, message: "请输入手机号", trigger: "blur"}
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let {data} = await LogApi.login(
                this.ruleForm
            );
            console.log(data)

            if (data.code == 200) {
              alertMessage(data.message, "success");
              cookie.set('token', data.data.token)
              cookie.set('name', data.data.user.name)
              cookie.set('avatar', data.data.user.image)
              this.$router.push({path: '/course'})
            } else {
              alertMessage(data.message, "error");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
