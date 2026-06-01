<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item :label="$t('systemManage.user.id') + ':'" prop="id">
                    <el-input v-model="queryParams.id" :placeholder="$t('common.place_enter') + ' ' + $t('systemManage.user.id')" />
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
            <el-table-column prop="id" :label="$t('systemManage.user.id')" align="center"  />
            <el-table-column prop="Category" :label="$t('systemManage.attachment.category')" align="center"/>
            <el-table-column prop="Url" :label="$t('systemManage.attachment.preview')" align="center"  />
            <el-table-column prop="Filename" :label="$t('systemManage.attachment.filename')" align="center" width="200" />
            <el-table-column prop="Filesize" :label="$t('systemManage.attachment.filesize')" align="center" />
            <el-table-column prop="ImageHeight" :label="$t('systemManage.attachment.imageHeight')" align="center"  />
            <el-table-column prop="ImageWidth" :label="$t('systemManage.attachment.imageWidth')" align="center"  />
            <el-table-column prop="Mimetype" :label="$t('systemManage.attachment.mimetype')" align="center"  />
            <el-table-column prop="Storage" :label="$t('systemManage.attachment.storage')" align="center"  />
            <el-table-column prop="created_at" :label="$t('systemManage.attachment.createdAt')" align="center"  />
            <el-table-column prop="" :label="$t('systemManage.attachment.action')" align="center" min-width="120">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                    <el-button type="danger" @click="deleteRow(scope.row)">{{ $t('common.delete') }}</el-button>
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
        <details-dialog ref="detailsDialogRef" @close="getList" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import {$t} from "@/locales"
import { getAttachmentList } from '@/api/systemmanage'
import detailsDialog from './components/detailsDialog.vue'
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
  const res = await getAttachmentList({...queryParams.value,...page.value})
  if (res.code === 200) {
    dataList.value = res.data.items || []
    total.value = res.data.total
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
