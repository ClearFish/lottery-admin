<template>
    <div>
        <!-- <el-table :data="dataList" style="width: 100%" border >
            <el-table-column prop="id" :label="$t('systemManage.config.id')" align="center"  />
            <el-table-column prop="name" :label="$t('systemManage.config.name')" align="center"/>
            <el-table-column prop="title" :label="$t('systemManage.config.title')" align="center"  />
            <el-table-column prop="group" :label="$t('systemManage.config.group')" align="center"  />
            <el-table-column prop="type" :label="$t('systemManage.config.type')" align="center"  />
            <el-table-column prop="value" :label="$t('systemManage.config.value')" align="center" />
            <el-table-column prop="rule" :label="$t('systemManage.config.rule')" align="center"/>
            <el-table-column prop="extend" :label="$t('systemManage.config.extend')" align="center"/>
            <el-table-column prop="tip" :label="$t('systemManage.config.tip')" align="center"/>
            <el-table-column :label="$t('systemManage.config.action')" align="center" min-width="100">
                <template #default="scope">
                    <el-button type="info" @click="showDetails(scope.row)">{{ $t('common.detail') }}</el-button>
                    <el-button type="primary"  @click="editDetails(scope.row)">{{ $t('common.edit') }}</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <!-- <details-dialog ref="detailsDialogRef" @close="getList"/> -->
        <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
            <el-tab-pane :label="item.title" :name="item.name" v-for="(item,index) in dataList" :key="index">
                <component :is="components[item.name]" :item="item" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getGeneralConfig } from '@/api/systemmanage'
import { ElMessage,ElMessageBox } from 'element-plus'
import {$t} from "@/locales"
import Attachmentcategory from './components/attachmentcategory.vue'
import Beian from './components/beian.vue'
import Customerservice from './components/customerservice.vue'
import Gameurl from './components/gameurl.vue'
import Name from './components/name.vue'
const dataList = ref([])

async function getList() {
  const res = await getGeneralConfig()
  if (res.code === 200) {
    dataList.value = res.data
  }
}
const components = ref({
    'attachmentcategory': Attachmentcategory,
    'beian': Beian,
    'customer_service': Customerservice,
    'game_url': Gameurl,
    'name': Name
})
const activeTab = ref('attachmentcategory')
const handleTabClick = (tab, event)=>{
    console.log(tab.props.name,'222')
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
