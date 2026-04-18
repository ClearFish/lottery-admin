<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('game.gameConfigDialog.gameName') + ':'" prop="game_name">
                    <el-input v-model="detailsInfo.game_name" :placeholder="$t('common.place_enter') + $t('game.gameConfigDialog.gameName')" />
                </el-form-item>
                <el-form-item :label="$t('game.gameConfigDialog.gameCode') + ':'" prop="game_code">
                    <el-input v-model="detailsInfo.game_code" :placeholder="$t('common.place_enter') + $t('game.gameConfigDialog.gameCode')" />
                </el-form-item>
                <el-form-item :label="$t('game.gameConfigDialog.gameStatus') + ':'" prop="status">
                    <el-switch 
                        v-model="detailsInfo.status" 
                        active-value="enable" 
                        inactive-value="disabled" 
                        :active-text="$t('agent.user.normal')"
                        :inactive-text="$t('agent.user.disabled')" />
                </el-form-item>
                 <el-form-item :label="$t('game.gameConfigDialog.betStatus') + ':'" prop="bet_status">
                    <el-switch 
                        v-model="detailsInfo.bet_status" 
                        active-value="enable" 
                        inactive-value="disabled" 
                        :active-text="$t('agent.user.normal')" 
                        :inactive-text="$t('agent.user.disabled')" />
                </el-form-item>
                 <el-form-item :label="$t('game.gameConfigDialog.drawStatus') + ':'" prop="draw_mode">
                    <el-switch 
                        v-model="detailsInfo.draw_mode" 
                        active-value="auto" 
                        inactive-value="custom" 
                        :active-text="$t('agent.user.normal')" 
                        :inactive-text="$t('agent.user.disabled')" />
                </el-form-item>
           </el-form>
        </div>
         <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">{{ $t('agent.dialog.submit') }}</el-button>
                <el-button type="default"  @click="handleClose">{{ $t('agent.dialog.close') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import { getClassificDetail,addClassific,updateClassific } from "@/api/game/index.js"
import Avatar from "@/components/avatar/index.vue"



const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)

const show = async(type,row) => {
    console.log(type,row)
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit')
    }
    isCheck.value = type === 0
    actionType.value = type
    title.value = num[type]
    if(type === 2) {
        detailsInfo.value = {}
        visible.value = true
    }else {
        let res = await getClassificDetail({id:row.id})
        if(res.code === 200){
            detailsInfo.value = res.data;
            visible.value = true
            
        }
    }
  
}
const emit = defineEmits(['close'])
const handleSubmit = async () => {
    await formRef.value.validate()
    detailsInfo.value.group_ids =[1]
    if (actionType.value === 2) {
        // 新增
        let res = await addClassific(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('agent.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateClassific(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('agent.editSuccess'))
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
</style>
