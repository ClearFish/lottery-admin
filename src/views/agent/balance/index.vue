<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item :label="$t('agent.balance.id') + ':'" prop="id">
                    <el-input v-model="queryParams.id" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item :label="$t('agent.balance.currency') + ':'" prop="currency">
                    <el-select v-model="queryParams.status" :placeholder="$t('common.place_select') + ' '">
                        <el-option :label="$t('agent.user.normal')" value="1" />
                        <el-option :label="$t('agent.user.disabled')" value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="resetForm">{{ $t('common.reset') }}</el-button>
                    <el-button type="primary" @click="getList">{{ $t('common.search') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="add_box">
            <el-button type="primary" @click="addDetails">{{ $t('common.add') }}</el-button>
        </div>
        <el-table :data="dataList" style="width: 100%" border >
            <el-table-column prop="id" :label="$t('agent.balance.id')" align="center"  />
            <el-table-column prop="name" :label="$t('agent.user.name')" align="center">
                <template #default="scope">
                    {{ scope.row.first_name +' '+ scope.row.last_name }}
                </template>
            </el-table-column>
            <el-table-column prop="currency_code" :label="$t('agent.balance.currency')" align="center"  />
            <el-table-column prop="created_at" :label="$t('agent.balance.createdTime')" align="center"  />
            <el-table-column prop="updated_time" :label="$t('agent.balance.updatedTime')" align="center"  />
            <el-table-column prop="" :label="$t('agent.balance.action')" align="center" min-width="150">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                    <el-button type="danger"  @click="deleteRow(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
            v-show="total > 0"
            :total="total"
            v-model:page="page.page"
            v-model:limit="page.pageSize"
            @pagination="getList"
        />
        <details-dialog ref="detailsDialogRef" @close="getList"/>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getAgentWallet } from '@/api/agent'
import { ElMessage,ElMessageBox } from 'element-plus'
import detailsDialog from './components/detailsDialog.vue'
import {$t} from "@/locales"
const detailsDialogRef = ref(null)
const dataList = ref([])

const pageInit = {
    pageSize:20,
    page:1
}
const queryParams = ref({
    username:'',
    mobile:''
})
const showDetails = (row) => {
    console.log(row)
    detailsDialogRef.value.show(0,row)
}
const editDetails = (row) => {
    detailsDialogRef.value.show(1,row)
}
const addDetails = () => {
    detailsDialogRef.value.show(2)
}
const deleteRow = async (row) => {
    ElMessageBox.confirm($t('common.delete_confirm'), $t('common.logout_title'), {
        confirmButtonText: $t('common.confirm'),
        cancelButtonText: $t('common.cancel'),
        type: 'warning'
    }).then(async () => {
        let res = await deleteCurrencyConfig({id:row.id});
        if(res.code == 200) {
            ElMessage.success($t('common.delete_success'))
            getList()
        }
    }).catch(() => { })
}
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getAgentWallet(page.value)
  if (res.code === 200) {
    dataList.value = res.data
    total.value = res.meta.total
  }
}
const resetForm = () => {
    queryParams.value = {
        username:'',
        mobile:''
    }
    page.value = {...pageInit}
    getList()
}
onMounted(() => {
    getList()
})


</script>
<style lang="scss" scoped>
.add_box {
    margin-bottom: 10px;
}
</style>
