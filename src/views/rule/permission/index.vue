<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item :label="$t('rule.permission.displayStatus') + ':'" prop="display_precision">
                    <el-select v-model="queryParams.display_precision" :placeholder="$t('common.place_select') + ' '">
                        <el-option :label="$t('rule.permission.show')" value="2" />
                        <el-option :label="$t('rule.permission.hide')" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('rule.permission.status') + ':'" prop="status">
                    <el-select v-model="queryParams.status" :placeholder="$t('common.place_select') + ' '">
                        <el-option :label="$t('rule.status.disabled')" value="1" />
                        <el-option :label="$t('rule.status.enabled')" value="0" />
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
import { getPermissionList } from '@/api/systemmanage'
import { getRouters } from '@/api/menu'

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
    display_precision:'',
    status:''
})
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
        let res = await deleteCurrencyConfig({id:row.id});
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

const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getPermissionList({...queryParams.value})
// const res = await getRouters()
dataList.value = res.data
  if (res.code === 200) {
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
