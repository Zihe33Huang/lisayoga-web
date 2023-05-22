<template>
  <div class = "content-container">
    {{userInfo}}
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Tabbar, TabbarItem, Lazyload, Notify } from 'vant'
import Vue from 'vue'
import 'vant/lib/button/style'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Lazyload)
Vue.use(Notify)

export default {
  name: 'Classroom',
  components: {},
  data () {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ],
      userInfo: {}
    }
  },
  methods: {
    ...mapActions(['GetClassroomPage', 'UpdateClassroomEnableStateById']),
    init () {
      this.params.enableState = 1
    },
    handleOnSelect (date) {
      console.log(date)
      this.show = true
    }
  },
  mounted () {
    var userInfo = localStorage.getItem('userInfo')
    console.log(userInfo)
    if (userInfo === null) {
      Notify({
        message: '请先登录!',
        color: '#ad0000',
        background: '#ffe1e1'
      })
      this.$router.push('/login')
      return
    }
    this.userInfo = userInfo
    this.userInfo = JSON.parse(userInfo)
  }
}
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
