<template>
    <div style="text-align: center" v-if="shouldShowElement">
      <el-dropdown trigger="click" @command="changeLanguage">
        <span class="el-dropdown-link">
          {{ language.title }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in languageList" :key="index" :command="index" >
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
      language: {
        value: 'ZH-CN',
        title: '简体中文'
      },
      languageList: [
        {
          value: 'ZH-CN',
          title: '简体中文'
        },
        {
          value: 'EN-US',
          title: 'English'
        }
      ]
    }
  },
  computed: {
    shouldShowElement () {
      // Replace this with your own logic to determine when to show the element
      return !(this.$route.path === '/course-scheduling')
    }
  },
  methods: {
    changeLanguage (index, event) {
      this.language = this.languageList[index]
      switch (this.language.value) {
        case 'EN-US':
          this.$i18n.locale = 'en'
          this.language.title = 'English'
          this.languageList = [{
            value: 'ZH-CN',
            title: 'Chinese'
          },
          {
            value: 'EN-US',
            title: 'English'
          }]
          break
        case 'ZH-CN':
          this.$i18n.locale = 'cn'
          this.language.title = '简体中文'
          this.languageList = [{
            value: 'ZH-CN',
            title: '简体中文'
          },
          {
            value: 'EN-US',
            title: '英语'
          }]
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
