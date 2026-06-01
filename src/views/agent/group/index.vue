<template>
    <div>
        <div class="add_box">
            <el-button type="primary" @click="addDetails">{{ $t('common.add') }}</el-button>
        </div>
        <el-table :data="dataList" 
                style="width: 100%" 
                border 
                row-key="id" 
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="id" :label="$t('systemManage.user.id')" align="center"  />
            <el-table-column prop="pid" :label="$t('rule.group.parent')" align="center"/>
            <el-table-column prop="code" :label="$t('rule.group.code')" align="center"/>
            <el-table-column prop="name" :label="$t('rule.group.name')" align="center"/>
            <el-table-column prop="status" :label="$t('rule.group.status')" align="center"  />
            <el-table-column prop="" :label="$t('rule.group.action')" align="center" min-width="120">
                <template #default="scope">
                    <el-button type="info" v-if="scope.row.pid" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary" v-if="scope.row.pid"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                    <el-button type="danger" v-if="scope.row.pid" @click="deleteRow(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <details-dialog ref="detailsDialogRef" @close="getList" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import {$t} from "@/locales"
import { getGroupList } from '@/api/systemmanage'
import detailsDialog from './components/detailsDialog.vue'
const detailsDialogRef = ref(null)
const dataList = ref([])

const showDetails = (row) => {
    detailsDialogRef.value.show(0,row,dataList.value)
}
const editDetails = (row) => {
    detailsDialogRef.value.show(1,row,dataList.value)
}
const addDetails = () => {
    detailsDialogRef.value.show(2,{},dataList.value)
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
async function getList() {
  const res = await getGroupList()
  if (res.code === 200) {
    dataList.value = res.data
  }
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
