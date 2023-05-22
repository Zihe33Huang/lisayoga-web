<template>
  <el-dialog :title="$t('dialog.title')" width="400px" style="margin-left: 72vw" :modal="false"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <template>
      <div v-loading="loading">
        <div>
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker  style="margin-bottom: 10px;"
                             value-format="yyyy-MM-dd"
                             v-model="monthPicker"
                             type="month"
                             :placeholder="$t('trainer_labels.selectMonth')">
            </el-date-picker>
            <el-form :inline="true" ref="form" :model="form"  label-width="80px"  label-position="left" class="tams-form-container">
              <el-form-item :label="$t('trainer_labels.totalSalary')" prop="totalSalary">
                <el-input  disabled  class="tams-form-item" :placeholder="totalSalary"></el-input>
              </el-form-item>
              <el-form-item :label="$t('trainer_labels.basicSalary')" prop="basicSalary">
                <el-input  v-model="form.basicSalary" class="tams-form-item"></el-input>
              </el-form-item>
              <el-form-item :label="$t('trainer_labels.allowance')" prop="allowance">
                <el-input  v-model="form.allowance" class="tams-form-item"></el-input>
              </el-form-item>
              <el-form-item :label="$t('trainer_labels.classCount')" prop="count">
                <el-input  v-model="form.count" class="tams-form-item"></el-input>
              </el-form-item>
              <el-form-item :label="$t('trainer_labels.hourlyRate')" prop="courseFee">
                <el-input  v-model="form.courseFee" class="tams-form-item"></el-input>
              </el-form-item>
              <el-form-item :label="$t('trainer_labels.commission')" prop="royalty">
                <el-input  v-model="form.royalty" class="tams-form-item"></el-input>
              </el-form-item>
            </el-form>
            <div>
            </div>
          </div>
        </div>
        <div style="margin-top: 5px;" class="el-dialog__footer">
          <el-button  size="small" type="primary" :loading="submitBtnLoading" @click="confirmPay">{{$t('trainer_labels.settle')}}</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { Notification } from 'element-ui'
// eslint-disable-next-line no-unused-vars
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'SavePay',
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
      submitBtnLoading: false,
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
      form: {
        feeDTO: []
      }
    }
  },
  computed: {
    totalSalary () {
      return parseInt(this.form.basicSalary === undefined ? 0 : this.form.basicSalary) + parseInt(this.form.allowance === undefined ? 0 : this.form.allowance) +
        parseInt(this.form.courseFee === undefined ? 0 : this.form.courseFee) + parseInt(this.form.royalty === undefined ? 0 : this.form.royalty)
    }
  },
  methods: {
    ...mapActions(['ConfirmPay', 'GetCustomerById', 'UpdateCustomerById', 'GetUploadFileById', 'uploadFile', 'DeleteFileById', 'GetPersonCard', 'GetPersonCourseInfo', 'GetTeacherCourseInfo', 'GetTeacherPayInfo']),
    handleClose (done) {
      this.$emit('on-close')
      this.datePicker = moment().startOf('month').format('YYYY-MM-DD')
      this.datePicker = moment().endOf('month').format('YYYY-MM-DD')
      this.monthPicker = ''
      this.formDay = {}
      this.formMonth = {}
      this.canConfirm = false
      done()
    },
    close () {
      this.$emit('on-close')
      this.datePicker = moment().startOf('month').format('YYYY-MM-DD')
      this.datePicker = moment().endOf('month').format('YYYY-MM-DD')
      this.monthPicker = ''
      this.formDay = {}
      this.formMonth = {}
      this.dialogVisible = false
      this.canConfirm = false
    },
    confirmPay () {
      var params = {}
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          params = this.form
          params.totalSalary = this.totalSalary
          params.teacherId = this.id
          params.month = this.monthPicker
          params.type = 1 // 1为灵活结算
          this.ConfirmPay(params).then(() => {
            this.submitBtnLoading = false
            Notification.success({
              title: '结算成功',
              message: ''
            })
          }).catch(() => {
            this.submitBtnLoading = false
          })
        }
      })
    }
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
  },
  watch: {
    visible (val) {
      if (val) {
        console.log(this.typex)
        this.dialogVisible = val
      }
    }
  }
}
</script>
