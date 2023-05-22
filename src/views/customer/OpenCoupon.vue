<template>
  <el-dialog :title="$t('dialogs.ticketVerification')" width="450px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <!--      <el-form-item :label="$t('member_labels.openCardDate')" prop="name">-->
      <!--        <div class="block">-->
      <!--          <el-date-picker-->
      <!--            v-model="form.beginDate"-->
      <!--            type="date"-->
      <!--            :placeholder="$t('placeholders.selectDate')">-->
      <!--          </el-date-picker>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-form-item :label="$t('member_labels.cardType')" prop="name">
        <el-input v-model="form.cardRuleId" :value="13" :placeholder="$t('placeholders.cardType')" class="tams-form-item" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.paymentAmount')" prop="name">
        <el-input v-model="form.paymentAmount" :placeholder="$t('placeholders.paymentAmount')" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.channelFee')" prop="name">
        <el-input style="width: 80px" v-model="form.channelFee"  @input="inputCalc" :placeholder="$t('placeholders.channelFee')" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.actualAmount')" prop="name">
        <el-input style="width: 80px" v-model="form.actualAmount" :placeholder="$t('placeholders.actualAmount')" class="tams-form-item"></el-input>
      </el-form-item>
      <!--      <el-form-item :label="$t('member_labels.isFree')" prop="isFree" v-if="customerType === 1">-->
      <!--        <template>-->
      <!--          <el-radio v-model="form.isFree" label="1">{{$t('member_labels.yes')}}</el-radio>-->
      <!--          <el-radio v-model="form.isFree" label="0">{{$t('member_labels.no')}}</el-radio>-->
      <!--        </template>-->
      <!--      </el-form-item>-->
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
  name: 'OpenCoupon',
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
            value: '11',
            label: '无限制卡'
          }]
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
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          console.log(this.form)
          this.form.customerId = this.id
          this.form.teacherId = this.teacherId
          this.form.payMethod = '3'
          this.form.cardRuleId = 13
          this.form.cardTimes = 1
          this.form.startTime = this.myFuncton(new Date())
          this.form.validityPeriod = 365
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
