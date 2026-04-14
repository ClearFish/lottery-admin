<template>
    <div>
        <div class="form_box">
            <el-form :model="queryParams" inline ref="formRef" :rules="rules" label-width="100px">
                <el-form-item label="代理ID" prop="username">
                    <el-input v-model="queryParams.username" placeholder="请输入代理ID" />
                </el-form-item>
                <el-form-item label="上级ID" prop="mobile">
                    <el-input v-model="queryParams.mobile" placeholder="请输入上级ID" />
                </el-form-item>
                <el-form-item label="用户名" prop="email">
                    <el-input v-model="queryParams.email" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="所属组别" prop="groupId">
                    <el-input v-model="queryParams.groupId" placeholder="请输入所属组别" />
                </el-form-item>
                <el-form-item label="绑定会员ID" prop="memberId">
                    <el-input v-model="queryParams.memberId" placeholder="请输入绑定会员ID" />
                </el-form-item>
                <el-form-item label="im群ID" prop="imGroupId">
                    <el-input v-model="queryParams.imGroupId" placeholder="请输入im群ID" />
                </el-form-item>
                <el-form-item label="系统余额" prop="systemBalance">
                    <el-input v-model="queryParams.systemBalance" placeholder="请输入系统余额" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input v-model="queryParams.status" placeholder="请输入状态" />
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="resetForm">重置</el-button>
                    <el-button type="primary" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList" style="width: 100%" border >
            <el-table-column prop="username" label="代理ID" align="center"  />
            <el-table-column prop="mobile" label="上级ID" align="center"  />
            <el-table-column prop="email" label="用户名" align="center"  />
            <el-table-column prop="createTime" label="所属组别" align="center"  />
            <el-table-column prop="createTime" label="绑定会员ID" align="center"  />
            <el-table-column prop="createTime" label="im群ID" align="center"  />
            <el-table-column prop="createTime" label="系统余额" align="center"  />
            <el-table-column prop="createTime" label="状态" align="center"  />
            <el-table-column prop="createTime" label="最后登录" align="center"  />
            <el-table-column prop="createTime" label="操作" align="center">
                <template #default="scope">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">删除</el-button>
                    <el-button type="text">详情</el-button>
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