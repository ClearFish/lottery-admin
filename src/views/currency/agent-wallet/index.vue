<template>
    <div>
        <div class="add_box">
            <el-button type="primary" @click="addDetails">{{ $t('common.add') }}</el-button>
        </div>
        <el-table :data="dataList" style="width: 100%" border >
            <el-table-column prop="id" :label="$t('agent.balance.id')" align="center">
                <template #header>
                    <div class="sort_box">
                        <p>{{ $t('agent.balance.id') }}</p>
                        <div class="icon_box">
                            <el-icon @click="sort('id','ASC')" :color="queryParams.sort == 'id' && queryParams.order == 'ASC' ? '#409EFF' : ''"><CaretTop /></el-icon>
                            <el-icon @click="sort('id','DESC')" :color="queryParams.sort == 'id' && queryParams.order == 'DESC' ? '#409EFF' : ''"><CaretBottom /></el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="username" :label="$t('agent.user.name')" align="center"/>
            <el-table-column prop="currency_code" :label="$t('agent.balance.currency')" align="center"  />
            <el-table-column prop="created_at" :label="$t('agent.balance.createdTime')" align="center"  />
            <el-table-column prop="updated_at" :label="$t('agent.balance.updatedTime')" align="center"  />
            <el-table-column prop="" :label="$t('agent.balance.action')" align="center" min-width="100">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
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
import { getAgentWalletList } from '@/api/agent'
import { ElMessage,ElMessageBox } from 'element-plus'
import detailsDialog from './components/detailsDialog.vue'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
import {$t} from "@/locales"
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
const editDetails = (row) => {
    detailsDialogRef.value.show(1,row)
}
const addDetails = () => {
    detailsDialogRef.value.show(2)
}
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getAgentWalletList({
    ...page.value,
    ...queryParams.value
  })
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
