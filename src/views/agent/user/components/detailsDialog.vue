<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('agent.dialog.username')" prop="username">
                    <el-input v-model="detailsInfo.username" :placeholder="$t('common.place_enter') + $t('agent.dialog.username')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agent.dialog.password')" prop="password">
                    <el-input v-model="detailsInfo.password" :placeholder="$t('common.place_enter') + $t('agent.dialog.password')"></el-input>
                </el-form-item>
                
                <el-form-item :label="$t('agent.dialog.areaCode')" prop="area_code">
                    <el-input v-model="detailsInfo.area_code" :placeholder="$t('common.place_enter') + $t('agent.dialog.areaCode')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agent.dialog.phone')" prop="phone">
                    <el-input v-model="detailsInfo.phone" :placeholder="$t('common.place_enter') + $t('agent.dialog.phone')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agent.dialog.email')" prop="email">
                    <el-input v-model="detailsInfo.email" :placeholder="$t('common.place_enter') + $t('agent.dialog.email')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agent.dialog.firstName')" prop="first_name">
                    <el-input v-model="detailsInfo.first_name" :placeholder="$t('common.place_enter') + $t('agent.dialog.firstName')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('agent.dialog.lastName')" prop="last_name">
                    <el-input v-model="detailsInfo.last_name" :placeholder="$t('common.place_enter') + $t('agent.dialog.lastName')"></el-input>
                </el-form-item>
                 <el-form-item :label="$t('agent.dialog.avatar')" prop="avatar">
                    <Avatar ref="avatarRef" @update:avatar="updateAvatarUrl" />
                </el-form-item>
                <el-form-item :label="$t('agent.dialog.status')" prop="status">
                    <el-radio-group v-model="detailsInfo.status">
                        <el-radio label="normal">{{ $t('agent.user.normal') }}</el-radio>
                        <el-radio label="disabled">{{ $t('agent.user.disabled') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
           </el-form>
        </div>
         <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">{{ $t('agent.dialog.submit') }}</el-button>
                <el-button type="default"  @click="handleClose">{{ $t('agent.dialog.close') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import { getUserDetail,addUser,updateUser } from "@/api/agent/index.js"
import Avatar from "@/components/avatar/index.vue"

const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
const avatarRef = ref(null)
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const show = async(type,row) => {
    console.log(type,row)
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit')
    }
    isCheck.value = type === 0
    actionType.value = type
    title.value = num[type]
    if(type === 2) {
        detailsInfo.value = {}
        visible.value = true
    }else {
        let res = await getUserDetail({id:row.id})
        if(res.code === 200){
            detailsInfo.value = res.data
            visible.value = true
            nextTick(() => {
                avatarRef.value.setAvatar(res.data.avatar)
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
            proxy.$modal.msgSuccess($t('agent.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateUser(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('agent.editSuccess'))
            handleClose()
        }
    }
}
/** 关闭弹窗 */
function handleClose() {
    detailsInfo.value = {};
    actionType.value = null;
    avatarRef.value.setAvatar('')
    visible.value = false;
    emit('close')
}
defineExpose({
    show
})
</script>
<style scoped lang="scss">
.dialog-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
