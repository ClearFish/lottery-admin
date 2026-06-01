<template>
    <div>
        <el-table :data="dataList" style="width: 100%" border >
            <el-table-column prop="id" :label="$t('systemManage.user.id')" align="center">
                <template #header>
                    <div class="sort_box">
                        <p>{{ $t('systemManage.user.id') }}</p>
                        <div class="icon_box">
                            <el-icon @click="sort('id','ASC')" :color="queryParams.sort == 'id' && queryParams.order == 'ASC' ? '#409EFF' : ''"><CaretTop /></el-icon>
                            <el-icon @click="sort('id','DESC')" :color="queryParams.sort == 'id' && queryParams.order == 'DESC' ? '#409EFF' : ''"><CaretBottom /></el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="username" :label="$t('systemManage.user.username')" align="center"  />
            <el-table-column prop="browser" :label="$t('rule.log.browser')" align="center" width="200" />
            <el-table-column prop="client_ip" :label="$t('rule.log.ip')" align="center" />
            <el-table-column prop="url" :label="$t('rule.log.url')" align="center"  />
            <el-table-column prop="created_at" :label="$t('systemManage.user.createdAt')" align="center"  />
            <el-table-column prop="" :label="$t('systemManage.user.action')" align="center" min-width="120">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
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
import { getLogList,deleteLog } from '@/api/systemmanage'
import detailsDialog from './components/detailsDialog.vue'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
const detailsDialogRef = ref(null)
const dataList = ref([])

const pageInit = {
    pageSize:20,
    page:1
}
const queryParams = ref({
    sort:'id',
    order:'DESC'
})
const sort = (field,order) => {
    queryParams.value.sort = field
    queryParams.value.order = order
    getList()
}
const showDetails = (row) => {
    console.log(row)
    detailsDialogRef.value.show(0,row)
}

const deleteRow = async (row) => {
    ElMessageBox.confirm($t('common.delete_confirm'), $t('common.logout_title'), {
        confirmButtonText: $t('common.confirm'),
        cancelButtonText: $t('common.cancel'),
        type: 'warning'
    }).then(async () => {
        let res = await deleteLog({id:row.id});
        if(res.code == 200) {
            ElMessage.success($t('common.delete_success'))
            getList()
        }
    }).catch(() => { })
}
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getLogList({...queryParams.value,...page.value})
  if (res.code === 200) {
    dataList.value = res.data.items
    total.value = res.data.total
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
.sort_box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    .icon_box {
        display: flex;
        flex-direction: column;
        .el-icon {
            font-size: 12px;
            cursor: pointer;
        }
    }
}
</style>
