<template>
  <div class="user-info-head" @mouseenter="showAction = true" @mouseleave="showAction = false">
    <img :src="options.img"  class="img-lg" v-if="options.img"/>
    <img :src="noImg" alt="" class="no_img" v-else>
    <div class="action_box" v-if="showAction">
       <el-button type="text">
        <el-icon class="el-icon--right" color="#000"><Delete /></el-icon>
      </el-button>
      <el-button type="text">
        <el-icon class="el-icon--right" color="#000"><View /></el-icon>
      </el-button>
      <el-upload
          action="#"
          :http-request="requestUpload"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :accept="accept"
          class="upload_btn"
        >
          <el-button type="text">
            <el-icon class="el-icon--right" color="#000"><Upload /></el-icon>
          </el-button>
        </el-upload>
    </div>
  </div>
</template>

<script setup>
import "vue-cropper/dist/index.css"
import { uploadFile } from "@/api/file"
import noImg from "@/assets/images/no_img.png"
import {$t} from "@/locales"
const { proxy } = getCurrentInstance()

const open = ref(false)
const visible = ref(false)
const showAction = ref(false)
const title = ref($t('common.avatarUpload'))
const props = defineProps({
  avatar: {
    type: String,
    default: ''
  }
})

const accept = ref("image/*")
const emit = defineEmits(['update:avatar'])

//图片裁剪数据
const options = reactive({
  img: props.avatar,     // 裁剪图片的地址
  autoCrop: true,            // 是否默认生成截图框
  autoCropWidth: 200,        // 默认生成截图框宽度
  autoCropHeight: 200,       // 默认生成截图框高度
  fixedBox: true,            // 固定截图框大小 不允许改变
  outputType: "png",         // 默认生成截图为PNG格式
  filename: 'avatar',        // 文件名称
  previews: {},             //预览数据
  file: null
})


/** 覆盖默认上传行为 */
function requestUpload() {
  let formData = new FormData()
  formData.append("file", options.file)
  uploadFile(formData).then(res => {
    open.value = false
    console.log(res)
    options.img =  import.meta.env.VITE_APP_BASE_URL + res.data.Url
    proxy.$modal.msgSuccess("上传成功")
    emit('update:avatar', res.data.Url)
    visible.value = false
  })
}


/** 上传预处理 */
function beforeUpload(file) {
  if (file.type.indexOf("image/") == -1) {
    proxy.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      options.img = reader.result
      options.filename = file.name
      options.file = file
    }
  }
}

</script>

<style lang='scss' scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
  width: 120px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  img {
   width: 90%;
   height: auto;
   margin: auto;
  }
}
.user-info-head:hover {
  cursor: pointer;
}
.action_box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  .el-button {
    margin-left:0;
  }
  :deep(.upload_btn) {
    .el-upload {
      background: none;
    }
  }
}
// .user-info-head:hover:after {
//   content: "+";
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   color: #eee;
//   background: rgba(0, 0, 0, 0.5);
//   font-size: 48px;
//   font-style: normal;
//   text-align: center;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   cursor: pointer;
//   line-height: 110px;
//   border-radius: 50%;
// }
</style>