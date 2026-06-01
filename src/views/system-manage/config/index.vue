<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item :label="$t('systemManage.config.id') + ':'" prop="id">
                    <el-input v-model="queryParams.id" :placeholder="$t('common.place_enter') + ' '" />
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
            <el-table-column prop="id" :label="$t('systemManage.config.id')" align="center"  />
            <el-table-column prop="name" :label="$t('systemManage.config.name')" align="center"/>
            <el-table-column prop="title" :label="$t('systemManage.config.title')" align="center"  />
            <el-table-column prop="group" :label="$t('systemManage.config.group')" align="center"  />
            <el-table-column prop="type" :label="$t('systemManage.config.type')" align="center"  />
            <el-table-column prop="value" :label="$t('systemManage.config.value')" align="center" />
            <el-table-column prop="rule" :label="$t('systemManage.config.rule')" align="center"/>
            <el-table-column prop="extend" :label="$t('systemManage.config.extend')" align="center"/>
            <el-table-column prop="tip" :label="$t('systemManage.config.tip')" align="center"/>
            <el-table-column :label="$t('systemManage.config.action')" align="center" min-width="100">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <details-dialog ref="detailsDialogRef" @close="getList"/>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getGeneralConfig } from '@/api/systemmanage'
import { ElMessage,ElMessageBox } from 'element-plus'
import detailsDialog from './components/detailsDialog.vue'
import {$t} from "@/locales"
const detailsDialogRef = ref(null)
const dataList = ref([])


const queryParams = ref({
    id:'',
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
async function getList() {
  const res = await getGeneralConfig({...queryParams.value})
  if (res.code === 200) {
    dataList.value = res.data
  }
}
const resetForm = () => {
    queryParams.value = {
        id:'',
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
