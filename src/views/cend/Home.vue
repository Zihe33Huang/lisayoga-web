<template>
  <div class = "content-container">
    <div >
      <van-swipe :autoplay="3000">
        <van-swipe-item>
          <van-image
            width="100%"   fit="contain"

            height="230"
            src="http://101.133.146.88/lisaPic/p1.jpg"
          />
        </van-swipe-item>
        <van-swipe-item>
          <van-image
            width="100%"   fit="contain"

            height="230"
            src="http://101.133.146.88/lisaPic/p2.jpg"
          />
        </van-swipe-item>
        <van-swipe-item>
          <van-image
            width="100%"   fit="contain"

            height="230"
            src="http://101.133.146.88/lisaPic/p3.jpg"
          />
        </van-swipe-item>
      </van-swipe>

      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <van-image src="http://101.133.146.88/lisaPic/p4.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="http://101.133.146.88/lisaPic/p5.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="http://101.133.146.88/lisaPic/p8.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="http://101.133.146.88/lisaPic/p7.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="http://101.133.146.88/lisaPic/p6.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="http://101.133.146.88/lisaPic/p9.jpeg" />
        </van-grid-item>
      </van-grid>
      <van-divider />
      <van-collapse v-model="activeNames">
<!--        <van-collapse-item title="约课须知" name="1"><div>-->
<!--          <h2>【约课须知】</h2>-->
<!--          <p>1. 会员最多可预约6天内的课程，每天21:30:00开-->
<!--            放第6天的约课；最多可提前预约6节；</p>-->
<!--          <p>2. 如课程已约满，可候补预约；</p>-->
<!--          <p>3. 会员可在课程开始3小时前自主取消预约，累计-->
<!--            - 次“取消预约”；</p>-->
<!--          <p>4.《每月》累计4次“取消预约”，系统会扣除1次-->
<!--            卡内余额或减少3天有效时长（候补失败不计-->
<!--            入；</p>-->
<!--          <p>5. 课程开始3小时内如需取消，请联系“小助理”人-->
<!--            工取消，并累计一次“预约未到”；</p>-->
<!--          <p>6. 每累计2次“预约末到”，系统会扣除1次卡内余-->
<!--            额或减少3天有效时长，终身累计，不清零；</p>-->
<!--          <p>7. 如开课前3小时预约仍不足2人，该课将被取消.-->
<!--            已预约会员将被及时通知；</p>-->
<!--        </div></van-collapse-item>-->
        <van-collapse-item title="场馆地址" name="2">政益路28号五角丰达大厦28号楼301室</van-collapse-item>
        <van-collapse-item title="联系方式" name="3">              <van-button url="tel:13681823624">拨打电话</van-button>
        </van-collapse-item>
      </van-collapse>
    </div>
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

export default {
  name: 'Classroom',
  components: {},
  data () {
    return {
      activeNames: [],
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {
    ...mapActions(['GetClassroomPage', 'UpdateClassroomEnableStateById']),
    init () {
      this.params.enableState = 1
    },
    showPopup () {
      this.show = true
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
      this.$router.push('/clogin')
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
