<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item label="游戏code:" prop="game_code">
                    <el-input v-model="queryParams.game_code" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <!-- <el-form-item label="玩法code:" prop="status">
                    <el-select v-model="queryParams.status" :placeholder="$t('common.place_select') + ' '">
                        <el-option :label="$t('agent.user.normal')" value="enable" />
                        <el-option :label="$t('agent.user.disabled')" value="disable" />
                    </el-select>
                </el-form-item> -->
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
        <el-table :data="dataList" style="width: 100%" border >
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
            <!-- <el-table-column prop="bet_status" :label="$t('game.gameConfig.betStatus')" align="center" >
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.bet_status"
                        active-value="enable"
                        inactive-value="disable"
                        size="small"
                        disabled
                    />
                </template>
            </el-table-column> -->
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
                </template>
            </el-table-column>
        </el-table>
        <!-- <pagination
            v-show="total > 0"
            :total="total"
            v-model:page="page.page"
            v-model:limit="page.pageSize"
            @pagination="getList"
        /> -->
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
    console.log(row)
    detailsDialogRef.value.show(0,row)
}
const editDetails = (row) => {
    detailsDialogRef.value.show(1,row)
}

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
