<template>
  <div>
  <el-dialog title="退卡" width="800px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose">
    <div v-loading="loading">
<!--      <el-table stripe border :data="this.data">-->
<!--        <el-table-column type="index" label="序号" width="50"></el-table-column>-->
<!--        <el-table-column width="200" prop="cardName" label="卡名称"></el-table-column>-->
<!--        <el-table-column :formatter="getCardType" label="类别"></el-table-column>-->
<!--        <el-table-column prop="paymentAmount" label="总付款金额"></el-table-column>-->
<!--        <el-table-column  prop="usePeriod" label="已用天数" ></el-table-column>-->
<!--        &lt;!&ndash;        <el-table-column prop="enterTime" label="已约未学金额"></el-table-column>&ndash;&gt;-->
<!--        <el-table-column  prop="availablePeriod" label="剩余天数"></el-table-column>-->
<!--        <el-table-column prop="useAmount" label="已用金额"></el-table-column>-->
<!--        <el-table-column prop="availableAmount" label="剩余金额"></el-table-column>-->
<!--        <el-table-column  prop="useCount" label="已用次数"></el-table-column>-->
<!--        <el-table-column  prop="availableCount" label="剩余次数"></el-table-column>-->
<!--        <el-table-column-->
<!--          fixed="right"-->
<!--          label="操作"-->
<!--          width="130">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="primary" size="mini" @click="showUpdate(scope.row.id)">退卡</el-button>-->
<!--            &lt;!&ndash;            <el-switch v-model="scope.row.enableState"&ndash;&gt;-->
<!--            &lt;!&ndash;                       :active-value="1" :inactive-value="2"&ndash;&gt;-->
<!--            &lt;!&ndash;                       active-color="#13ce66" inactive-color="#ff4949"&ndash;&gt;-->
<!--            &lt;!&ndash;                       style="margin-left: 10px;"&ndash;&gt;-->
<!--            &lt;!&ndash;                       @change="updateEnableState($event, scope.row.id)"></el-switch>&ndash;&gt;-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
      <el-row>
        <el-col :span="8" v-for="(o, index) in this.data" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }" shadow="always" v-if="o.cardName !== '体验卡'">
            <img style='object-fit: cover;height: 200px;width: 250px' src="http://101.133.146.88/lisaPic/logo.jpg" class="image">
            <div style="padding: 14px;border-radius: 0px;">
              <div style="font-weight: bold;font-size: 16px;">{{o.cardName}}</div>
              <div > <icon class="el-icon-money"/> 总付款金额: {{o.paymentAmount}}</div>
              <div v-if="o.type === 1"> <icon class="el-icon-timer"/> 已过天数: {{o.usePeriod}}</div>
              <div v-if="o.type === 1"> <icon class="el-icon-timer"/> 剩余天数: {{o.availablePeriod}}</div>
              <div v-if="o.type === 2"> <icon class="el-icon-c-scale-to-original"/> 已用次数: {{o.useCount}}</div>
              <div v-if="o.type === 2"> <icon class="el-icon-c-scale-to-original"/> 剩余次数: {{o.availableCount}}</div>
              <div v-if="o.type === 3"> <icon class="el-icon-money"/> 已用金额: {{o.useAmount}}</div>
              <div v-if="o.type === 3"> <icon class="el-icon-money"/> 剩余金额: {{o.availbleAmount}}</div>

              <div class="bottom clearfix">
                  <el-button type="danger" slot="reference" @click="showRefundDetail(o.id, o.type)" class="button" style="float: right;margin-bottom: 10px">退卡</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="$consts.PAGE_SIZES"
        :page-size="size"
        style="margin-top: 10px;"
        layout="total, sizes, prev, pager, next"
        :total="data.total">
      </el-pagination>
    </div>
  </el-dialog>
    <RefundDetail :visible="refundDetailFileVisible"
                  :customer-id="id"  :card-id="cardId" :typex = "cardType"
                  @on-close="refundDetailFileVisible=false"
                  @on-success="updateSuccess">
    </RefundDetail>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RefundDetail from '@/views/customer/RefundDetail'

const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'Refund',
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: String,
      default: ''
    }
  },
  components: { RefundDetail },
  data () {
    return {
      refundDetailFileVisible: false,
      data: [],
      params: {},
      dialogVisible: false,
      members: {},
      current: 1,
      size: 10,
      loading: false,
      cardId: '',
      chooseCardVisible: false,
      personInfo: {
      },
      cardType: '',
      channelMap: ['大众点评', '传单', '微信群', '微信朋友圈', '搜索引擎', '朋友介绍', '母婴论坛', '合作月子中心', '其他合作伙伴']
    }
  },
  methods: {
    ...mapActions(['GetCustomerPage', 'UpdateCustomerEnableStateById', 'GetCustomerSearch', 'GetPersonCard', 'Refund']),
    // init () {
    //   this.search()
    // },
    updateSuccess () {
      this.refundDetailFileVisible = false
      this.search()
    },
    showRefundDetail (cardId, type) {
      this.cardId = cardId
      this.cardType = type
      this.refundDetailFileVisible = true
    },
    refund (cardId) {
      console.log(cardId)
      var params = {}
      params.customerId = this.id
      params.cardId = cardId
      this.Refund(params).then(() => {
        this.submitBtnLoading = false
        this.search()
      }).catch(() => {
        this.submitBtnLoading = false
      })
    },
    getCardType (row, column) {
      if (row.type === 2) {
        return '次卡'
      } else if (row.type === 1) {
        return '时长卡'
      } else if (row.type === 3) {
        return '充值卡'
      }
    },
    getChannel (row) {
      return this.channelMap[row.channel]
    },
    resetData () {
      this.data = {}
    },
    handleClose (done) {
      this.resetData()
      this.$emit('on-close')
      done()
    },
    handleSizeChange (val) {
      this.size = val
      this.search()
    },
    handleCurrentChange (val) {
      this.current = val
      this.search()
    },
    close () {
      this.resetData()
      this.$emit('on-close')
      this.dialogVisible = false
    },
    search () {
      this.loading = true
      this.personInfo.customerId = this.id
      this.GetPersonCard(this.personInfo).then(res => {
        this.loading = false
        if (res) {
          this.data = res
          console.log(this.data)
        }
      }).catch(() => {
        this.loading = false
      })
    },
    fetchData () {
      this.search()
    }
  },
  // mounted () {
  //   // this.init()
  //   this.search()
  // },
  watch: {
    name () {
      delay(() => {
        this.fetchData()
      }, 1000)
    },
    visible (val) {
      if (val) {
        // this.init()
        this.dialogVisible = val
        this.search()
      }
    }
  }
}

</script>
