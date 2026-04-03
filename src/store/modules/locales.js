
import i18n from '@/locales'
export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: localStorage.getItem("language") || 'en-us'
  }),
  actions: {
    setLocale(locale) {
      this.locale = locale
      i18n.global.locale.value = locale;
      localStorage.setItem("language", locale);
    }
  }
})
export default useLocaleStore