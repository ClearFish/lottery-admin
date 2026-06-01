<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('systemManage.dialog.name')+':'" prop="username">
                    <el-input v-model="detailsInfo.username" :placeholder="$t('common.place_enter') + $t('systemManage.dialog.name')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('rule.logDialog.ip') + ':'" prop="client_ip">
                    <el-input v-model="detailsInfo.client_ip" :placeholder="$t('common.place_enter') + $t('rule.logDialog.ip')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('rule.logDialog.os') + ':'" prop="os">
                    <el-input v-model="detailsInfo.os" :placeholder="$t('common.place_enter') + $t('rule.logDialog.os')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('rule.logDialog.browser') + ':'" prop="browser">
                    <el-input v-model="detailsInfo.browser" :placeholder="$t('common.place_enter') + $t('rule.logDialog.browser')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('rule.logDialog.url') + ':'" prop="url">
                    <el-input v-model="detailsInfo.url" :placeholder="$t('common.place_enter') + $t('rule.logDialog.url')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('rule.logDialog.createdAt') + ':'" prop="created_at">
                    <el-input v-model="detailsInfo.created_at" :placeholder="$t('common.place_enter') + $t('rule.logDialog.createdAt')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('rule.logDialog.body') + ':'" prop="body">
                    <el-input v-model="detailsInfo.body" type="textarea"></el-input>
                </el-form-item>
           </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="default"  @click="handleClose">{{ $t('systemManage.dialog.close') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import { getLogDetail } from "@/api/systemmanage/index.js"

const { proxy } = getCurrentInstance()
const visible = ref(false)
const title = ref($t('common.detail'))
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const show = async(type,row) => {
    console.log(type,row)
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit'),
        2:$t('common.add')
    }
    visible.value = true
    isCheck.value = type === 0
    actionType.value = type
    title.value = num[type]
    let res = await getLogDetail({id:row.id})
    detailsInfo.value = res.data || {}
}
const emit = defineEmits(['close'])


defineExpose({
    show
})
/** 关闭弹窗 */
function handleClose() {
    visible.value = false;
    detailsInfo.value = {};
    actionType.value = null;
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
