<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('rule.permissionDialog.parentMenu')" v-if="detailsInfo.type != 'catalog'">
                     <el-tree-select
                        v-model="detailsInfo.id"
                        :data="typesLists"
                        :props="{ 
                            label: 'title', 
                            value: 'id', 
                            children: 'children' 
                        }"
                        value-key="id"
                        :placeholder="$t('common.place_select') + $t('rule.permissionDialog.parentMenu')"
                        check-strictly
                     />
                  </el-form-item>
                  <el-form-item :label="$t('rule.permissionDialog.menuType')" prop="type">
                    <el-radio-group v-model="detailsInfo.type">
                        <el-radio label="catalog">{{ $t('rule.permissionDialog.type.catalog') }}</el-radio>
                        <el-radio label="menu">{{ $t('rule.permissionDialog.type.menu') }}</el-radio>
                        <el-radio label="button">{{ $t('rule.permissionDialog.type.button') }}</el-radio>
                        <el-radio label="link">{{ $t('rule.permissionDialog.type.link') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="$t('rule.permissionDialog.menuName')" prop="title">
                     <el-input v-model="detailsInfo.title" :placeholder="$t('common.place_enter') + $t('rule.permissionDialog.menuName')" />
                  </el-form-item>
                  <el-form-item :label="$t('rule.permissionDialog.permission')" prop="permission">
                     <el-input v-model="detailsInfo.permission" :placeholder="$t('common.place_enter') + $t('rule.permissionDialog.permission')" />
                   </el-form-item>
                   <el-form-item :label="$t('rule.permissionDialog.route')" prop="route" v-if="detailsInfo.type != 'button'">
                     <el-input v-model="detailsInfo.route" :placeholder="$t('common.place_enter') + $t('rule.permissionDialog.route')" />
                   </el-form-item>
                   <template v-if="detailsInfo.type == 'menu'">
                     <el-form-item :label="$t('rule.permissionDialog.component')" prop="component">
                        <el-input v-model="detailsInfo.component" :placeholder="$t('common.place_enter') + $t('rule.permissionDialog.component')" />
                    </el-form-item>
                   </template>
                    <el-form-item :label="$t('rule.permissionDialog.status')" prop="status">
                        <el-radio-group v-model="detailsInfo.status">
                            <el-radio label="normal">{{ $t('rule.status.normal') }}</el-radio>
                            <el-radio label="disabled">{{ $t('rule.status.disabled') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('rule.permissionDialog.displayStatus')" prop="status" v-if="detailsInfo.type != 'button'">
                        <el-radio-group v-model="detailsInfo.hide_menu">
                            <el-radio :label="false">{{ $t('rule.permissionDialog.display.show') }}</el-radio>
                            <el-radio :label="true">{{ $t('rule.permissionDialog.display.hide') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
           </el-form>
        </div>
         <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
                <el-button type="default"  @click="handleClose">{{ $t('common.cancel') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref,defineExpose,nextTick } from 'vue'
import {$t} from '@/locales'
import { getPermissionDetail,updatePermission,addPermission } from "@/api/systemmanage/index.js"


const visible = ref(false)
const title = ref($t('common.detail'))
const { proxy } = getCurrentInstance()
const detailsInfo = ref({})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const typesLists = ref([])
const show = async(type,row,lists) => {
    console.log(type,row,lists,"222");
    typesLists.value = lists
    const num = {
        0:$t('common.detail'),
        1:$t('common.edit'),
        2:$t('common.add')
    }
    isCheck.value = type === 0
    actionType.value = type
    title.value = num[type]
    if(type === 2) {
        detailsInfo.value = {}
        visible.value = true
    }else {
        let res = await getPermissionDetail({id:row.id})
        if(res.code === 200){
            visible.value = true
            nextTick(() => {
                detailsInfo.value = res.data
            })
        }
    }
  
}
const emit = defineEmits(['close'])

const handleSubmit = async () => {
    await formRef.value.validate()
    if (actionType.value === 2) {
        // 新增
        let res = await addPermission(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('rule.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updatePermission(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('rule.editSuccess'))
            handleClose()
        }
    }
}

/** 关闭弹窗 */
function handleClose() {
    detailsInfo.value = {};
    actionType.value = null;
    visible.value = false;
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
