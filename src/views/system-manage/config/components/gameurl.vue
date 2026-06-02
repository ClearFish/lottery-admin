<template>
    <div class="container">
        <div class="top_label">
            <p class="label">key值</p>
            <p class="label value">value值</p>
        </div>
        <div class="item">
            <div class="label">{{props.item.name}}</div>
            <div class="label value">
                <el-input v-model="detailsInfo" placeholder="请输入"></el-input>
            </div>
        </div>
        <div class="footer">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getGeneralConfigKey,updateGeneralConfigKey } from '@/api/systemmanage'
const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})
const detailsInfo = ref('')
const getDetail = async () => {
    const res = await getGeneralConfigKey({
        key: props.item.name
    })
    if (res.code === 200) {
       detailsInfo.value = res.data
    }
}
const save = async () => {
    if (!detailsInfo.value) {
        ElMessage.error('请输入value值')
        return
    }
    const res = await updateGeneralConfigKey({
        id: props.item.id,
        ...props.item,
        value: detailsInfo.value
    })
    if (res.code === 200) {
        ElMessage.success('更新成功')
    }
}
onMounted(() => {
    console.log(props.item,'props.item')
    getDetail()
})
</script>
<style lang="scss" scoped>
.top_label {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.label {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
}
.value {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
.footer {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
