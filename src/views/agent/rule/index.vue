<template>
    <div>
        <div class="add_box">
            <el-button type="primary" @click="addDetails">{{ $t('common.add') }}</el-button>
        </div>
        <el-table 
            :data="dataList" 
            style="width: 100%" 
            border
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="id" :label="$t('rule.permission.id')" align="left"  />
            <el-table-column prop="title" :label="$t('rule.permission.title')" align="center"  />
            <el-table-column prop="permission" :label="$t('rule.permission.permission')" align="center"/>
            <el-table-column prop="route" :label="$t('rule.permission.route')" align="center"/>
             <el-table-column prop="type" :label="$t('rule.permission.typeLabel')" align="center">
            
             <template #default="scope">
                {{ getType(scope.row.type) }}
             </template>
             </el-table-column>
            <el-table-column prop="status" :label="$t('rule.permission.status')" align="center"  />
            <el-table-column prop="" :label="$t('rule.permission.action')" align="center" min-width="150">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                    <el-button type="danger"  @click="deleteRow(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <details-dialog ref="detailsDialogRef" @close="getList"/>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { deleteAgentAuthRule,getAgentAuthRuleList } from '@/api/agent'

import { ElMessage,ElMessageBox } from 'element-plus'
import detailsDialog from './components/detailsDialog.vue'
import {$t} from "@/locales"
const detailsDialogRef = ref(null)
const dataList = ref([])


const showDetails = (row) => {
    console.log(row)
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
        let res = await deleteAgentAuthRule({id:row.id});
        if(res.code == 200) {
            ElMessage.success($t('common.delete_success'))
            getList()
        }
    }).catch(() => { })
}
const getType = (type) => {
    if(type == 'catalog') {
        return $t('rule.permission.type.catalog')
    } else if(type == 'menu') {
        return $t('rule.permission.type.menu')
    } else if(type == 'button') {
        return $t('rule.permission.type.button')
    } else if(type == 'link') {
        return $t('rule.permission.type.link')
    }
}

async function getList() {
  const res = await getAgentAuthRuleList()
dataList.value = res.data
  if (res.code === 200) {
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
