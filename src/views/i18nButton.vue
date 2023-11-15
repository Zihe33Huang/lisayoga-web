<template>
    <div style="text-align: center" v-if="shouldShowElement">
      <el-dropdown trigger="click" @command="changeLanguage">
        <span class="el-dropdown-link">
          {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in selectedlanguageList" :key="index" :command="index" >
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      title: '简体中文',
      languageList_cn: [
        {
          value: 'ZH-CN',
          title: '简体中文'
        },
        {
          value: 'EN-US',
          title: '英语'
        }
      ],
      languageList_en: [
        {
          value: 'ZH-CN',
          title: 'Chinese'
        },
        {
          value: 'EN-US',
          title: 'English'
        }
      ],
      selectedlanguageList: [
        {
          value: 'ZH-CN',
          title: '简体中文'
        },
        {
          value: 'EN-US',
          title: '英语'
        }
      ]
    }
  },
  computed: {
    shouldShowElement () {
      // Replace this with your own logic to determine when to show the element
      return !(this.$route.path === '/course-scheduling')
    }
    // selectedLanguageList () {
    //   const item = localStorage.getItem('locale')
    //   if (item === 'en') {
    //     return this.languageList_en
    //   } else if (item === 'cn') {
    //     return this.languageList_cn
    //   }
    //   return null
    // }
  },
  created () {
    this.getLocaleText()
  },
  methods: {
    getLocaleText () {
      const locale = localStorage.getItem('locale')
      if (locale === 'en') {
        this.title = 'English'
        this.selectedlanguageList = this.languageList_en
      } else if (locale === 'cn') {
        this.title = '简体中文'
        this.selectedlanguageList = this.languageList_cn
      }
    },
    changeLanguage (index, event) {
      const language = this.selectedlanguageList[index]
      switch (language.value) {
        case 'EN-US':
          localStorage.setItem('locale', 'en')
          this.$i18n.locale = localStorage.getItem('locale')
          this.title = 'English'
          this.selectedlanguageList = this.languageList_en
          break
        case 'ZH-CN':
          localStorage.setItem('locale', 'cn')
          this.$i18n.locale = localStorage.getItem('locale')
          this.title = '中文'
          this.selectedlanguageList = this.languageList_cn
          break
      }
      this.$emit('refresh-data', event)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
