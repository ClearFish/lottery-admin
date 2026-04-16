<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="!isEdit" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="detailsInfo.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="detailsInfo.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="detailsInfo.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="detailsInfo.status">
                        <el-radio label="normal">正常</el-radio>
                        <el-radio label="disabled">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
           </el-form>
        </div>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import { getUserDetail,addUser,updateUser } from "@/api/agent/index.js"

const visible = ref(false)
const title = ref($t('common.detail'))
const detailsInfo = ref({})
const isEdit = ref(false)
const show = async(type,row) => {
    console.log(type,row)
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit')
    }
    let res = await getUserDetail({id:row.id})
    if(res.code === 200){
        detailsInfo.value = res.data
        visible.value = true
        isEdit.value = type === 1
        title.value = num[type]
    }
  
}
defineExpose({
    show
})
</script>
