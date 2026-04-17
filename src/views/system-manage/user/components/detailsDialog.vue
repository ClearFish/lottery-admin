<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                 <el-form-item label="名称" prop="username">
                    <el-input v-model="detailsInfo.username" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                    <el-input v-model="detailsInfo.nick_name" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="detailsInfo.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <Avatar ref="avatarRef" @update:avatar="updateAvatarUrl" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="detailsInfo.status">
                        <el-radio label="normal">正常</el-radio>
                        <el-radio label="disabled">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
           </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">提交</el-button>
                <el-button type="default"  @click="handleClose">关闭</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import Avatar from "@/components/avatar/index.vue"
import { addUser,updateUser,getAuterUser } from "@/api/systemmanage/index.js"

const { proxy } = getCurrentInstance()
const visible = ref(false)
const title = ref($t('common.detail'))
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const avatarRef = ref(null)
const show = async(type,row) => {
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit'),
        2:$t('common.add')
    }
    isCheck.value = type === 0
    actionType.value = type
    title.value = num[type]
    if(type === 2) {
        detailsInfo.value = {}
        visible.value = true
    }else {
        let res = await getAuterUser({id:row.id});
        if(res.code === 200) {
            detailsInfo.value = res.data || {}
            visible.value = true
            nextTick(() => {
                avatarRef.value.setAvatar(detailsInfo.value.avatar)
            })
        }
    }
}
const emit = defineEmits(['close'])
/** 更新头像URL */
const updateAvatarUrl = (url) => {
    detailsInfo.value.avatar = url
}
const handleSubmit = async () => {
    await formRef.value.validate()
    detailsInfo.value.group_ids =[1]
    if (actionType.value === 2) {
        // 新增
        let res = await addUser(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess("添加成功")
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateUser(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess("编辑成功")
            handleClose()
        }
    }
}
defineExpose({
    show
})
/** 关闭弹窗 */
function handleClose() {
    detailsInfo.value = {};
    actionType.value = null;
    avatarRef.value.setAvatar('')
    visible.value = false;
    emit('close')
}
</script>
<style scoped lang="scss">
.dialog-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
