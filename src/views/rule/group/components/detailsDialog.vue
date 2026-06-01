<template>
    <el-dialog
        v-model="visible"
        :title="title"
        :width="1200"
        :before-close="handleClose"
    >
        <div>
           <el-form :model="detailsInfo" :disabled="isCheck" :rules="rules"  ref="formRef" label-width="120px">
                <el-form-item :label="$t('rule.groupDialog.parent') + ':'" prop="pid">
                    <el-select v-model="detailsInfo.pid" :placeholder="$t('common.place_select') + $t('rule.groupDialog.parent')">
                        <el-option 
                            v-for="item in dataLists" 
                            :key="item.id" 
                            :label="item.name" 
                            :value="item.id" 
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('rule.groupDialog.name') + ':'" prop="name">
                    <el-input v-model="detailsInfo.name" :placeholder="$t('common.place_enter') + $t('rule.groupDialog.name')" />
                </el-form-item>
                <div class="rule_content">
                    <p class="label">{{ $t('rule.groupDialog.permission') + ':' }}</p>
                    <div>
                        <div>
                            <el-checkbox-group v-model="checkList" @change="typesChange">
                                 <el-checkbox :label="$t('rule.groupDialog.checkAll')" value="1" />
                                 <el-checkbox :label="$t('rule.groupDialog.expandAll')" value="2" />
                             </el-checkbox-group>
                        </div>
                        <div>
                             <el-tree
                                    :data="permissionLists"
                                    :props="defaultProps"
                                     node-key="id"
                                     ref="treeRef"
                                     show-checkbox
                                     @check-change="handleCheckChange"
                                />
                        </div>
                    </div>
                </div>
                <el-form-item :label="$t('rule.groupDialog.status') + ':'" prop="status">
                    <el-radio-group v-model="detailsInfo.status">
                        <el-radio label="normal">{{ $t('rule.status.normal') }}</el-radio>
                        <el-radio label="disable">{{ $t('rule.status.disabled') }}</el-radio>
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
import { ref,defineExpose } from 'vue'
import {$t} from '@/locales'
import { addGroup,updateGroup,getGroupDetail,getAuterUser,getPermissionList } from "@/api/systemmanage/index.js"

const emit = defineEmits(['close'])
const { proxy } = getCurrentInstance()
const visible = ref(false)
const title = ref($t('common.detail'))
const detailsInfo = ref({
    pid:'',
    name:'',
    role_ids:[],
    status:'1'
})
const isCheck = ref(false)
const actionType = ref(null)
const formRef = ref(null)
const dataLists = ref([])
const checkList = ref([])
const permissionLists = ref([])
const treeRef = ref(null)
const defaultProps = {
    children: 'children',
    label: 'title'
}
/** 权限改变 */
const typesChange = (val) => {
    console.log(val,"2")
    const nodes = treeRef.value?.store?._getAllNodes()
    if(val.includes('1')) {
        if(nodes) {
            nodes.forEach(item => {
                item.checked = true
            })
        }
    }else {
        if(nodes) {
            nodes.forEach(item => {
                item.checked = false
            })
        }
    }
    if(val.includes('2')) {
        if(nodes) {
            nodes.forEach(item => {
                item.expanded = true
            })
        }
    }else {
        if(nodes) {
            nodes.forEach(item => {
                item.expanded = false
            })
        }
    }
}
const show = async(type,row,dataList) => {
    dataLists.value = dataList
    await getPermissionLists()
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
        let res = await getGroupDetail({id:row.id});
        if(res.code === 200) {
            detailsInfo.value = res.data || {}
            visible.value = true
        }
    }
}
const getPermissionLists = async () => {
    let res = await getPermissionList({})
    if(res.code === 200) {
        permissionLists.value = res.data || []
    }
}


const handleSubmit = async () => {
    const nodes = treeRef.value?.store?._getAllNodes();
    let arr = []
    if(nodes) {
        nodes.forEach(item => {
            if(item.checked) {
                arr.push(item.id)
            }
        })
    }
    detailsInfo.value.role_ids = arr
    await formRef.value.validate()
    if (actionType.value === 2) {
        // 新增
        console.log(detailsInfo.value)
        let res = await addGroup(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('systemManage.addSuccess'))
            handleClose()
        }
    }else {
        // 编辑
        let res = await updateGroup(detailsInfo.value)
        if (res.code === 200) {
            proxy.$modal.msgSuccess($t('systemManage.editSuccess'))
            handleClose()
        }
    }
}
defineExpose({
    show
})
/** 关闭弹窗 */
function handleClose() {
    detailsInfo.value = {};
    actionType.value = null;
    visible.value = false;
    emit('close')
}
</script>
<style scoped lang="scss">
.dialog-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
}
.rule_content {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    .label {
        width: 120px;
        text-align: right;
        padding-right: 12px;
    }
    :deep(.el-tree-node) {
        .el-tree-node__children {
            .el-tree-node {
                .el-tree-node__children {
                    display: flex;
                }
            }
        }
    }
}
.label {
    font-weight: bold;
}
</style>
