<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                 <el-form-item label="货币名称" prop="name">
                     <el-input v-model="detailsInfo.name" placeholder="请输入货币名称" />
                </el-form-item>
                <el-form-item label="货币Code" prop="code">
                    <el-input v-model="detailsInfo.code" placeholder="请输入货币Code" />
                </el-form-item>
                <el-form-item label="货币符号" prop="symbol">
                    <el-input v-model="detailsInfo.symbol" placeholder="请输入货币符号" />
                </el-form-item>
                <el-form-item label="货币图标" prop="precision">
                    <Avatar ref="avatarRef" @update:avatar="updateAvatarUrl" />
                </el-form-item>
                <el-form-item label="最小充值" prop="min_deposit">
                    <el-input v-model="detailsInfo.min_deposit" placeholder="请输入最小充值" />
                </el-form-item>
                <el-form-item label="最小提现" prop="min_withdraw">
                    <el-input v-model="detailsInfo.min_withdraw" placeholder="请输入最小提现" />
                </el-form-item>
                <el-form-item label="前端:" prop="display_precision">
                    <el-select v-model="detailsInfo.display_precision" :placeholder="$t('common.place_select') + ' '">
                        <el-option label="隐藏" :value="1" />
                        <el-option label="显示" :value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="status:" prop="status">
                    <el-select v-model="detailsInfo.status" :placeholder="$t('common.place_select') + ' '">
                        <el-option label="disabled" :value="'disabled'"/>
                        <el-option label="enable" :value="'enable'"/>
                    </el-select>
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
import { ref,defineExpose,nextTick } from 'vue'
import {$t} from '@/locales'
import Avatar from "@/components/avatar/index.vue"
import { getCurrencyConfigDetail,addCurrencyConfig,updateCurrencyConfig } from "@/api/currency/index.js"


const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const avatarRef = ref(null)
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
        let res = await getCurrencyConfigDetail({id:row.id})
        if(res.code === 200){
            visible.value = true
            nextTick(() => {
                detailsInfo.value = res.data
                avatarRef.value.setAvatar(res.data.icon)
            })
        }
    }
  
}
const emit = defineEmits(['close'])
/** 更新头像URL */
const updateAvatarUrl = (url) => {
    detailsInfo.value.icon = url
}
const handleSubmit = async () => {
    await formRef.value.validate()
    if (actionType.value === 2) {
        // 新增
        let res = await addCurrencyConfig(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess("添加成功")
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateCurrencyConfig(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess("编辑成功")
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
