import Vue from 'vue'
import VueI18n from 'vue-i18n'

//  Internationalized Processing
import locale from 'element-ui/lib/locale'
import elEn from 'element-ui/lib/locale/lang/en'
import elCn from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

// Bring in the files just created by locales and export them separately to the format needed by i18n
function loadLocaleMessages () {
  // Detect how many language families are in the locales folde
  const locales = require.context(
    '.',
    true,
    /.json$/
  )
  const messages = {}
  locales.keys().forEach(file => {
    const keyArr = file.split('/')
    keyArr.shift()
    keyArr.shift()
    messages[keyArr.join('.').replace(/\.json$/g, '')] = locales(file)
  })
  return {
    cn: {
      ...messages.cn,
      ...messages.cn_classroom,
      ...messages.cn_course,
      ...messages.cn_report,
      ...messages.cn_schedule,
      ...messages.cn_member,
      ...messages.cn_trainer,
      ...elCn
    },
    en: {
      ...messages.en,
      ...messages.en_member,
      ...messages.en_course,
      ...messages.en_trainer,
      ...messages.en_classroom,
      ...messages.en_schedule,
      ...messages.en_report,
      ...elEn
    }
  }
}
const i18n = new VueI18n({
  locale: 'en',
  messages: loadLocaleMessages()
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
