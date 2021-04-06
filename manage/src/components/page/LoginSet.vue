<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号名称">
                    <el-input v-model="form.username" readonly></el-input>
                </el-form-item>
                <el-form-item label="原密码">
                    <el-input type="password" v-model="form.password" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { constants } from "fs";
import { alertMessage } from "../common/utils";
import { alertEx } from "../common/common";
export default {
  name: "loginSet",
  data() {
    return {
      form: {
        username: "admin",
        password: "",
        newPassword: ""
      }
    };
  },
  created() {},
  computed: {
    data() {}
  },
  methods: {
    async onSubmit() {
      if (this.form.password === "" || this.form.newPassword === "") {
        alertMessage("原密码或新密码不能为空", "error");
        return;
      }
      let data = await this.$api.modifyAdministratorPassword({
        username: this.form.username,
        password: this.form.password,
        newPassword: this.form.newPassword
      });

      if (data.code == -1) {
        alertMessage("原密码不正确", "error");
      } else {
        alertMessage("修改成功,请重新登录", "success");
        this.$router.push(this.$route.query.redirect || "/login");
      }
    }
  }
};
</script>

