<template>
  <div class="personal">
    <div class="col"><span>头像：</span><img style="margin-left:20px" :src="item.avatar" alt=""></div>
    <div class="col"><span>昵称：</span><input class="person_name" v-model="item.nickname" v-show="change"><span v-show="!change">{{item.nickname}}</span></div>
    <div class="col" v-if="item.sign"><span>签名：</span><input class="person_name" v-model="item.sign" v-show="change"><span v-show="!change" class="person_sign">{{item.sign}}</span></div>
    <div class="col" v-if="!item.sign"><span>签名：</span><input class="person_name" v-model="item.sign" v-show="change"><span v-show="!change" class="person_sign">说点什么吧！</span></div>
    <div class="col"><span>性别：</span><input type="radio" name="sex" value="1" :checked="item.sex==1" style="margin:0 10px 0 20px" :disabled="!change" @change="handleChangeSex(1)">男<input type="radio" value="2" :checked="item.sex==2" name="sex" @change="handleChangeSex(2)" :disabled="!change" style="margin:0 10px 0 40px">女</div>
    <div class="col"><span>年龄：</span><input class="person_name" v-model="item.age" v-show="change"><span v-show="!change">{{item.age}}</span></div>
    <div class="col"><span>手机：</span><input class="person_name" v-model="item.mobile" v-show="change"><span v-show="!change">{{item.mobile}}</span></div>
    <button @click="handleChange()" v-show="!change" class="first_child">修改个人信息</button>
    <button @click="dialogFormVisible = true" v-show="!change">修改密码</button>
    <button @click="handleOut()" v-show="!change">退出登录</button>
    <button @click="handleConfint()" v-show="change">确认</button>
    <button v-show="change" @click="handleCancle()">取消</button>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="旧密码" label-width="120px">
          <el-input v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="再次输出新密码" label-width="120px">
          <el-input v-model="form.confitPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePassword()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import member from "@/api/member";
import cookie from 'js-cookie';
import loginApi from "@/api/login";
export default {
  data() {
    return {
      dialogFormVisible: false,   //弹窗
      change: false,   //能否修改
      item: {},       //用户信息
      form: {}        //用户密码修改
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(){
      let token = cookie.get('token')
      await member.getMember({token: token}).then(response => {
        let member = response.data.data;
        this.item = member
      })
    },
    handleChange(){
      this.change = true
    },
    handleConfint(){
      if (!(/^1[34578]\d{9}$/.test(this.item.mobile))) {
        this.$message.error('手机号码格式不正确')
      }else{
        loginApi.editUser({...this.item, type:"edit"}).then(response => {
          let data = response.data
          if(data.code){
            this.$message.error(data.message);
          }else{
            this.$message.success(data.message);
            this.getData()
            this.change = false
          }
        })
      }
    },
    handleCancle(){
      this.getData()
      this.change = false
    },
    handleOut(){
      this.$router.push('/login')
    },
    handleChangePassword(){
      loginApi.editUser({...this.form, _id:this.item._id, type:"password"}).then(response => {
        let data = response.data
        if(data.code){
          this.$message.error(data.message);
        }else{
          this.$message.success(data.message);
          this.dialogFormVisible = false
        }
      })
    },
    handleChangeSex(e){
      this.item.sex = e
    }
  }
}
</script>

<style scoped>
.personal{font-size: 20px;margin-left: 40%;width: 100%;}
.personal .col{margin-top: 20px;}
.personal .col .person_name{margin-left: 20px;width: 180px;border: 1px solid #999;border-radius: 20px;color: #333;font-weight: 400;font-size: 22px;padding: 5px 20px 5px 20px;}
.person_sign{color: #aaa; font-size: 20px;}
.personal button{height: 30px;width: 100px;margin-left: 50px;margin-top: 20px;}
.personal .first_child{margin-left: -50px;}
</style>