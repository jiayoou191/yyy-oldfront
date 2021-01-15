import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from '@/locales/zh'
import en from '@/locales/en'

Vue.use(VueI18n)

const locales = {
  zh,
  en,
}

const i18n = new VueI18n({
  locale: 'zh',
  messages: locales,
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem('localeLanguage')
    if (locales[lang] === undefined) {
      lang = 'zh'
    }
  }
  Vue.config.lang = lang
  i18n.locale = lang
}

setup()
export default i18n