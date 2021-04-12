<template>
  <div class="table">
    <div class="container" style="padding-bottom: 5px;">
      <div class="handle-box">
        <el-button class="mr20" type="success" icon="el-icon-lx-roundadd" @click="handleEdit()">新增信息</el-button>
        <el-input v-model="select_word" placeholder="请输入关键字进行搜索" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
        <el-table-column prop="name" align="center" label="课程标题"></el-table-column>
        <el-table-column align="center" label="课程封面">
          <template slot-scope="scope">
            <img width="200" height="100" :src="scope.row.video_img" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column prop="video_url" align="center" label="课程地址"></el-table-column>
        <el-table-column prop="video_type" align="center" label="标签"></el-table-column>
        <el-table-column label="操作" width="180" align="center" v-if="!is_search">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
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
    <el-dialog :title="form.id?'修改课程':'新增课程'" :visible.sync="editVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px">
        <div>
          <div class="edit-info-div">
            <el-form-item label="课程标题">
              <el-input type="text" v-model="form.name" placeholder="请输入课程标题"></el-input>
            </el-form-item>
            <el-form-item label="课程地址">
              <el-input type="text" v-model="form.video_url" placeholder="请输入课程地址"></el-input>
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
                <el-select @change="selectGet" v-model="form.video_type" placeholder="请选择标签">
                  <el-option
                      v-for="(item,index) in subjectNestedList"
                      :key="index+1"
                      :label="item"
                      :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="edit-info-div">
          </div>
          <div class="edit-info-div">
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
import CourseApi from "../../../../api/course"

export default {
  name: "edu_course",
  data() {
    return {
      tableData: [],
      firstLoad: false,
      cur_page: 1,
      total_page: 0,
      select_word: "",
      is_search: false,
      pic_src: "",
      editVisible: false,
      subjectNestedList: ["计算机", "外语", "理学", "工学", "21/22考研", "期末不挂科", "应试英语", "实用英语", "经济管理", "心理学",
        "文史哲", "艺术设计", "医药卫生", "教育教学", "法学", "农林园艺", "音乐与舞蹈"
      ],  //课程标签
      form: {
        id: "",
        name: "",
        content: "",
        video_img: "",
        video_url: "",
        video_type: "",
        cover: ""
      },
    };
  },
  mounted() {
    this.getData();
    //this.initSubject();
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
    async handleDelete(id, row) {
      this.id = id;
      await CourseApi.deleteCourse(row.id)
      this.$message.success('删除成功');
      this.search()
    },


    // 更新课程
    async handleEdit(index, row) {
      let {data} = row ? (await CourseApi.getCourseById(row.id)) : {data: {}}
      if (!row) {
        this.form = Object.assign({
          id: "",
          name: "",
          content: "",
          video_img: "",
          video_url: "",
          video_type: "",
        });
      } else {
        this.form = Object.assign({
          id: "",
          name: "",
          content: "",
          video_img: "",
          video_url: "",
          video_type: "",
        }, data.data.video);
      }
      if (row) this.form.cover = STATIC_URL + "/" + this.form.video_img
      this.editVisible = true;
      this.search()
    },

    // 更新图片地址
    handlePreview({raw: file}) {
      this.form.video_img = file;
      this.form.cover = window.URL.createObjectURL(file);
    },

    // 保存课程信息
    async saveEdit() {
      if (this.form.name === '') {
        this.$alert('请输入课程标题', '警告', {confirmButtonText: '确定'})
      }  else if (this.form.video_type === '') {
        this.$alert('请输入课程标签', '警告', {confirmButtonText: '确定'})
      } else if (this.form.video_img === '') {
        this.$alert('请载入一张课程封面图', '警告', {confirmButtonText: '确定'})
      } else if (this.form.video_url === '') {
        this.$alert('请输入课程地址', '警告', {confirmButtonText: '确定'})
      } else {
        let fromdata = new FormData();
        this.form.id && fromdata.append("id", this.form.id)
        fromdata.append("name", this.form.name)
        fromdata.append("video_url", this.form.video_url)
        fromdata.append("video_type", this.form.video_type)
        fromdata.append("video_img", this.form.video_img)
        await CourseApi.createCourse(fromdata)
        this.editVisible = false;
        if (this.form.id) {
          this.$message.success('修改成功');
        } else {
          this.$message.success('新增成功');
        }
        this.search()
      }
    },

    // 清除搜索框内容
    clearSelectWord() {
      this.is_search = !!(this.select_word = "");
    },

    // 分页导航
    handleCurrentChange(val) {
      console.log(val)
      this.cur_page = val;
      this.search()
    },

    // 获取模拟数据
    async getData() {
      if (this.tableData.length === 0 && this.firstLoad === false) {
        let {data} = await CourseApi.getCourseAll({
          "page": this.cur_page,
          "page_size": 10
        });
        for (let e of data.data.videos) e.video_img = STATIC_URL + "/" + e.video_img
        this.tableData = data.data.videos;
        console.log(this.tableData);
        this.total_page = data.data.total;
        this.firstLoad = true;
      }
      return this.tableData
    },

    async search() {
      let {data} = await CourseApi.getCourseAll({
        "content": this.select_word,
        "page": this.cur_page,
        "page_size": 10
      });
      for (let e of data.data.videos) e.video_img = STATIC_URL + "/" + e.video_img
      this.tableData = data.data.videos;
      console.log("d", this.tableData)
      this.total_page = data.data.total;
    },

    clear() {
      this.is_search = !!(this.select_word = "");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectGet() {
      if (this.form.subject_child !== undefined) {
        this.form.subject_child = ""
      }
      this.handleSubjectChange(this.form.subject)
    },

    handleSubjectChange(val) {
      //debugger
      this.subSubjectList = this.subjectNestedList[val]
    },
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
