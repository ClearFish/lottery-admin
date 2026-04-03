import { createI18n } from "vue-i18n";
import messages from "./locales";

const defaultLanguage = import.meta.env.VITE_LOCALE || "en";
;

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLanguage(),
  fallbackLocale: defaultLanguage, // 当前语言翻译缺失时显示的语言
  messages
});

function getDefaultLanguage() {
  const locales = Object.keys(messages);
  const localLanguage = localStorage.getItem("language");
  console.log('localLanguage', localLanguage);  
  if (localLanguage && locales.includes(localLanguage)) return localLanguage;

  // 3. 从浏览器中取得默认语言
  const browserLanguage = navigator.language.toLowerCase();
  console.log('browserLanguage', browserLanguage);  
  if (locales.includes(browserLanguage)) return browserLanguage;
  console.log('locales', defaultLanguage);  
  // 4. 最后默认语言
  return defaultLanguage;
}
export function setLocale(locale) {
  i18n.global.locale.value = locale;
  
  localStorage.setItem("language", locale);
//   setToken("language", locale);
}

export default i18n;