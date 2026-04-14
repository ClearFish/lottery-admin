<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-position="left" >
                <el-form-item label="id:" prop="id">
                    <el-input v-model="queryParams.id" :placeholder="$t('common.place_enter') + ' ' + $t('agent.id')" />
                </el-form-item>
                <el-form-item label="username:" prop="username">
                    <el-input v-model="queryParams.username" :placeholder="$t('common.place_enter') + ' ' + $t('agent.id')" />
                </el-form-item>
                <el-form-item label="email:" prop="email">
                    <el-input v-model="queryParams.email" :placeholder="$t('common.place_enter') + ' ' + $t('agent.id')" />
                </el-form-item>
                <el-form-item label="phone:" prop="phone">
                    <el-input v-model="queryParams.phone" :placeholder="$t('common.place_enter') + ' ' + $t('agent.id')" />
                </el-form-item>
                <el-form-item label="status:" prop="status">
                    <el-select v-model="queryParams.status" :placeholder="$t('common.place_select') + ' ' + $t('agent.id')">
                        <el-option label="normol" value="1" />
                        <el-option label="disabled" value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item label="create time:" prop="created_at">
                    <el-date-picker 
                        v-model="queryParams.created_at" 
                        type="daterange" 
                        value-format="yyyy-MM-dd" 
                        :range-separator="$t('common.to')" 
                        :start-placeholder="$t('common.start_date')" 
                        :end-placeholder="$t('common.end_date')" 
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="resetForm">{{ $t('common.reset') }}</el-button>
                    <el-button type="primary" @click="getList">{{ $t('common.search') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList" style="width: 100%" border >
            <el-table-column prop="id" label="id" align="center"  />
            <el-table-column prop="name" label="name" align="center">
                <template #default="scope">
                    {{ scope.row.first_name +' '+ scope.row.last_name }}
                </template>
            </el-table-column>
            <el-table-column prop="username" label="username" align="center"  />
            <el-table-column prop="email" label="email" align="center"  />
            <el-table-column prop="created_at" label="created time" align="center"  />
            <el-table-column prop="phone" label="phone" align="center"  />
            <el-table-column prop="area_code" label="area_code" align="center"  />
            <el-table-column prop="status" label="status" align="center"  />
            <el-table-column prop="" label="action" align="center" min-width="150">
                <template #default="scope">
                    <el-button type="info">Detail</el-button>
                    <el-button type="primary">Edit</el-button>
                    <el-button type="danger" >Delete</el-button>
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
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/agent'
const dataList = ref([])

const pageInit = {
    pageSize:20,
    page:1
}
const queryParams = ref({
    username:'',
    mobile:''
})
const total = ref(0)
const page = ref({...pageInit})
async function getList() {
  const res = await getUserList(page.value)
  if (res.code === 200) {
    dataList.value = res.data
    total.value = res.meta.total
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