<template>
  <div class="table">
    <div class="container" style="padding-bottom: 5px;">
      <div class="handle-box">

        <el-input v-model="select_word" placeholder="请输入关键字进行搜索" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="info" icon="el-icon-delete" @click="clear">清空</el-button>
        <el-button type="info" icon="el-icon-refresh" @click="getData">刷新</el-button>
      </div>

      <el-table
        :data="tableData"
        :datadata="data"
        stripe
        class="table"
        max-height="600px"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" align="center" label="序号" width="55"></el-table-column>
        <el-table-column prop="nickname" align="center" label="用户名"></el-table-column>
        <el-table-column align="center" label="用户头像" >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.avatar" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column prop="gmt_create" align="center" label="创建日期" width="300"></el-table-column>
        <el-table-column label="操作" width="180" align="center" v-if="!is_search">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-view"
              v-if="scope.row.is_deleted==0"
              @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              v-if="scope.row.is_deleted==0"
              @click="handleLogout(scope.$index, scope.row)"
            >注销</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total_page"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="查看用户信息" :visible.sync="editVisible" width="60%">
      <el-form ref="form" label-width="120px" style="margin: 0 30%">
        <div>
          <el-form-item label="用户头像">
            <img :src="form.avatar" alt="用户头像" height="50px" width="50px">
          </el-form-item>
          <el-form-item label="用户名">
            <span>{{form.nickname}}</span>
          </el-form-item>
          <el-form-item label="用户手机号">
            <span>{{form.mobile}}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{form.sex}}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span>{{form.age}}</span>
          </el-form-item>
          <el-form-item label="用户签名">
            <span>{{form.sign}}</span>
          </el-form-item>
          <el-form-item label="创建日期">
            <span>{{form.gmt_create}}</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="float: right; margin-right: -250px" @click="editVisible=false">关闭</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {STATIC_URL} from "../../common/constants"

export default {
  name: "ucenter_member",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      total_page: 0,
      select_word: "",
      is_search: false,
      editVisible: false,
      form: {
        index: "",
        nickname: "",
        mobile:"",
        avatar:"",
        sex: "",
        age: "",
        sign: "",
        gmt_create: ""
      },
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    data() {
      this.getData();
    }
  },
  methods: {

    // 删除用户
    async handleDelete(index, row) {  
      this.idx = index;
      await this.$api.delMember({id:row._id, type: '删除'})
      this.$message.success('删除成功');
      this.getData();
    },

    // 注销用户
    async handleLogout(index, row) {
      this.idx = index;
      await this.$api.logoutMember({id:row._id, type: '注销'})
      this.$message.success('注销成功');
      this.getData();
    },

    // 更新课程
    async handleEdit(index, row) {
      let { data } = row ? (await this.$api.getMember({id:row._id})) : {data: {}}
      this.form = Object.assign({
        index: "",
        nickname: "",
        mobile:"",
        avatar:"",
        sex: "",
        age: "",
        sign: "",
        gmt_create: ""
      }, data.member);
      if(row) this.form.avatar = STATIC_URL + "/" + this.form.avatar
      this.editVisible = true;
    },
    // 清除搜索框内容
    clearSelectWord() {
      this.is_search = !!(this.select_word = "");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取模拟数据
    async getData() {
      let { data = [] } = await this.$api.getMemberList({
        keyword: this.select_word,
        pageNo: this.cur_page
      });
      // for(let e of data.list) e.avatar = STATIC_URL + "/" + e.avatar
      this.tableData = data.list;
      this.total_page = data.count;
    },
    search() {
      this.is_search = true;
    },
    clear() {
      this.is_search = !!(this.select_word = "");
    }
  }
};
</script>

<style>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 126px;
}

.handle-input {
  width: 500px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.mr10 {
  margin-right: 10px;
}

.mr20 {
  margin-right: 20px;
}
</style>
