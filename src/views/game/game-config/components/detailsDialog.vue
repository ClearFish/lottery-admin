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
                <el-form-item :label="$t('game.gameConfigDialog.gameIcon') + ':'" prop="icon">
                   <Avatar ref="avatarRef" @update:avatar="updateAvatarUrl" />
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
import { getGameConfigDetail,updateGameConfig } from "@/api/game/index.js"
import Avatar from "@/components/avatar/index.vue"



const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const avatarRef = ref(null)

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
        let res = await getGameConfigDetail({id:row.id})
        if(res.code === 200){
            detailsInfo.value = res.data;
            visible.value = true
            nextTick(() => {
                avatarRef.value.setAvatar(detailsInfo.value.icon)
            })
            
        }
    }
  
}
const emit = defineEmits(['close'])
const updateAvatarUrl = (url) => {
    detailsInfo.value.icon = url
}
const handleSubmit = async () => {
    await formRef.value.validate()
     let res = await updateGameConfig(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('game.editSuccess'))
            handleClose()
        }
}

/** 关闭弹窗 */
function handleClose() {
    visible.value = false;
    detailsInfo.value = {};
    actionType.value = null;
    avatarRef.value.setAvatar('')
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
