<template>
  <div class="table">
    <div class="container" style="padding-bottom: 5px;">
      <div class="handle-box">
        <el-button class="mr20" type="success" icon="el-icon-lx-roundadd" @click="handleEdit()">新增信息</el-button>

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
        <el-table-column prop="title" align="center" label="课程标题"></el-table-column>
        <el-table-column prop="price" align="center" label="课程价格"></el-table-column>
        <el-table-column align="center" label="课程封面" >
          <template slot-scope="scope">
            <img width="200" height="100" :src="scope.row.cover" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="课程状态"></el-table-column>
        <el-table-column prop="gmt_modified" align="center" label="最近更新时间" width="220"></el-table-column>
        <el-table-column label="操作" width="180" align="center" v-if="!is_search">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              v-if="scope.row.status!=='已下架'"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-sort"
              v-if="scope.row.status=='未发布'"
              @click="handleChangeStatue(scope.$index, scope.row)"
            >发布</el-button>
            <el-button
              type="text"
              icon="el-icon-sort"
              v-if="scope.row.status=='已发布'"
              @click="handleChangeStatue(scope.$index, scope.row)"
            >下架</el-button>
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
    <el-dialog :title="form.index?'修改课程':'新增课程'" :visible.sync="editVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px">
        <div>
          <div class="edit-info-div">
            <el-form-item label="课程标题">
              <el-input type="text" v-model="form.title" placeholder="请输入课程标题"></el-input>
            </el-form-item>
          </div>
          <div class="edit-info-div">
            <el-form-item label="课程封面照片">
            <el-upload
              action=""
              accept=".jpg,.jpeg,.png"
              class="avatar-uploader"
              :show-file-list="false"
              :on-change="handlePreview"
              :before-upload="e => false"
              >
              <img v-if="form.cover" :src="form.cover" class="avatar" width="360px" height="180px">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="标签">
                <el-select @change="selectGet" v-model="form.subject" placeholder="请选择标签">
                  <el-option 
                    v-for="(value,key,index) in subjectNestedList" 
                    :key="index"
                    :label="key"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="子标签">
                <el-select v-model="form.subject_child" placeholder="请选择标签">
                  <el-option 
                    v-for="(item, index) in subSubjectList" 
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程讲师">
                <el-select v-model="form.teacher_id" placeholder="请选择标签">
                  <el-option 
                    v-for="item in teacherList" 
                    :key="item._id"
                    :label="item.teacherName"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="edit-info-div">
            <el-form-item label="课程价格">
              <el-input type="text" v-model="form.price" placeholder="请输入课程价格"></el-input>
            </el-form-item>
          </div>
          <div class="edit-info-div">
            <el-form-item label="课程简介">
              <editor-bar v-model="form.description" v-if="editVisible" ></editor-bar>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button style="float: right; margin-left: 10px" @click="editVisible=false">取消</el-button>
            <el-button style="float: right;" type="primary" @click="saveEdit()">确定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import EditorBar from '../../common/WangEditor'
import {STATIC_URL} from "../../common/constants"

export default {
  name: "edu_course",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      total_page: 0,
      select_word: "",
      is_search: false,
      pic_src: "",
      editVisible: false,
      subjectNestedList: {},  //课程一级标签
      subSubjectList: [],   //课程二级标签
      teacherList: [],    //教师列表
      form: {
        index: "",
        title: "",
        price:"",
        img_file:"",
        cover:"",
        subject: "",
        subject_child: "",
        teacher_id: "",
        description: ""
      },
    };
  },
  mounted() {
    this.getData();
    this.initSubject();
    this.getTeacher();
  },
  components: {
    EditorBar
  },
  computed: {
    data() {
      this.getData();
    }
  },
  methods: {

    // 删除课程
    async handleDelete(index, row) {  
      this.idx = index;
      await this.$api.delCourse({id:row._id})
      this.$message.success('删除成功');
      this.getData();
    },

    // 更新课程
    async handleEdit(index, row) {
      let { data } = row ? (await this.$api.getCourse({id:row._id})) : {data: {}}
      this.form = Object.assign({
        index: "",
        title: "",
        price:"",
        img_file:"",
        cover:"",
        subject: "",
        subject_child: "",
        teacher_id: "",
        description: ""
      }, data.course);
      if(row) this.form.cover = STATIC_URL + "/" + this.form.cover
      this.editVisible = true;
    },

    // 更新图片地址
    handlePreview({raw:file}) {
      this.form.img_file = file;
      this.form.cover = window.URL.createObjectURL(file);
    },

    // 保存课程信息
    async saveEdit() {
      if( this.form.title === ''){
        this.$alert('请输入课程标题', '警告', {confirmButtonText: '确定'})
      }else if( this.form.price === ''){
        this.$alert('请输入课程价格', '警告', {confirmButtonText: '确定'})
      }else if( this.form.subject === ''){
        this.$alert('请输入课程一级标签', '警告', {confirmButtonText: '确定'})
      }else if( this.form.subject_child === ''){
        this.$alert('请输入课程二级标签', '警告', {confirmButtonText: '确定'})
      }else if( this.form.teacher_id === ''){
        this.$alert('请输入讲师姓名', '警告', {confirmButtonText: '确定'})
      }else if( this.form.cover === ''){
        this.$alert('请载入一张课程封面图', '警告', {confirmButtonText: '确定'})
      }else {
      let fromdata = new FormData();
      this.form._id && fromdata.append("id", this.form._id)
      fromdata.append("title", this.form.title)
      fromdata.append("price", this.form.price)
      fromdata.append("subject", this.form.subject)
      fromdata.append("subject_child", this.form.subject_child)
      fromdata.append("teacher_id", this.form.teacher_id)
      fromdata.append("description", this.form.description || "")
      fromdata.append("cover", this.form.img_file)
      await this.$api.editCourse(fromdata)
      this.editVisible = false;
      if(this.form._id){
        this.$message.success('修改成功');
      }else{
        this.$message.success('新增成功');
      }
      this.getData()
      }
    },
    // 清除搜索框内容
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
      let { data = [] } = await this.$api.getCourseList({
        keyword: this.select_word,
        pageNo: this.cur_page
      });
      for(let e of data.list) e.cover = STATIC_URL + "/" + e.cover
      this.tableData = data.list;
      this.total_page = data.count;
    },
    search() {
      this.is_search = true;
    },
    clear() {
      this.is_search = !!(this.select_word = "");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectGet(){
      if(this.form.subject_child !== undefined){
        this.form.subject_child = "" 
      }
      this.handleSubjectChange(this.form.subject)
    },
    handleSubjectChange(val) {
      //debugger
      this.subSubjectList = this.subjectNestedList[val]
    },
    //查询所有一级分类
    async initSubject(){
      //debugger
      await this.$api.getCourseList().then(response => {
        let a = {}
        let data = response.data.list
        data.forEach(e => {
          if(a[e.subject]){
            if(a[e.subject].indexOf(e.subject_child)){
              a[e.subject].push(e.subject_child)
            }
          }else{
            a[e.subject]=[e.subject_child]
          }
        });
        this.subjectNestedList = a
      })
    },
    async getTeacher(){
      await this.$api.getTeacherList().then(response => {
        this.teacherList = response.data.list
      })
      console.log(this.teacherList);
    },
    //课程状态改变
    async handleChangeStatue(index, row){
      if(row.status == '未发布'){
        let fromdata = new FormData();
        fromdata.append("id", row._id)
        fromdata.append("status", '已发布')
        await this.$api.editCourseStatus(fromdata)
        this.getData()
      }
      if(row.status == '已发布'){
        let fromdata = new FormData();
        fromdata.append("id", row._id)
        fromdata.append("status", '已下架')
        fromdata.append("is_deleted", 1)
        await this.$api.editCourseStatus(fromdata)
        this.getData()
      }
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
