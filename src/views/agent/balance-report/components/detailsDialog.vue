<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
               <el-form-item :label="$t('agent.balanceDialog.agentId')" prop="id">
                     <el-select v-model="detailsInfo.agent_id" :placeholder="$t('common.place_select') + ' '">
                        <el-option v-for="item in agentList" 
                            :key="item.id" 
                            :label="item.username" 
                            :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('agent.balanceDialog.currency')" prop="currency">
                    <el-select v-model="detailsInfo.currency_code" :placeholder="$t('common.place_select') + ' '">
                        <el-option v-for="item in currencyList" 
                            :key="item.id" 
                            :label="item.name" 
                            :value="item.code" />
                    </el-select>
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
import { getAgentWalletDetail,getUserList,addAgentWallet,updateAgentWalletBalance } from "@/api/agent/index.js"
import {getCurrencyConfigList} from '@/api/currency/index.js'

const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
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
    getAgentList()
    getCurrencyList()
    if(type === 2) {
        detailsInfo.value = {}
        visible.value = true
    }else {
        let res = await getAgentWalletDetail({id:row.id})
        if(res.code === 200){
            detailsInfo.value = res.data
            visible.value = true
        }
    }
  
}
const emit = defineEmits(['close'])

const handleSubmit = async () => {
    await formRef.value.validate()
    if (actionType.value === 2) {
        // 新增
        let res = await addAgentWallet(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('agent.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateAgentWalletBalance(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('agent.editSuccess'))
            handleClose()
        }
    }
}
const agentList = ref([])
async function getAgentList() {
    let res = await getUserList()
    if(res.code === 200){
        agentList.value = res.data
    }
}
const currencyList = ref([])
const getCurrencyList = async () => {
    let res = await getCurrencyConfigList()
    if(res.code === 200){
        currencyList.value = res.data
    }
}
/** 关闭弹窗 */
function handleClose() {
    visible.value = false;
    detailsInfo.value = {};
    actionType.value = null;
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
