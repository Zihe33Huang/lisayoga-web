<template>
  <el-container>
    <el-aside width="100px">
      <el-menu
        router
        @select="handleSelect"  >
        <el-menu-item v-for="item in navData"
                      :key="item.code"
                      :index="item.code" :route="item.path">{{item.name}}</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="padding: 10px 20px;">
      <i18nButton class="i18"></i18nButton>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>

import i18nButton from './i18nButton'
export default {
  name: 'Main',
  components: { i18nButton },
  data () {
    return {
      menuKey: 1,
      currentNavName: ''
    }
  },
  computed: {
    navData () {
      return [
        {
          code: '01',
          path: '/course-scheduling',
          name: this.$t('menu.Calendar')
        },
        {
          code: '02',
          path: '/course-scheduling-list',
          name: this.$t('menu.Schedule')
        },
        {
          code: '03',
          path: '/customer',
          name: this.$t('menu.Member')
        },
        {
          code: '04',
          path: '/course',
          name: this.$t('menu.Course')
        },
        {
          code: '05',
          path: '/teacher',
          name: this.$t('menu.Trainer')
        },
        {
          code: '06',
          path: '/report',
          name: this.$t('menu.Report')
        },
        {
          code: '07',
          path: '/classroom',
          name: this.$t('menu.Classroom')
        },
        {
          code: '08',
          path: '/config',
          name: this.$t('menu.Configure')
        }]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>

<style scoped>

.i18 {
  position: absolute;
  right: 30px;
  top: 40px;
}

</style>
