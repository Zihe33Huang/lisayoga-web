<template>
  <div>
    <van-nav-bar class="header"
                 title="LisaYoga五角场店"
    />
    <router-view/>
    <div class="footer">
      <van-tabbar class = "tab-bar-container" v-model="active" :fixed="true" >
        <van-tabbar-item to="/home" icon="home-o">须知</van-tabbar-item>
        <van-tabbar-item to="/appoint" icon="search">约课</van-tabbar-item>
        <van-tabbar-item to = "/appointedInfo" icon="friends-o">已约</van-tabbar-item>
<!--        <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>-->
      </van-tabbar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CMain',
  components: {
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.content-container{
  padding-bottom:45px;
}
.tab-bar-container{
  position:fixed;
  bottom:0;
  height:45px;
  z-index:999;
}
</style>
