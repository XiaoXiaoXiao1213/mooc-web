<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import {STATIC_URL} from "./constants"
export default {
  name: 'Editorbar',
  data () {
    return {
      editor: null,
      info_: null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  // created (){
  //   this.seteditor()
  // },
  mounted () {
    this.seteditor()
  },
  destoryed (){
    this.seteditor()
  },
  // watch:{
  //   value(){
  //     this.seteditor()
  //   }
  // },
  methods: {
    seteditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)

      this.editor.customConfig.pasteFilterStyle = false
      // this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
      // this.editor.customConfig.uploadImgServer = 'https://wx.couplefish.com/bswapi/updateImages'// 配置服务器端地址
      this.editor.customConfig.uploadImgServer = 'http://localhost:18080/api/updateImages'// 配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {      }// 自定义 header
      this.editor.customConfig.uploadFileName = 'files' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 10 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, { data }, editor) => {
          // 图片上传成功，插入图片的回调
          for(let url of data){
            insertImg(STATIC_URL+url)
          }
        }
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }

      // 创建富文本编辑器
      this.editor.create()

      this.editor.txt.html(this.value)
    }
  }
}
</script>

<style lang="css">
.editor {
  width: 80%;
  margin: 0 auto;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 500px;
}
</style>
