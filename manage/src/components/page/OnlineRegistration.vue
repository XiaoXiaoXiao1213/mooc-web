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
        max-height="650px"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" align="center" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" align="center" label="姓名"></el-table-column>
        <el-table-column prop="phone" align="center" label="电话"></el-table-column>
        <el-table-column prop="text" align="center" label="留言内容"></el-table-column>
        <el-table-column prop="create_time" align="center" label="创建日期" width="120"></el-table-column>
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
  </div>
</template>

<script>
import { constants } from "fs";

export default {
  name: "onlineRegistration",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      total_page: 0,
      multipleSelection: [],
      select_word: "",
      is_search: false
    };
  },
  activated() {
    this.getData();
  },
  computed: {
    data() {
      this.getData();
    }
  },
  methods: {
    clearSelectWord() {
      this.is_search = !!(this.select_word = "");
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取模拟数据
    async getData() {
      let { data = [] } = await this.$api.getRegistrationRecordList({
        keyword: this.select_word,
        pageNo: this.cur_page
      });
      this.tableData = data.list;
      this.total_page = data.count;
    },
    search() {
      this.is_search = true;
    },
    clear() {
      this.is_search = !!(this.select_word = "");
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
