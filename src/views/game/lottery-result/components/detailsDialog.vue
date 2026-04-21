<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('game.lotteryResultDialog.gameCode')+':'" prop="game_code">
                     <el-select v-model="detailsInfo.game_code" :placeholder="$t('common.place_select') + $t('game.lotteryResultDialog.gameCode')" @change="gameCodeChange">
                        <el-option v-for="item in gameList" :key="item" :label="item" :value="item" />
                     </el-select>
                </el-form-item>
                <el-form-item  :label="$t('game.lotteryResultDialog.issueNo')+':'" prop="issue_no">
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
                 <el-form-item :label="$t('game.lotteryResultDialog.nextIssueNo')+':'" prop="next_issue_no">
                    <el-input disabled v-model="detailsInfo.next_issue_no" :placeholder="$t('common.place_enter') + $t('game.lotteryResultDialog.nextIssueNo')" />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.startTime')+':'" prop="start_time">
                     <el-date-picker 
                        v-model="detailsInfo.start_time" 
                        type="datetime" 
                        value-format="YYYY-MM-DD HH:mm:ss" 
                        :placeholder="$t('common.place_select') + $t('game.lotteryResultDialog.startTime')" 
                    />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.endTime')+':'" prop="end_time">
                     <el-date-picker 
                        v-model="detailsInfo.end_time" 
                        type="datetime" 
                        value-format="YYYY-MM-DD HH:mm:ss" 
                        :placeholder="$t('common.place_select') + $t('game.lotteryResultDialog.endTime')" 
                    />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.drawTime')+':'" prop="draw_time">
                     <el-date-picker 
                        v-model="detailsInfo.draw_time" 
                        type="datetime" 
                        value-format="YYYY-MM-DD HH:mm:ss" 
                        :placeholder="$t('common.place_select') + $t('game.lotteryResultDialog.drawTime')" 
                    />
                </el-form-item>
                <el-form-item :label="$t('game.lotteryResultDialog.result')+':'" prop="result">
                    <!-- wingo -->
                     <div class="result_box" v-if="wingoGameCode.includes(detailsInfo.game_code)">
                        <el-tooltip placement="top" effect="light" @show="showTooltip(0)" trigger="click">
                             <template #content>
                                 <div class="seletc_img">
                                    <img v-for="(item,index) in new Array(9)" 
                                         :key="item" 
                                         :src="getResultAssetsImg('number_'+index)" 
                                         alt=""
                                         @click="choseResult(index)"
                                     >
                                </div>
                             </template>
                            <div class="result_img_box">
                                <img :src="getResultAssetsImg('number_'+detailsInfo.result[0])" alt="" 
                                    v-if="detailsInfo.result[0] !=null || 
                                    detailsInfo.result[0] !='' ||
                                    detailsInfo.result[0] !=undefined"
                                >
                            </div>
                        </el-tooltip>
                     </div>
                    <!-- 5d -->
                     <template v-if="lotre5DGameCode.includes(detailsInfo.game_code)">
                         <div  class="result_img_box result_box" v-for="(item,index) in new Array(5)" :key="index">
                             <el-tooltip placement="top" effect="light" @show="showTooltip(index)" trigger="click">
                                <template #content>
                                    <div class="seletc_img">
                                        <p class="result_con" @click="choseResult(inx)" v-for="(ite,inx) in new Array(9)" :key="inx">{{inx}}</p>
                                    </div>
                                </template>
                                <div class="content">
                                    <p class="result_con" 
                                        v-if="detailsInfo.result[index] !=null &&
                                        detailsInfo.result[index] != undefined"
                                    >{{ detailsInfo.result[index]}}</p>
                                </div>
                            </el-tooltip>
                         </div>
                     </template>
                    <!-- k3-->
                     <template v-if="k3GameCode.includes(detailsInfo.game_code)">
                            <div  class="result_box" v-for="(item,index) in new Array(3)" :key="index">
                             <el-tooltip placement="top" effect="light" @show="showTooltip(index)" trigger="click">
                                <template #content>
                                    <div class="seletc_img">
                                         <img v-for="(ite,inx) in new Array(6)" 
                                         :key="ite" 
                                         :src="getResultAssetsImg('dice_show'+(inx+1))" 
                                         alt=""
                                         @click="choseResult(inx+1)"
                                     >
                                    </div>
                                </template>
                                 <div class="result_img_box">
                                    <img :src="getResultAssetsImg('dice_show'+detailsInfo.result[index])" alt="" 
                                            v-if="
                                            detailsInfo.result[index] !=null && 
                                            detailsInfo.result[index] !='' && 
                                            detailsInfo.result[index] !=undefined"
                                    >
                                </div>
                            </el-tooltip>
                         </div>
                     </template>
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
                 <el-tooltip
                    class="box-item"
                    effect="dark"
                    placement="top"
                    v-for="item in renderList"
                    :key="item"
                >
                     <template #content>
                        <p>期数：{{ item }}</p>
                        <p>时间：{{ detailsInfo.dateNow}} {{ getTime(item) }}</p>
                    </template>
                    <p :class="{'active':item === dayNow}" @click="choseDay(item)">{{ item }}</p>
                </el-tooltip>
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
    detailsInfo.value.result = []
}
const resultClickIndex = ref(0)
const showTooltip = (index)=>{
    console.log(index,"2")
    resultClickIndex.value = index
}
const choseResult = (index)=>{
    detailsInfo.value.result[resultClickIndex.value] = index
    console.log(detailsInfo.value.result)
}
const showIssueDialog = ()=>{
    if(!issueList.value){
        proxy.$modal.msgError($t('common.place_select')+$t('game.lotteryResultDialog.issueNo'))
        return
    }else if(!detailsInfo.value.dateNow){
        proxy.$modal.msgError($t('common.place_select')+$t('common.date'))
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
const getTime = (item) =>{
    let minAll = (item-1)*minetsType.value;
    let hour = Math.floor(minAll/60)
    let min = minAll%60
    let hourTxt = hour.toString().padStart(2,'0')
    let minTxt = min.toString().padStart(2,'0')
    return hourTxt+':'+minTxt+':'+'00'
}
const choseDay = (val)=>{
    dayNow.value = val
    console.log(detailsInfo.value.dateNow)
    let dateString = dayjs(detailsInfo.value.dateNow).format('YYYYMMDD');
    let issueStr = val.toString().padStart(4,'0')
    detailsInfo.value.issue_no = dateString+issueStr
    detailsInfo.value.next_issue_no = dateString+Number(val+1).toString().padStart(4,'0')
    detailsInfo.value.start_time = detailsInfo.value.dateNow+' '+getTime(val)
    detailsInfo.value.end_time = detailsInfo.value.dateNow+' '+getTime(val+1)
    detailsInfo.value.draw_time = dayjs(detailsInfo.value.end_time).subtract(5,'second').format('YYYY-MM-DD HH:mm:ss')
    issueVisible.value = false
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
    align-content: baseline;
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
.result_img_box {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    cursor: pointer;
    background: #F5F7FA;
    margin-right: 6px;
    img {
        width: 24px;
    }
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
.seletc_img {
    display: flex;
    gap: 4px;
    img {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .result_con {
        background: #050505;
        color: #fff;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 24px;
        cursor: pointer;
    }
}
</style>
