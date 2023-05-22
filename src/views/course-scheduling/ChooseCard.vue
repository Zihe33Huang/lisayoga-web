<template>
  <el-dialog title="选择会员卡" width="800px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose">
    <div v-loading="loading">
      <el-row>
        <el-col :span="8" v-for="(o, index) in this.data" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }" shadow="always" >
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
                <el-button type="danger"  class="button" style="float: right;margin-bottom: 10px">约课</el-button>
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ChooseCard',
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data: [],
      params: {},
      dialogVisible: false,
      members: {},
      current: 1,
      size: 10,
      loading: false,
      personInfo: {
      }
    }
  },
  methods: {
    ...mapActions(['GetCustomerPage', 'UpdateCustomerEnableStateById', 'GetCustomerSearch', 'GetPersonCard']),
    // init () {
    //   this.search()
    // },
    getCardType (row, column) {
      if (row.type === 2) {
        return '次卡'
      } else if (row.type === 1) {
        return '时长卡'
      } else if (row.type === 3) {
        return '充值卡'
      }
    },
    resetData () {
      this.form = {}
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
    showUpdate (id) {
      this.id = id
      this.updateCustomerVisible = true
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
      // delay(() => {
      //   this.fetchData()
      // }, 1000)
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
