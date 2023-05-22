<template>
  <div class = "container">
    <van-notice-bar scrollable text="点击日期，进入约课列表" />
    <div class="content-container">
      <van-calendar
      title="课程日期"
       @select = "handleOnSelect"
      :poppable="false"
      :show-title = "false"
      :show-subtitle = "false"
      :show-confirm="false"  :max-date="maxDate"
      :style="{ height: '500px' }"
      />

<!--      会员卡部分-->
      <div style="position:relative; top:-12vh">
      <van-notice-bar v-if="userInfo.type === 0" scrollable text="若您有多张卡，请先选择要使用的会员卡" />
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
      </van-divider>
      <van-coupon-cell v-if="userInfo.type === 0"
        :coupons="ableCards"
        :chosen-coupon="chosenCardIndex"
        @click="clickCard"
        title = "会员卡"
        currency = " "
      />
<!--        会员卡部分-->
        <van-card v-if="this.chosenCardIndex != -1"
          num="1"  :key = "this.key"
          :price="formatterPrice()"
          desc="" currency = " "
          :title="this.chosenCard.cardName"
          thumb="http://101.133.146.88/lisaPic/logo.jpg" tag="已选择"
        />
      <!-- 优惠券列表 -->
      <van-popup v-if="userInfo.type === 0"
        v-model="showCard"
        round
        position="top"
        style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
          :show-exchange-bar = "false"
          :coupons="ableCards"
          :chosen-coupon="chosenCardIndex"
          :disabled-coupons="disabledCards"
          close-button-text = "取消选择"
          @change="onChange"
          :show-close-button = "false"
        />
      </van-popup>
<!--教师端-->
        <van-popup v-if="userInfo.type === 1"
                   v-model="showCard"
                   round
                   position="top"
                   style="height: 90%; padding-top: 4px;"
        >
                    <div style="justify-content: space-around;  display: flex;">
                    <div><van-icon name="passed" color="#68bb69" size="15"/> <span style="font-size: 14px; margin-right: 3px">已约</span></div>
                      <div><van-icon name="question-o" color="#ee6602"  size="15"/> <span style="font-size: 14px">候补</span></div>
                      <div><van-icon name="close" color="#ad0000" size="15"/> <span style="font-size: 14px">取消</span></div>
                    </div>
          <div v-if="appointInfo.length !== 0">
          <div v-for="item in appointInfo" :key="item.id">
          <van-card
                    :title="item.name + ' ' + item.phoneNum"   :tag="item.customerType === 1 ? '体验':''"
                    thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
          >
            <template #tags>
                            <div v-if="item.state === 1">
                              <van-icon size="50px" name="passed" color="#68bb69"/>
                            </div>
                            <div v-else-if="item.state === 2">
                              <van-icon size="50px" name="question-o" color="#ee6602"/>
                            </div>
                            <div v-else-if="item.state === 3">
                              <van-icon size="50px" name="close" color="#ad0000"/>
                            </div>
            </template>
            <template #num>
              <van-button icon="phone-o" color="linear-gradient(to top, #9be15d 0%, #00e3ae 100%)" round  type="primary" :url="'tel:' + item.phoneNum">拨打电话</van-button>
              <van-button icon="contact" color="linear-gradient(to top, #9be15d 0%, #00e3ae 100%)" round  type="primary" @click="showDetailFunc(item)">查看详情</van-button>
            </template>
          </van-card>
            <van-popup v-model="showDetail" round closeable style="height: 80%; width: 100%">
              <div class="wrapper" @click.stop>
                <div class="block">
                  <van-form>
                    <van-field v-model="detail.attendNum" label="上课次数" readonly/>
                    <van-field label="是否接触过瑜伽" readonly v-if="item.customerType === 1">
                      <template #input>
                        <van-button v-if="detail.hasPracticed === 1" round type="primary">接触过瑜伽</van-button>
                        <van-button v-else-if="detail.hasPracticed === 0" round type="warning">未接触过瑜伽</van-button>
                      </template>
                    </van-field>
                    <van-field  label="是否受过伤" readonly v-if="item.customerType === 1">
                      <template #input>
                        <van-button v-if="detail.hasHurt === 1" round type="danger">受过伤</van-button>
                        <van-button v-else-if="detail.hasHurt === 0" round type="primary">未受过伤</van-button>
                      </template>
                    </van-field>
                    <van-field v-model="detail.aim" label="体验目的"  type="textarea" readonly v-if="item.customerType === 1"/>
                  </van-form>
                </div>
              </div>
            </van-popup>
          </div>
          </div>
          <div v-else>
            <van-empty description="无人约课"></van-empty>
          </div>
<!--          <div style="justify-content: space-around;  display: flex;">-->
<!--          <div><van-icon name="passed" color="#68bb69" size="15"/> <span style="font-size: 14px; margin-right: 3px">已约</span></div>-->
<!--            <div><van-icon name="question-o" color="#ee6602"  size="15"/> <span style="font-size: 14px">候补</span></div>-->
<!--            <div><van-icon name="close" color="#ad0000" size="15"/> <span style="font-size: 14px">取消</span></div>-->
<!--          </div>-->
<!--          <van-grid  icon-size="40" :column-num = "1">-->
<!--            <van-grid-item clickable :url="'tel:' + item.phoneNum" v-for="item in appointInfo"   :icon-size="'50px'" :key="item.id"  >-->
<!--              <template #icon v-if="item.state === 1">-->
<!--                <van-icon name="passed" color="#68bb69"/>-->
<!--              </template>-->
<!--              <template #icon v-else-if="item.state === 2">-->
<!--                <van-icon name="question-o" color="#ee6602"/>-->
<!--              </template>-->
<!--              <template #icon v-else-if="item.state === 3">-->
<!--                <van-icon name="close" color="#ad0000"/>-->
<!--              </template>-->
<!--              <template #text>-->
<!--                {{item.name}}  {{item.phoneNum}}-->
<!--              </template>-->
<!--            </van-grid-item>-->
<!--            <van-divider />-->
<!--          </van-grid>-->
        </van-popup>
    <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
      <div  v-for="item in courseList" :key = "item.id">
        <van-card style="" v-if="(userInfo.type === 0 && ((isPregnant === false) || (isPregnant === true && item.cardType.indexOf('10') === 1)))|| (userInfo.type === 1 && userInfo.akaName === item.akaName)"
          :desc="item.attendTime + ' - ' + item.finishTime" :currency="userInfo.type === 0 ? '￥': ''"
          :title="item.akaName + '老师 ' + item.courseName"          tag="热门"
          :thumb="item.pictureUrl"
        >
          <template #title>
            <div>
              {{item.courseName}}
              <van-button style="float: right" size="small" plain :text="userInfo.type === 0 ? '预约课程': '查看课程'" type="primary"   @click="lookOrAppoint(item.id)"/>
            </div>
            <div style="font-size: 13px">{{item.akaName + '老师'}}</div>
          </template>
          <template #desc>
            <div>
              <font>{{item.attendTime + ' - ' + item.finishTime}}</font>
              <van-button size="small" style="float: right;position: relative;top: -4px" plain text="课程介绍" type="primary"   @click="showDesc(item.description)"/>
            </div>
          </template>
          <template #price>
            <van-tag plain type="danger">已约人数: {{item.appointNum}}</van-tag>
            <van-tag style="margin-left: 3px;" plain type="danger">课程容量: {{item.maximum}}</van-tag>
          </template>
          <template #num>
            <van-button size="small" style="float: right" plain text="老师简介" type="primary"   @click="showTeacher(item.qualification, item.introduction)"/>
          </template>
        </van-card>
      </div>
    </van-popup>
    </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Tabbar, TabbarItem, Dialog, Notify, Toast } from 'vant'
import Vue from 'vue'
import 'vant/lib/button/style'
import moment from 'moment'
import 'vant/lib/card/style/less'

Vue.use(Tabbar)
Vue.use(TabbarItem)

// const coupon = {
//   available: 1,
//   condition: '无使用门槛\n最多优惠12元',
//   reason: '',
//   value: 150,
//   name: '会员卡',
//   startAt: 1489104000,
//   endAt: 1514592000,
//   valueDesc: '350',
//   unitDesc: '天'
// }
export default {
  name: 'Appoint',
  components: {},
  data () {
    return {
      key: 0,
      chosenDate: '',
      showDetail: false,
      showCard: false,
      chosenCardIndex: -1,
      ableCards: [],
      chosenCard: {},
      realAbleCards: [],
      realDisableCards: [],
      disabledCards: [],
      list: [],
      loading: false,
      finished: false,
      show: false,
      active: 0,
      maxDate: new Date(),
      courseList: [],
      userInfo: {},
      appointInfo: [],
      detail: {},
      isPregnant: false
    }
  },
  methods: {
    ...mapActions(['GetClassroomPage', 'UpdateClassroomEnableStateById', 'GetCourseSchedulingList', 'GetPersonCard', 'Appoint', 'GetAppointInfoByScheduleId']),
    showDetailFunc (item) {
      this.detail.hasPracticed = item.hasPracticed
      this.detail.hasHurt = item.hasHurt
      this.detail.aim = item.aim
      this.detail.attendNum = item.attendNum
      this.showDetail = true
    },
    showDesc (desc) {
      Dialog.alert({
        title: '课程介绍',
        message: '' + desc
      }).then(() => {
        // on close
      })
    },
    showTeacher (qlf, intro) {
      Dialog.alert({
        messageAlign: 'left',
        title: '老师简介',
        message: '<h4>个人资质</h4>' + qlf + '\n<h4>自我介绍</h4>' + intro
      }).then(() => {
        // on close
      })
    },
    appoint (scheduleId) {
      if (this.chosenCardIndex === -1) {
        Notify({
          message: '请先选择会员卡',
          color: '#ad0000',
          background: '#ffe1e1'
        })
        return
      }
      var appointForm = {}
      appointForm.customerId = this.userInfo.id
      appointForm.cardId = this.chosenCard.id
      appointForm.scheduleId = scheduleId
      // 0是b端 1是c端
      appointForm.endType = 1
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '约课中'
      })
      this.Appoint(appointForm).then(res => {
        // 刷新一下课程容量人数
        this.searchFor(this.chosenDate)
        // 刷新卡余额
        this.chosenCardIndex = -1
        this.chosenCard = []
        this.searchCards()
        Toast.clear()
        Notify({
          message: '约课成功!',
          color: '#ffffff',
          background: '#68bb69'
        })
        this.key++
      }).catch(() => {
        Toast.clear()
      })
    },
    formatterPrice () {
      if (this.chosenCard.type === 1) {
        return '可用:' + this.chosenCard.availablePeriod + '天'
      } else if (this.chosenCard.type === 2) {
        return '可用:' + this.chosenCard.availableCount + '次'
      } else {
        return '可用:' + this.chosenCard.availableAmount + '元'
      }
    },
    init () {
      // 设置日历可选时间
      this.maxDate = (moment().hours() === 21 && moment().minutes() >= 30) || (moment().hours() > 21) ? new Date(moment().add(5 + 5, 'days').valueOf()) : new Date(moment().add(4 + 5, 'days').valueOf())
      if (this.userInfo.type === 0) {
        this.searchCards()
      }
    },
    searchCards () {
      var params = {}
      this.disabledCards = []
      this.ableCards = []
      this.realAbleCards = []
      this.realDisableCards = []
      params.customerId = this.userInfo.id
      this.GetPersonCard(params).then(res => {
        this.loading = false
        if (res) {
          res.forEach(data => {
            var card = {}
            card.available = 1
            if (data.type === 1) {
              card.valueDesc = data.availablePeriod
              card.unitDesc = '天'
            } else if (data.type === 2) {
              card.valueDesc = data.availableCount
              card.unitDesc = '次'
            } else {
              card.valueDesc = data.availableAmount
              card.unitDesc = '元'
            }
            card.name = data.cardName
            card.id = data.id
            card.condition = '  '
            card.value = 'ss'
            card.startAt = moment(data.openCardDay).format('X')
            if (card.startAt === 'Invalid date') {
              card.startAt = moment(data.createTIme).format('X')
            }
            card.endAt = moment(data.endCardDay).format('X')
            if (card.endAt === 'Invalid date') {
              card.endAt = moment('2099-12-31').format('X')
            }
            // card.endAt = data.endCardDay
            console.log(data.availableCount)
            if (data.enableState === 2 || (data.availableCount !== null && data.availableCount <= 0) || (data.availablePeriod !== null && data.availablePeriod <= 0) || (data.availableAmount != null && data.availableAmount <= 0)) {
              this.disabledCards.push(card)
              this.realDisableCards.push(data)
            } else if (data.enableState === 1) {
              this.ableCards.push(card)
              this.realAbleCards.push(data)
            }
          })
          if (this.ableCards.length === 1) {
            this.chosenCard = this.realAbleCards[0]
            this.chosenCardIndex = 0
            if (this.ableCards[0].name === '孕产卡' || this.ableCards[0].name === '孕产充值卡') {
              this.isPregnant = true
            }
          }
        }
      }).catch(() => {
      })
    },
    lookOrAppoint (scheduleId) {
      if (parseInt(this.userInfo.type) === 0) {
        this.appoint(scheduleId)
      } else if (parseInt(this.userInfo.type) === 1) {
        this.look(scheduleId)
      }
    },
    look (scheduleId) {
      var params = {}
      params.current = 1
      params.size = 10
      params.scheduleId = scheduleId
      this.GetAppointInfoByScheduleId(params).then(res => {
        if (res) {
          // for (var i = 0; i < res.records.length; i++) {
          //   var record = res.records[i]
          //   var date = new Date(record.enterTime)
          //   record.enterTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          // }
          this.showCard = true
          this.appointInfo = res.records
        }
      }).catch(() => {
      })
    },
    clickCard () {
      this.showCard = true
    },
    onChange (index) {
      this.showCard = false
      this.chosenCardIndex = index
      this.chosenCard = this.realAbleCards[index]
    },
    searchFor (date) {
      this.chosenDate = date
      var params = {}
      params.startDate = date
      params.endDate = date
      this.GetCourseSchedulingList(params).then(res => {
        if (res.length !== 0) {
          this.courseList = res
          this.courseList.forEach(obj => {
            obj.attendTime = obj.attendTime.substr(0, 5)
            obj.finishTime = obj.finishTime.substr(0, 5)
          })
          if (this.userInfo.type === 0) {
            this.courseList = this.courseList.filter(item => item.courseName.indexOf('私教') === -1)
          }
          this.show = true
        } else {
          Dialog.alert({
            message: '不好意思亲，今天没有排课哦!',
            theme: 'round-button'
          }).then(() => {
            // on close
          })
        }
      }).catch(() => {
      })
    },
    handleOnSelect (date) {
      date = moment(date).format('yyyy-MM-DD')
      this.searchFor(date)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  },
  mounted () {
    var userInfo = localStorage.getItem('userInfo')
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
.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
  width: 15%;
}
/*.wrapper {*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*  height: 100%;*/
/*}*/

/*.block {*/
/*  width: 50vw;*/
/*  height: 50vh;*/
/*  background-color: #fff;*/
/*}*/
</style>
