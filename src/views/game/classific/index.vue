<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item label="游戏code:" prop="game_code">
                    <el-input v-model="queryParams.game_code" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item label="玩法code:" prop="play_type_code">
                    <el-input v-model="queryParams.play_type_code" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item label="玩法名称:" prop="play_type_name">
                    <el-input v-model="queryParams.play_type_name" :placeholder="$t('common.place_enter') + ' '" />
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
        <el-table :data="dataList" style="width: 100%" border :preserve-expanded-content="preserveExpanded">
            <el-table-column type="expand">
                <template #default="props">
                    <div style="padding:0 10px">
                        <el-table :data="props.row.plays" border>
                            <el-table-column label="id" prop="id" />
                            <el-table-column label="游戏Code" prop="game_code" />
                            <el-table-column label="玩法Code" prop="play_code" />
                            <el-table-column label="玩法名称" prop="play_name" />
                            <el-table-column label="玩法类型Code" prop="play_type_code" />
                            <el-table-column label="返点比例" prop="return_point_ratio" />
                            <el-table-column label="单期限制" prop="single_issue_limit" />
                            <el-table-column label="最大限制金额" prop="single_max_limit" />
                            <el-table-column label="最小限制金额" prop="single_min_limit" />
                            <el-table-column label="状态" prop="status" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="id" :label="$t('agent.balance.id')" align="center"/>
            <el-table-column prop="game_code" label="游戏Code" align="center"/>
            <el-table-column prop="play_type_code" label="玩法Code" align="center"/>
            <el-table-column prop="play_type_name" label="玩法名称" align="center"/>
            <el-table-column prop="status" :label="$t('agent.user.status')" align="center">
                <template #default="scope">
                     <el-switch
                        v-model="scope.row.status"
                        active-value="enable"
                        inactive-value="disable"
                        size="small"
                        disabled
                    />
                </template>
            </el-table-column>
            <el-table-column prop="type_mode" label="玩法模式" align="center">
                <template #default="scope">
                   <el-switch
                        v-model="scope.row.type_mode"
                        active-value="normal"
                        inactive-value="unnormal"
                        size="small"
                        disabled
                    />
                </template>
            </el-table-column>
            <el-table-column prop="weigh" :label="$t('game.gameConfig.weight')" align="center"  />
            <el-table-column prop="" :label="$t('agent.balance.action')" align="center" min-width="100">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <details-dialog ref="detailsDialogRef" @close="getList"/>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getClassificList } from '@/api/game'
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
    detailsDialogRef.value.show(0,row)
}
const editDetails = (row) => {
    detailsDialogRef.value.show(1,row)
}
const handleDelete = (row) => {
    ElMessageBox.confirm($t('common.delete_confirm'), $t('common.logout_title'), {
        confirmButtonText: $t('common.confirm'),
        cancelButtonText: $t('common.cancel'),
        type: 'warning'
    }).then(async () => {
        let res = await deleteClassific({id:row.id});
        if(res.code == 200) {
            ElMessage.success($t('common.delete_success'))
            getList()
        }
    }).catch(() => { })
}
const preserveExpanded = ref(true)
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getClassificList(page.value)
  if (res.code === 200) {
    dataList.value = res.data
    // total.value = res.meta.total
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
