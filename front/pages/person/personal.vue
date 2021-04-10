<template>
  <div class="personal">
    <div class="col"><span>手机：</span><input class="person_name" v-model="item.phone" v-show="change"><span
      v-show="!change">{{ item.phone }}</span></div>
    <div class="col"><span>昵称：</span><input class="person_name" v-model="item.name" v-show="change"><span
      v-show="!change">{{ item.name }}</span></div>
    <div class="col" v-if="item.intro"><span>签名：</span>
      <input class="person_name" v-model="item.intro" v-show="change">
      <span v-show="!change" class="person_sign">{{ item.intro }}</span>
    </div>
    <div class="col" v-if="!item.intro"><span>签名：</span>
      <input class="person_name" v-model="item.intro" v-show="change">
      <span v-show="!change" class="person_sign">说点什么吧！</span>
    </div>
    <div class="col"><span>标签:</span>
      <el-select v-show="change" @change="selectGet" multiple v-model="item.interests_type" placeholder="标签">
        <el-option
          v-for="(item,index) in subjectNestedList"
          :key="index+1"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <span v-show="!change" :key='item.id' v-for="item in item.interests_type">{{ item }}</span>
    </div>
    <button @click="handleChange()" v-show="!change" class="first_child">修改个人信息</button>
    <button @click="dialogFormVisible = true" v-show="!change">修改密码</button>
    <button @click="handleOut()" v-show="!change">退出登录</button>
    <button @click="handleConfint()" v-show="change">确认</button>
    <button v-show="change" @click="handleCancle()">取消</button>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="旧密码" label-width="120px">
          <el-input v-model="form.old_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px">
          <el-input v-model="form.new_password"></el-input>
        </el-form-item>
        <el-form-item label="再次输出新密码" label-width="120px">
          <el-input v-model="form.confit_password"></el-input>
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
      item: {
        id: "",
        interests_type: [],
        name: "",
        phone: "",
        intro: "",

      },       //用户信息
      form: {},        //用户密码修改
      subjectNestedList: ["计算机", "外语", "理学", "工学", "21/22考研", "期末不挂科", "应试英语", "实用英语", "经济管理", "心理学",
        "文史哲", "艺术设计", "医药卫生", "教育教学", "法学", "农林园艺", "音乐与舞蹈"],  //课程标签
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let token = cookie.get('token')
      await member.getMember(token).then(response => {
        let member = response.data.data.user;
        cookie.set('token', token)
        this.item = member
      })
    },

    handleChange() {
      this.change = true
    },

    handleConfint() {
      if (!(/^1[34578]\d{9}$/.test(this.item.phone))) {
        this.$message.error('手机号码格式不正确')
      } else {
        let token = cookie.get('token')
        member.editMember(this.item, token).then(response => {
          let data = response.data
          if (data.code == 200) {
            this.$message.success("修改成功");
            cookie.set('token', data.token)
            this.getData()
            this.change = false
          } else {
            this.$message.error(data.message);
          }
        })
      }
    },
    handleCancle() {
      this.getData()
      this.change = false
    },
    // 退出登陆
    handleOut() {
      cookie.remove('token')
      cookie.remove('name')
      this.$router.push('/login')
    },

    selectGet() {
      console.log(this.item.interests_type)
      if (this.item.interests_type.length > 3) {
        this.item.interests_type = [this.item.interests_type[0], this.item.interests_type[1], this.item.interests_type[2]]
        this.$message.error("不能多于3个");
      }
      console.log(this.item.interests_type)

    },
    handleChangePassword() {
      let token = cookie.get('token')
      member.editPassword(this.form, token).then(response => {
        console.log("x",response.data)
        let data = response.data
        if (data.code !== 200) {
          this.$message.error(data.message);
        } else {
          this.$message.success(data.message);
          this.dialogFormVisible = false
        }
      })
    },
  }
}
</script>

<style scoped>
.personal {
  font-size: 20px;
  margin-left: 40%;
  width: 100%;
}

.personal .col {
  margin-top: 20px;
}

.personal .col .person_name {
  margin-left: 20px;
  width: 180px;
  border: 1px solid #999;
  border-radius: 20px;
  color: #333;
  font-weight: 400;
  font-size: 22px;
  padding: 5px 20px 5px 20px;
}

.person_sign {
  color: #aaa;
  font-size: 20px;
}

.personal button {
  height: 30px;
  width: 100px;
  margin-left: 50px;
  margin-top: 20px;
}

.personal .first_child {
  margin-left: -50px;
}
</style>
