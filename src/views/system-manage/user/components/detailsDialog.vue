<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('systemManage.dialog.name')" prop="username">
                    <el-input v-model="detailsInfo.username" :placeholder="$t('common.place_enter') + $t('systemManage.dialog.name')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('systemManage.dialog.nickName')" prop="nick_name">
                    <el-input v-model="detailsInfo.nick_name" :placeholder="$t('common.place_enter') + $t('systemManage.dialog.nickName')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('systemManage.dialog.email')" prop="email">
                    <el-input v-model="detailsInfo.email" :placeholder="$t('common.place_enter') + $t('systemManage.dialog.email')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('systemManage.dialog.avatar')" prop="avatar">
                    <Avatar ref="avatarRef" @update:avatar="updateAvatarUrl" />
                </el-form-item>
                <el-form-item :label="$t('systemManage.dialog.status')" prop="status">
                    <el-radio-group v-model="detailsInfo.status">
                        <el-radio label="normal">{{ $t('systemManage.user.normal') }}</el-radio>
                        <el-radio label="disabled">{{ $t('systemManage.user.disabled') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
           </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">{{ $t('systemManage.dialog.submit') }}</el-button>
                <el-button type="default"  @click="handleClose">{{ $t('systemManage.dialog.close') }}</el-button>
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
            proxy.$modal.msgSuccess($t('systemManage.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateUser(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('systemManage.editSuccess'))
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
