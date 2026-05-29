<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="800"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item label="上级菜单" v-if="detailsInfo.type != 'catalog'">
                     <el-tree-select
                        v-model="detailsInfo.id"
                        :data="typesLists"
                        :props="{ 
                            label: 'title', 
                            value: 'id', 
                            children: 'children' 
                        }"
                        value-key="id"
                        placeholder="选择上级菜单"
                        check-strictly
                     />
                  </el-form-item>
                  <el-form-item label="菜单类型" prop="type">
                    <el-radio-group v-model="detailsInfo.type">
                        <el-radio label="catalog">目录</el-radio>
                        <el-radio label="menu">菜单</el-radio>
                        <el-radio label="button">按妞</el-radio>
                        <el-radio label="link">外链</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="菜单名称" prop="title">
                     <el-input v-model="detailsInfo.title" placeholder="请输入菜单名称" />
                  </el-form-item>
                  <el-form-item label="权限标识" prop="permission">
                     <el-input v-model="detailsInfo.permission" placeholder="请输入权限标识" />
                   </el-form-item>
                   <el-form-item label="路由地址" prop="route" v-if="detailsInfo.type != 'button'">
                     <el-input v-model="detailsInfo.route" placeholder="请输入路由地址" />
                   </el-form-item>
                   <template v-if="detailsInfo.type == 'menu'">
                     <el-form-item label="组件路径" prop="component">
                        <el-input v-model="detailsInfo.component" placeholder="请输入组件路径" />
                    </el-form-item>
                   </template>
                    <el-form-item label="菜单状态" prop="status">
                        <el-radio-group v-model="detailsInfo.status">
                            <el-radio label="normal">正常</el-radio>
                            <el-radio label="disabled">停用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="显示状态" prop="status" v-if="detailsInfo.type != 'button'">
                        <el-radio-group v-model="detailsInfo.hide_menu">
                            <el-radio :label="false">显示</el-radio>
                            <el-radio :label="true">隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>
           </el-form>
        </div>
         <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" v-if="!isCheck" @click="handleSubmit">{{ $t('currency.dialog.submit') }}</el-button>
                <el-button type="default"  @click="handleClose">{{ $t('currency.dialog.close') }}</el-button>
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
            proxy.$modal.msgSuccess($t('currency.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updatePermission(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('currency.editSuccess'))
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
