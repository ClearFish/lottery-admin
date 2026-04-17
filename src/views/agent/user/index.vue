<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item :label="$t('agent.user.id') + ':'" prop="id">
                    <el-input v-model="queryParams.id" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item :label="$t('agent.user.username') + ':'" prop="username">
                    <el-input v-model="queryParams.username" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item :label="$t('agent.user.email') + ':'" prop="email">
                    <el-input v-model="queryParams.email" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item :label="$t('agent.user.phone') + ':'" prop="phone">
                    <el-input v-model="queryParams.phone" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item :label="$t('agent.user.status') + ':'" prop="status">
                    <el-select v-model="queryParams.status" :placeholder="$t('common.place_select') + ' '">
                        <el-option :label="$t('agent.user.normal')" value="1" />
                        <el-option :label="$t('agent.user.disabled')" value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('agent.user.createdTime') + ':'" prop="created_at">
                    <el-date-picker 
                        v-model="queryParams.created_at" 
                        type="daterange" 
                        value-format="yyyy-MM-dd" 
                        :range-separator="$t('common.to')" 
                        :start-placeholder="$t('common.start_date')" 
                        :end-placeholder="$t('common.end_date')" 
                    />
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
            <el-table-column prop="id" :label="$t('agent.user.id')" align="center"  />
            <el-table-column prop="name" :label="$t('agent.user.name')" align="center">
                <template #default="scope">
                    {{ scope.row.first_name +' '+ scope.row.last_name }}
                </template>
            </el-table-column>
            <el-table-column prop="username" :label="$t('agent.user.username')" align="center"  />
            <el-table-column prop="email" :label="$t('agent.user.email')" align="center"  />
            <el-table-column prop="created_at" :label="$t('agent.user.createdTime')" align="center"  />
            <el-table-column prop="phone" :label="$t('agent.user.phone')" align="center"  />
            <el-table-column prop="area_code" :label="$t('agent.user.areaCode')" align="center"  />
            <el-table-column prop="status" :label="$t('agent.user.status')" align="center"  />
            <el-table-column prop="" :label="$t('agent.user.action')" align="center" min-width="150">
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
import { getUserList,deleteUser } from '@/api/agent'
import { ElMessage,ElMessageBox } from 'element-plus'
import {$t} from "@/locales"
import detailsDialog from '@/views/agent/user/components/detailsDialog.vue'
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
        let res = await deleteUser({id:row.id});
        if(res.code == 200) {
            ElMessage.success($t('common.delete_success'))
            getList()
        }
    }).catch(() => { })
}
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getUserList(page.value)
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
