<template>
  <el-config-provider :locale="locales[useLocale.locale]">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import vi from "element-plus/es/locale/lang/vi"
import useLocaleStore from '@/store/modules/locales'

const useLocale = useLocaleStore()
const locales = {
  zh: zh,
  en: en,
  yuenan: vi
}
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>
