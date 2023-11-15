<template>
  <el-dialog :title="$t('IssueCard.IssueCard')" width="750px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
<!--      <el-form-item label="开卡日期" prop="name">-->
<!--        <div class="block">-->
<!--          <el-date-picker-->
<!--            v-model="form.beginDate"-->
<!--            type="date"-->
<!--            placeholder="选择日期">-->
<!--          </el-date-picker>-->
<!--        </div>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('IssueCard.CardType')" prop="name" v-if="customerType === 1">
        <el-input v-model="form.cardRuleId" :value="13" placeholder="体验卡" class="tams-form-item" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('IssueCard.CardType')" prop="name" v-else>
        <div class="block">
          <el-cascader
            :show-all-levels="false"
            v-model="form.cardRuleId"
            :options="cardTypeOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"></el-cascader>
        </div>
      </el-form-item>
      <el-form-item :label="$t('IssueCard.PaymentAmount')" prop="name" label-width="150px">
        <el-input v-model="form.paymentAmount" class="tams-form-item" ></el-input>
      </el-form-item>
      <el-form-item :label="$t('IssueCard.ValidityPeriod')" label-width="100px" prop="name" v-if="customerType !== 1">
        <el-input style="width: 80px" v-model="form.validityPeriod" class="tams-form-item"></el-input>
        <el-button style="margin-left: 10px;" size="mini" type="primary" round @click="yearCard">{{$t('IssueCard.YearCard')}}</el-button>
        <el-button size="mini" type="primary" round @click="halfYearCard">{{$t('IssueCard.HalfYearCard')}}</el-button>
        <el-button size="mini" type="primary" round @click="seasonCard">{{$t('IssueCard.SeasonCard')}}</el-button>
        <el-button size="mini" type="primary" round @click="monthCard">{{$t('IssueCard.MonthCard')}}</el-button>
      </el-form-item>
      <el-form-item :label="$t('IssueCard.Number')" prop="name" v-if="this.form.cardRuleId != null && this.form.cardRuleId[0] == 'number'">
        <el-input style="width: 80px" v-model="form.cardTimes" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('IssueCard.StartDate')" prop="name" v-if="customerType !== 1" >
        <div class="block">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            :placeholder="$t('IssueCard.SelectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
<!--      <el-form-item label-width="140px" :label="$t('IssueCard.Gym-SpecificCard')" prop="name" v-if="customerType !== 1">-->
<!--        <template>-->
<!--          <el-radio v-model="form.isSpecialSelf" label="true">是</el-radio>-->
<!--          <el-radio v-model="form.isSpecialSelf" label="false">否</el-radio>-->
<!--        </template>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('IssueCard.PaymentMethod')"  label-width="120px" prop="name" v-if="customerType !== 1">
        <template>
          <el-select
            v-model="form.payMethod"
            collapse-tags
            style="margin-left: 20px;"
            :placeholder="$t('IssueCard.PleaseSelect')">
            <el-option
              v-for="item in payWay"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
<!--      <el-form-item :label="$t('IssueCard.ChannelCosts')" prop="name">-->
<!--        <el-input style="width: 80px" v-model="form.channelFee"  @input="inputCalc" class="tams-form-item"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item :label="$t('IssueCard.ActualRevenue')" prop="name">-->
<!--        <el-input style="width: 80px" v-model="form.actualAmount"  class="tams-form-item"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否赠送" prop="isFree" v-if="customerType === 1">-->
<!--        <template>-->
<!--          <el-radio v-model="form.isFree" label="1">是</el-radio>-->
<!--          <el-radio v-model="form.isFree" label="0">否</el-radio>-->
<!--        </template>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('IssueCard.BillingTrainer')" label-width="100px" prop="name" v-if="customerType !== 1">
        <template>
          <el-select v-model="teacherId" placeholder="请选择">
            <el-option
              v-for="item in teachers"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{$t('buttons.cancel')}}</el-button>
      <el-button type="primary" :loading="submitBtnLoading" @click="submit">{{$t('buttons.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OpenCard',
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: String,
      default: ''
    },
    customerType: {
      type: [String, Number]
    }
  },
  data () {
    return {
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
      radio: true,
      cardTypeOptions: [{
        value: 'time',
        label: '时长卡',
        children: [{
          value: 'regularGroup',
          label: '常规团课卡',
          children: [{
            value: '1',
            label: '工作日二次卡'
          }, {
            value: '2',
            label: '工作日三次卡'
          }, {
            value: '3',
            label: '周末二次卡'
          }, {
            value: '14',
            label: '工作日五次卡'
          }, {
            value: '11',
            label: '无限制卡'
          }]
        }]
      }, {
        value: 'number',
        label: '次卡',
        children: [{
          value: '4',
          label: 'vip团课卡'
        }, {
          value: '5',
          label: '常规私教卡'
        }, {
          value: '6',
          label: '普拉提器械私教卡'
        }, {
          value: '7',
          label: '普拉提器械团课卡'
        }, {
          value: '10',
          label: '孕产卡'
        }, {
          value: '12',
          label: '常规团课卡'
        }]
      },
      {
        value: 'recharge',
        label: '充值卡',
        children: [{
          value: '8',
          label: '普通充值卡'
        }, {
          value: '9',
          label: '大礼包充值卡'
        }, {
          value: '15',
          label: '孕产充值卡'
        }]
      }
      ],
      dialogVisible: false,
      form: {},
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: '该项不能为空',
        //     trigger: 'blur'
        //   }
        // ]
        isFree: [
          {
            required: true,
            message: '请确认是否赠送',
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
      teachers: [],
      teacherId: ''
    }
  },
  methods: {
    ...mapActions(['SaveCustomer', 'openCard', 'GetTeacherPage']),
    handleClose (done) {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.teachers = []
      this.form = {}
      done()
    },
    yearCard () {
      // this.form.cardTimes = 365
      this.$set(this.form, 'validityPeriod', 365)
    },
    halfYearCard () {
      this.$set(this.form, 'validityPeriod', 180)
    },
    seasonCard () {
      this.$set(this.form, 'validityPeriod', 90)
    },
    monthCard () {
      this.$set(this.form, 'validityPeriod', 30)
    },
    infinityCard () {
      this.$set(this.form, 'validityPeriod', '无限制')
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.teachers = []
      this.form = {}
      this.dialogVisible = false
    },
    submit () {
      console.log(this.customerType)
      if (this.customerType !== 1) {
        this.form.startTime = this.myFuncton(this.form.startTime)
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          if (this.customerType !== 1) {
            var len = this.form.cardRuleId.length
            this.form.cardRuleId = this.form.cardRuleId[len - 1]
          }
          console.log(this.form)
          this.form.customerId = this.id
          this.form.teacherId = this.teacherId
          if (this.customerType === 1) {
            this.form.payMethod = '3'
            this.form.cardRuleId = 13
            this.form.cardTimes = 1
            this.form.startTime = this.myFuncton(new Date())
            this.form.validityPeriod = 365
          }
          if (this.form.validityPeriod === '无限制') {
            this.form.validityPeriod = -1
          }
          console.log(this.id)
          this.openCard(this.form).then(() => {
            this.submitBtnLoading = false
            this.$refs.form.resetFields()
            this.$emit('on-success')
            this.dialogVisible = false
            this.form = {}
            this.teachers = []
          }).catch(() => {
            this.submitBtnLoading = false
          })
        }
      })
    },
    myFuncton (time) {
      var date = new Date(+new Date(time)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    handleChange (value) {
      console.log(value)
    },
    inputCalc (num) {
      this.form.actualAmount = this.form.paymentAmount - num
    },
    searchTeacher () {
      var params = {}
      params.current = 1
      params.size = 50
      this.loading = true
      this.GetTeacherPage(params).then(res => {
        this.loading = false
        if (res) {
          for (var i = 0; i < res.records.length; i++) {
            var record = res.records[i]
            this.teachers.push({ value: record.id, label: record.name })
          }
        }
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.searchTeacher()
        this.dialogVisible = val
        console.log(this.customerType)
      }
    }
  }
}
</script>
