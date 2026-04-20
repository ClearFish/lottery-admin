<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('game.lotteryResultDialog.gameCode')" prop="game_code">
                     <el-select v-model="detailsInfo.game_code" :placeholder="$t('common.place_select') + $t('game.lotteryResultDialog.gameCode')" @change="gameCodeChange">
                        <el-option v-for="item in gameList" :key="item" :label="item" :value="item" />
                     </el-select>
                </el-form-item>
                <el-form-item  :label="$t('game.lotteryResultDialog.issueNo')" prop="issue_no">
                    <div class="issue_box">
                        <el-date-picker 
                            v-model="detailsInfo.dateNow" 
                            type="date" 
                            value-format="YYYY-MM-DD" 
                            :placeholder="$t('common.place_select') + $t('common.date')" 
                        />
                        <p class="issue_no" @click="showIssueDialog">{{ detailsInfo.issue_no }}</p>
                    </div>
                </el-form-item>
                 <el-form-item :label="$t('game.lotteryResultDialog.nextIssueNo')" prop="next_issue_no">
                    <el-input v-model="detailsInfo.next_issue_no" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.nextIssueNo')" />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.status')" prop="status">
                    <el-input v-model="detailsInfo.status" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.status')" />
                </el-form-item> 
                <el-form-item :label="$t('game.lotteryResultDialog.startTime')" prop="start_time">
                    <el-input v-model="detailsInfo.start_time" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.startTime')" />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.endTime')" prop="end_time">
                    <el-input v-model="detailsInfo.end_time" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.endTime')" />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.drawTime')" prop="draw_time">
                    <el-input v-model="detailsInfo.draw_time" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.drawTime')" />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.result')" prop="result">
                    <el-input v-model="detailsInfo.result" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.result')" />
                </el-form-item>
           </el-form>
        </div>
         <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">{{ $t('agent.dialog.submit') }}</el-button>
                <el-button type="default"  @click="handleClose">{{ $t('agent.dialog.close') }}</el-button>
            </div>
        </template>
        <el-dialog
            v-model="issueVisible"
            :title="$t('game.lotteryResultDialog.issueNo')"
            :width="800"
        >
            <div class="top_input">
                <el-input v-model="minIssueNo" clearable="true" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.issueNo')" @input="changeIssueNo"/>
            </div>
            <div class="btm_box">
                <p v-for="item in renderList" :key="item" :class="{'active':item === dayNow}" @click="choseDay(item)">{{ item }}</p>
            </div>
        </el-dialog>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import { getLotteryResultDetail,addLotteryResult,updateLotteryResult,getClassificList } from "@/api/game/index.js"
import { getResultAssetsImg } from "@/utils/utils.js"
import dayjs from "dayjs"

const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const gameList = ref([])
const wingoGameCode = ['Color1m','Color3m','Color5m','Color10m']
const lotre5DGameCode = ['Lotre5D1m','Lotre5D3m','Lotre5D5m','Lotre5D10m']
const k3GameCode = ['K3Lotre1m','K3Lotre3m','K3Lotre5m','K3Lotre10m']
const allDayMin = 24*60
const issueList = ref(null)
const renderList = ref()
const dayNow = ref(1)
const issueVisible = ref(false)
const minIssueNo = ref('')
const minetsType = ref()
const getGameList =  async()=>{
    gameList.value = [...wingoGameCode,...lotre5DGameCode,...k3GameCode]
}
const gameCodeChange = (val)=>{
    if(val.indexOf('1m') !== -1){
        issueList.value = Array.from(Array(allDayMin),(i,index)=>index+1)
        minetsType.value = 1
    }else if(val.indexOf('3m') !== -1){
        issueList.value = Array.from(Array(allDayMin/3),(i,index)=>index+1)
        minetsType.value = 3
    }else if(val.indexOf('5m') !== -1){
        issueList.value = Array.from(Array(allDayMin/5),(i,index)=>index+1)
        minetsType.value = 5
    }else if(val.indexOf('10m') !== -1){
        issueList.value = Array.from(Array(allDayMin/10),(i,index)=>index+1)
        minetsType.value = 10
    }
    renderList.value = issueList.value
    detailsInfo.value.issue_no = ''
    detailsInfo.value.next_issue_no = ''
    detailsInfo.value.status = ''
    detailsInfo.value.start_time = ''
    detailsInfo.value.end_time = ''
    detailsInfo.value.draw_time = ''
    detailsInfo.value.result = ''
}
const showIssueDialog = ()=>{
    if(!issueList.value){
        proxy.$modal.msgError($t('common.place_select')+$t('game.lotteryResultDialog.issueNo'))
        return
    }else {
        let hourNow = dayjs().hour();
        let minNow = dayjs().minute();
        let minutesCount = hourNow*60 + minNow;
        if(minetsType.value == 1) {
            dayNow.value = minutesCount + 1
        }else {
            dayNow.value = Math.ceil(minutesCount/minetsType.value)
        }
        console.log(hourNow,minNow,minutesCount)
        issueVisible.value = true
    }
}
const changeIssueNo = ()=>{
    if(minIssueNo.value){
        renderList.value = issueList.value.map(item => {
            return item.toString().indexOf(minIssueNo.value) !== -1 ? item : ''
        }).filter(item => item !== '')
    }else {
        renderList.value = issueList.value
    }
}
const choseDay = (val)=>{
    dayNow.value = val
}
const show = async(type,row) => {
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit'),
        2:$t('common.add')
    }
    isCheck.value = type === 0
    actionType.value = type
    title.value = num[type]
    detailsInfo.value.dateNow = dayjs().format('YYYY-MM-DD')
    getGameList()
    if(type === 2) {
        detailsInfo.value = {}
        visible.value = true
    }else {
        let res = await getLotteryResultDetail({id:row.id})
        if(res.code === 200){
            detailsInfo.value = res.data;
            visible.value = true
            
        }
    }
  
}
const emit = defineEmits(['close'])
const handleSubmit = async () => {
    await formRef.value.validate()
    if (actionType.value === 2) {
        // 新增
        let res = await addLotteryResult(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('game.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateLotteryResult(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('game.editSuccess'))
            handleClose()
        }
    }
}

/** 关闭弹窗 */
function handleClose() {
    visible.value = false;
    detailsInfo.value = {};
    actionType.value = null;
    emit('close')
}
defineExpose({
    show
})
</script>
<style scoped lang="scss">
.dialog-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
}
.issue_box {
    display: flex;
    gap: 6px;
    align-items: center;
    .issue_no {
        width: 200px;
        height: 32px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        padding: 0 10px;
        cursor: pointer;
        margin: 0;
        background: #F5F7FA;
    }
}
.btm_box {
    display: flex;
    flex-wrap: wrap;
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 10px;
    gap: 4px;
    p {
        width: 40px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        text-align: center;
        margin: 0;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        cursor: pointer;
        margin: 0;
    }
    .active {
        background: #409EFF;
        color: #fff;
    }
}
</style>
