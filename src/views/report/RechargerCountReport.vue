<template>
  <el-row>
    <el-col :style="{width: '1200px'}">
      <el-table stripe border :data="data" show-summary  :summary-method="getSummaries">
        <el-table-column prop="customerName" label="学员名字" width="100"></el-table-column>
        <el-table-column prop="type"  label="状态" width="80">
          <template slot-scope="scope">
            <el-button v-if="scope.row.type === '出账'" disabled size="mini" type="danger">出账</el-button>
            <el-button v-if="scope.row.type === '入账'" disabled size="mini" type="success">入账</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cardName" label="卡名称" width="300"></el-table-column>
<!--        <el-table-column prop="paymentAmount" label="支付金额"></el-table-column>-->
        <el-table-column :formatter="payMethodFormat" label="支付方式"></el-table-column>
        <el-table-column prop="actualAmount" label="收入"></el-table-column>
        <el-table-column prop="cardTimes" label="充值次数"></el-table-column>
        <el-table-column prop="validityPeriod" label="充值天数"></el-table-column>
        <el-table-column prop="createTime" label="时间" width="200"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from 'vuex'
import echarts from 'echarts'

export default {
  name: 'RechargerCountReport',
  components: { },
  props: {
    startDate: String,
    endDate: String
  },
  data () {
    return {
      data: [],
      width: '600px'
    }
  },
  methods: {
    ...mapActions(['GetReportRechergerCount']),
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 5 || index === 6 || index === 7) {
          sums[index] = '/'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    payMethodFormat (obj) {
      var num = obj.payMethod
      if (num === '0') {
        return '现金'
      } else if (num === '1') {
        return '支付宝'
      } else if (num === '2') {
        return '微信'
      } else if (num === '3') {
        return '大众点评团购'
      } else if (num === '4') {
        return '刷卡-信用卡'
      } else if (num === '5') {
        return '刷卡-储蓄卡'
      } else if (num === '6') {
        return '支付宝商家收款'
      } else if (num === '7') {
        return '大众点评扫码'
      } else if (num === '8') {
        return '收钱吧'
      }
    },
    search () {
      this.GetReportRechergerCount({
        startDate: this.startDate,
        endDate: this.endDate
      }).then((res) => {
        if (res) {
          this.data = res
          this.draw()
        }
      }).catch(() => {
      })
    },
    draw () {
      const chart = echarts.init(document.getElementById('rechargeCountChart'))
      chart.setOption({
        title: {
          text: 'Top10'
        },
        grid: {
          left: '15%'
        },
        series: [
        ]
      })
    }
  },
  watch: {
    startDate (val) {
      this.search()
    },
    endDate (val) {
      this.search()
    }
  }
}
</script>

<style scoped>

</style>
