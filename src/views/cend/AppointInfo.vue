<template>
  <div class = "content-container">
    <van-empty v-if="this.appointedCourse.length === 0 && userInfo.type === 0"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="您还没有约课"
    />

    <van-cell v-if="userInfo.type === 1" :title="'您本月的上课数为' + userInfo.totalCourse"  size="large" />

    <van-swipe-cell v-for="item in appointedCourse" :key = "item.id">
      <van-card
        price="  "  currency=" "
        :desc="item.attendTime + ' - ' + item.finishTime + ' ' + item.date +  ' ' + item.weekday"
        :title="item.akaName + ' ' + item.courseName"
        thumb="http://101.133.146.88/lisaPic/1.jpeg"
      >
        <template #tags>
          <van-tag v-if="item.appointState === 1" plain type="primary"> 已约</van-tag>
          <van-tag v-if="item.appointState === 2" plain type="warning"> 候补</van-tag>
          <van-tag  plain type="warning"> {{item.cardName}}</van-tag>
        </template>
        <template #num>
          <van-button  plain text="取消预约" type="danger"   @click="cancelAppoint(item.cardId, item.scheduleId)"/>
        </template>
      </van-card>
<!--      <template #right>-->
<!--        <van-button square text="取消预约" type="danger" class="delete-button" @click="cancelAppoint(item.cardId, item.scheduleId)"/>-->
<!--      </template>-->
    </van-swipe-cell>

    <van-button type="danger" @click="logout" style="width: 100%">退出账号</van-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Tabbar, TabbarItem, Lazyload, Notify, Toast } from 'vant'
import Vue from 'vue'
import 'vant/lib/button/style'
import moment from 'moment'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Lazyload)
Vue.use(Notify)

export default {
  name: 'Classroom',
  components: {},
  data () {
    return {
      userInfo: {},
      appointedCourse: []
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['GetClassroomPage', 'UpdateClassroomEnableStateById', 'GetCustomerAppointedInfo', 'CancelAppoint']),
    stateMapper (state) {
      if (state === 1) {
        return '已约'
      }
      if (state === 2) {
        return '候补'
      }
    },
    logout () {
      localStorage.clear()
      this.$router.push('/clogin')
    },
    cancelAppoint (cardId, scheduleId) {
      var cancelForm = {}
      cancelForm.customerId = this.userInfo.id
      cancelForm.cardId = cardId
      cancelForm.scheduleId = scheduleId
      cancelForm.endType = 1
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '取消预约中'
      })
      this.CancelAppoint(cancelForm).then(res => {
        this.search()
        Toast.clear()
        Notify({
          message: '取消成功!!',
          color: '#ffffff',
          background: '#68bb69'
        })
        // this.dialogVisible = false
      }).catch(() => {
        Toast.clear()
      })
    },
    init () {
      this.search()
    },
    search () {
      if (this.userInfo.type === 1) {
        return
      }
      var id = this.userInfo.id
      const datelist = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      this.GetCustomerAppointedInfo(id).then(res => {
        console.log(res)
        this.appointedCourse = res
        this.appointedCourse.forEach(obj => {
          obj.attendTime = obj.attendTime.substr(0, 5)
          obj.finishTime = obj.finishTime.substr(0, 5)
          obj.weekday = datelist[moment(obj.date).day()]
        })
      }).catch(() => {
      })
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
      this.$router.push('/clogin')
      return
    }
    this.userInfo = JSON.parse(userInfo)
    this.init()
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

.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
</style>
