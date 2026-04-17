<template>
    <div>
        {{ $t('agent.actionlog.title') }}
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getActionLogList } from '@/api/agent'
const actionLogList = ref([])
</script>
