<template>
  <el-dialog title="退款计算" width="1000px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <template>
      <div v-loading="loading">
            <div>
              <div class="block">
                <span class="demonstration"></span>
                <el-form style="margin-right: 30px" :inline="true" ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
                  <el-form-item label-width="100px" label="总充值金额" prop="totalAmount">
                    <el-input disabled v-model="form.totalAmount" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item v-if="typex != 3" :label="typex == 1 ? '总天数' : '总次数'" prop="totalCount">
                    <el-input disabled v-model="form.totalCount" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item v-if="typex != 3" :label="typex == 1 ? '剩余天数' : '剩余次数'" prop="refundCount">
                    <el-input disabled v-model="form.refundCount" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item v-if="typex != 3" label="平均价格" prop="averagePrice">
                    <el-input disabled v-model="form.averagePrice" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="剩余金额" prop="actualRefundAmount">
                    <el-input  disabled v-model="form.refundAmount" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label-width="100px" label="手续费" prop="setActualRefundAmount">
                    <el-input  disabled v-model="form.serviceCharge" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="退卡金额" prop="actualRefundAmount" style="margin-right: 600px">
                    <el-input disabled v-model="form.actualRefundAmount" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label-width="100px" label="手续费比例" prop="rate">
                    <el-input style="width: 140px" placeholder="默认比例30%" v-model="form.rate" class="tams-form-item">
                      <i slot="suffix" > % </i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="出账方式" >
                    <template>
                      <el-select :disabled = "form.totalAmount == null ? true : false"
                        v-model="form.payMethod"
                        collapse-tags
                        style="margin-left: 20px;"
                        placeholder="请选择">
                        <el-option
                          v-for="item in payWay"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                </el-form>
                <div>
                </div>
              </div>
            </div>
            <div style="margin-top: 5px;" class="el-dialog__footer">
              <el-button  size="small" type="primary" @click="compute">计算</el-button>
              <el-button  style="" size="small" type="primary" @click="confirmRefund">确认退卡</el-button>
            </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'RefundDetail',
  props: {
    visible: {
      type: Boolean
    },
    customerId: {
      type: String,
      default: ''
    },
    cardId: {
      type: String,
      default: ''
    },
    typex: {
      type: String
    }
  },
  data () {
    return {
      payMethod: '',
      payWay: [{
        value: '0',
        label: '现金'
      }, {
        value: '1',
        label: '支付宝'
      }, {
        value: '2',
        label: '微信'
      }, {
        value: '3',
        label: '大众点评团购'
      }, {
        value: '4',
        label: '刷卡-信用卡'
      }, {
        value: '5',
        label: '刷卡-储蓄卡'
      }, {
        value: '6',
        label: '支付宝商家收款'
      }, {
        value: '7',
        label: '大众点评扫码'
      }, {
        value: '8',
        label: '收钱吧'
      }],
      canConfirm: false,
      courseFee: '',
      monthPicker: '',
      datePickerOptions: {
        firstDayOfWeek: 1
      },
      datePicker: [],
      loading: false,
      size: 10,
      activeName: 'first',
      current: 1,
      data: {},
      cardData: [],
      courseInfo: [],
      dialogVisible: false,
      form: {},
      fileList: [],
      personInfo: {},
      rules: {
        name: [
          {
            required: true,
            message: '该项不能为空',
            trigger: 'blur'
          }
        ]
      },
      submitBtnLoading: false,
      options: [{
        value: '0',
        label: '大众点评'
      }, {
        value: '1',
        label: '传单'
      }, {
        value: '2',
        label: '微信群'
      }, {
        value: '3',
        label: '微信朋友圈'
      }, {
        value: '4',
        label: '搜索引擎'
      }, {
        value: '5',
        label: '朋友介绍'
      }, {
        value: '6',
        label: '母婴论坛'
      }, {
        value: '7',
        label: '合作月子中心'
      }, {
        value: '8',
        label: '其他合作伙伴'
      }],
      channel: '',
      channelMap: ['大众点评', '传单', '微信群', '微信朋友圈', '搜索引擎', '朋友介绍', '母婴论坛', '合作月子中心', '其他合作伙伴']
    }
  },
  methods: {
    ...mapActions(['ConfirmRefund', 'ComputeRefund', 'ConfirmPay', 'GetCustomerById', 'UpdateCustomerById', 'GetUploadFileById', 'uploadFile', 'DeleteFileById', 'GetPersonCard', 'GetPersonCourseInfo', 'GetTeacherCourseInfo', 'GetTeacherPayInfo']),
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getPeriod (row, column) {
      if (row.type === 1) {
        return row.openCardDay + ' 到 ' + row.endCardDay
      } else if (row.type === 2) {
        return '/'
      } else {
        return '/'
      }
    },
    getCardTypeForAppointTable (row, column) {
      if (row.cardType === 2) {
        return '次卡'
      } else if (row.cardType === 1) {
        return '时长卡'
      } else if (row.cardType === 3) {
        return '充值卡'
      }
    },
    getCardTypeForCardTable (row, column) {
      if (row.type === 2) {
        return '次卡'
      } else if (row.type === 1) {
        return '时长卡'
      } else if (row.type === 3) {
        return '充值卡'
      }
    },
    getChannel (v) {
      return this.channelMap[v]
    },
    handleSizeChange (val) {
      this.size = val
      this.search()
    },
    handleClose (done) {
      this.$emit('on-close')
      this.datePicker = moment().startOf('month').format('YYYY-MM-DD')
      this.datePicker = moment().endOf('month').format('YYYY-MM-DD')
      this.monthPicker = ''
      this.form = {}
      this.canConfirm = false
      done()
    },
    close () {
      this.$emit('on-close')
      this.datePicker = moment().startOf('month').format('YYYY-MM-DD')
      this.datePicker = moment().endOf('month').format('YYYY-MM-DD')
      this.monthPicker = ''
      this.form = {}
      this.dialogVisible = false
      this.canConfirm = false
    },
    compute () {
      var params = {}
      params.cardId = this.cardId
      params.customerId = this.customerId
      params.chargeRate = this.form.rate
      if (this.payMethod !== '') {
        params.payMethod = parseInt(this.form.payMethod)
      }
      console.log(params)
      console.log(this.typex)
      this.loading = true
      this.ComputeRefund(params).then(res => {
        if (res) {
          this.form = res
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.search()
    },
    // submit () {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       this.submitBtnLoading = true
    //       this.UpdateCustomerById({ id: this.id, data: this.form }).then(() => {
    //         this.submitBtnLoading = false
    //         this.$refs.form.resetFields()
    //         this.$emit('on-success')
    //         this.dialogVisible = false
    //       }).catch(() => {
    //         this.submitBtnLoading = false
    //       })
    //     }
    //   })
    // }
    confirmRefund () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          var params = {}
          params.cardId = this.cardId
          params.customerId = this.customerId
          params.chargeRate = this.form.rate
          params.payMethod = parseInt(this.form.payMethod)
          this.ConfirmRefund(params).then(() => {
            this.loading = false
            this.dialogVisible = false
            this.$emit('on-success')
            // this.fetchPayData()
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }

  },
  watch: {
    visible (val) {
      if (val) {
        console.log(this.typex)
        this.dialogVisible = val
        this.compute()
      }
    }
  }
}
</script>
