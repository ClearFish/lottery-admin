<template>
    <div>附件</div>
</template>
<script setup>
import { ref } from 'vue'
import { getGeneralConfigKey } from '@/api/systemmanage'
const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})
const detailsInfo = ref({})
const getDetail = async () => {
    const res = await getGeneralConfigKey({
        key: props.item.name
    })
    if (res.code === 200) {
       detailsInfo.value = res.data
    }
}
onMounted(() => {
    console.log(props.item,'props.item')
    getDetail()
})
</script>
