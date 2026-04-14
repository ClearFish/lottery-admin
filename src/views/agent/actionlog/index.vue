<template>
    <div>
        代理操作日志列表
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getActionLogList } from '@/api/agent'
const actionLogList = ref([])
</script>