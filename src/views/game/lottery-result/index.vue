<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item :label="$t('game.lotteryResult.searchGameCode') + ':'" prop="game_code">
                    <el-input v-model="queryParams.game_code" :placeholder="$t('common.place_enter') + ' '" />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResult.searchIssueNo') + ':'" prop="issue_no">
                    <el-input v-model="queryParams.issue_no" :placeholder="$t('common.place_enter') + ' '" />
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
            <el-table-column prop="id" :label="$t('agent.balance.id')" align="center"/>
            <el-table-column prop="issue_no" :label="$t('game.lotteryResult.issueNo')" align="center"  />
            <el-table-column prop="game_code" :label="$t('game.lotteryResult.gameIdentifier')" align="center"/>
            <el-table-column prop="result" :label="$t('game.lotteryResult.result')" align="center">
                <template #default="scope">
                    <span v-if="scope.row.status !== 'Settled'">{{ $t('game.common.empty') }}</span>
                    <div v-else class="result_box">
                        <!-- wingo -->
                         <img :src="getResultAssetsImg('number_'+scope.row.result[0])" alt="" 
                            v-if="wingoGameCode.includes(scope.row.game_code)"
                            class="result_img"
                        >
                        <!-- 5d -->
                         <div v-if="lotre5DGameCode.includes(scope.row.game_code)" class="result_img_box">
                            <p class="result_con" v-for="(item,index) in scope.row.result" :key="index">{{item}}</p>
                         </div>
                        <!-- k3-->
                         <div v-if="k3GameCode.includes(scope.row.game_code)" class="result_img_box">
                                <img :src="getResultAssetsImg('dice_show'+item)" alt="" v-for="(item,index) in scope.row.result" :key="index"
                                 class="result_img"
                            >
                         </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" :label="$t('game.lotteryResult.drawCloseTime')" align="center"/>
            <el-table-column prop="status" :label="$t('game.lotteryResult.status')" align="center"  />
            <el-table-column prop="" :label="$t('agent.balance.action')" align="center" min-width="100">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                    <el-button type="danger" @click="deleteDetails(scope.row)">{{ $t('common.delete') }}</el-button>
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
import { getLotteryResultList,deleteLotteryResult } from '@/api/game'
import { ElMessage,ElMessageBox } from 'element-plus'
import detailsDialog from './components/detailsDialog.vue'
import {$t} from "@/locales"
import { getResultAssetsImg } from "@/utils/utils.js"

const detailsDialogRef = ref(null)
const dataList = ref([])
const wingoGameCode = ['Color1m','Color3m','Color5m','Color10m']
const lotre5DGameCode = ['Lotre5D1m','Lotre5D3m','Lotre5D5m','Lotre5D10m']
const k3GameCode = ['K3Lotre1m','K3Lotre3m','K3Lotre5m','K3Lotre10m']
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
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getLotteryResultList(page.value)
  if (res.code === 200) {
    dataList.value = res.data
    total.value = res.meta.total
  }
}
const deleteDetails = async (row) => {
    ElMessageBox.confirm($t('common.delete_confirm'), $t('common.logout_title'), {
        confirmButtonText: $t('common.confirm'),
        cancelButtonText: $t('common.cancel'),
        type: 'warning'
    }).then(async () => {
        let res = await deleteOddsConfig({id:row.id});
        if(res.code == 200) {
            ElMessage.success($t('common.delete_success'))
            getList()
        }
    }).catch(() => { })
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
.result_box {
    .result_img {
        width: 24px;
    }
    .result_img_box {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        .result_con {
            background: #050505;
            color: #fff;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 24px;
        }
    }
}
</style>
