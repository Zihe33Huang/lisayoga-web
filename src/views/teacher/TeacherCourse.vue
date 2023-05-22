<template>
  <el-dialog title="工资结算" width="800px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <template>
          <div v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="按月结算" name="first" >
            <div>
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker  style="margin-bottom: 10px;"
                  value-format="yyyy-MM-dd"
                  v-model="monthPicker"
                  type="month"
                  placeholder="选择月">
                </el-date-picker>
                <el-form :inline="true" ref="form" :model="formMonth" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
                  <el-form-item label="总工资" prop="totalSalary">
                    <el-input disabled v-model="formMonth.totalSalary" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="基本工资" prop="basicSalary">
                    <el-input disabled v-model="formMonth.basicSalary" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="饭贴车贴" prop="allowance">
                    <el-input disabled v-model="formMonth.allowance" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="上课次数" prop="count">
                    <el-input disabled v-model="formMonth.count" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="课时费" prop="courseFee">
                    <el-input disabled v-model="formMonth.courseFee" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="提成比例" prop="name">
                    <el-input disabled style="width: 70px" v-model="formMonth.royaltyRate" class="tams-form-item"></el-input>%
                  </el-form-item>
                  <el-form-item label="提成" prop="royalty">
                    <el-input disabled v-model="formMonth.royalty" class="tams-form-item"></el-input>
                  </el-form-item>
                  <el-form-item label="结算状态" prop="status">
                    <el-button disabled v-if="this.formMonth.status === 0"  size="small" type="danger">未结算</el-button>
                    <el-button disabled v-if="this.formMonth.status === 1"  size="small" type="primary">已结算</el-button>
                  </el-form-item>
                </el-form>
                <div>
                </div>
              </div>
                </div>
                <el-table stripe border :data="this.formMonth.feeDTO">
                  <el-table-column type="index" label="序号" width="50"></el-table-column>
<!--                  <el-table-column width="200" prop="cardName" label="卡名称"></el-table-column>-->
<!--                  <el-table-column :formatter="getCardTypeForCardTable" label="类别" ></el-table-column>-->
                  <el-table-column  prop ="date" label="上课日期" width="160px" ></el-table-column>
                  <el-table-column  prop="time" label="上课时间" width="160px" ></el-table-column>
                  <!--        <el-table-column prop="enterTime" label="已约未学金额"></el-table-column>-->
                  <el-table-column  prop="courseName" label="课程名称" width="160px"></el-table-column>
                  <el-table-column  :formatter="courseFeeFormatter" label="课时费" width="220px"></el-table-column>
                </el-table>
                <div style="margin-top: 5px;" class="el-dialog__footer">
                <el-button :loading="submitBtnLoading" size="small" type="primary" @click="fetchPayData('month')">计算</el-button>
                <el-button :loading="submitBtnLoading" :disabled="!canConfirm" style="" size="small" type="primary" @click="confirmPay">确认结算</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="按日结算" name="second" >
              <div>
                <div>
                  <div class="block">
                    <el-date-picker v-model="datePicker"
                                    size="mini"
                                    :picker-options="datePickerOptions"
                                    type="daterange"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    style="width: 240px;margin-bottom: 10px;height: 40px">
                    </el-date-picker>
                    <span class="demonstration"></span>
                    <el-form :inline="true" ref="form" :model="formDay" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
<!--                      <el-form-item label="总工资" prop="totalSalary">-->
<!--                        <el-input disabled v-model="form.totalSalary" class="tams-form-item"></el-input>-->
<!--                      </el-form-item>-->
<!--                      <el-form-item label="基本工资" prop="basicSalary">-->
<!--                        <el-input disabled v-model="form.basicSalary" class="tams-form-item"></el-input>-->
<!--                      </el-form-item>-->
<!--                      <el-form-item label="饭贴车贴" prop="allowance">-->
<!--                        <el-input disabled v-model="form.allowance" class="tams-form-item"></el-input>-->
<!--                      </el-form-item>-->
                      <el-form-item label="上课次数" prop="count">
                        <el-input disabled v-model="formDay.count" class="tams-form-item"></el-input>
                      </el-form-item>
                      <el-form-item label="课时费" prop="courseFee">
                        <el-input disabled v-model="formDay.courseFee" class="tams-form-item"></el-input>
                      </el-form-item>
                      <el-form-item label="提成比例" prop="name">
                        <el-input disabled style="width: 70px" v-model="formDay.royaltyRate" class="tams-form-item"></el-input>%
                      </el-form-item>
                      <el-form-item label="提成" prop="royalty">
                        <el-input disabled v-model="formDay.royalty" class="tams-form-item"></el-input>
                      </el-form-item>
                    </el-form>
                    <div>
                    </div>
                  </div>
                </div>

<!--                这个是某个时间段老师上课的学员统计，暂时去掉-->
<!--            <el-table stripe border :data="this.courseInfo.records">-->
<!--              <el-table-column :formatter="mapState"  label="状态" width="80">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button v-if="scope.row.attendance === 0" disabled size="mini" type="warning">已约</el-button>-->
<!--                  <el-button v-if="scope.row.attendance === 1" disabled size="mini" type="success">已学</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="date" label="日期"></el-table-column>-->
<!--              <el-table-column prop="time" label="时间" ></el-table-column>-->
<!--              <el-table-column prop="courseName" label="课程"></el-table-column>-->
<!--              <el-table-column prop="studentName" label="学员"></el-table-column>-->
<!--              &lt;!&ndash;        <el-table-column prop="weight" label="孕前体重"></el-table-column>&ndash;&gt;-->
<!--              &lt;!&ndash;        <el-table-column prop="height" label="身高"></el-table-column>&ndash;&gt;-->
<!--              &lt;!&ndash;        <el-table-column  :formatter="getChannel" label="了解渠道"></el-table-column>&ndash;&gt;-->
<!--              &lt;!&ndash;              <el-table-column&ndash;&gt;-->
<!--              &lt;!&ndash;                fixed="right"&ndash;&gt;-->
<!--              &lt;!&ndash;                label="操作"&ndash;&gt;-->
<!--              &lt;!&ndash;                width="130">&ndash;&gt;-->
<!--              &lt;!&ndash;                <template slot-scope="scope">&ndash;&gt;-->
<!--              &lt;!&ndash;                  <el-button type="primary" size="mini" @click="showUpdate(scope.row.id)">退卡</el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;                              <el-switch v-model="scope.row.enableState"&ndash;&gt;-->
<!--              &lt;!&ndash;                                         :active-value="1" :inactive-value="2"&ndash;&gt;-->
<!--              &lt;!&ndash;                                         active-color="#13ce66" inactive-color="#ff4949"&ndash;&gt;-->
<!--              &lt;!&ndash;                                         style="margin-left: 10px;"&ndash;&gt;-->
<!--              &lt;!&ndash;                                         @change="updateEnableState($event, scope.row.id)"></el-switch>&ndash;&gt;-->
<!--              &lt;!&ndash;                </template>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-table-column>&ndash;&gt;-->
<!--            </el-table>-->
<!--            <el-pagination-->
<!--              background-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--              :current-page="current"-->
<!--              :page-sizes="$consts.PAGE_SIZES"-->
<!--              :page-size="size"-->
<!--              style="margin-top: 10px;"-->
<!--              layout="total, sizes, prev, pager, next"-->
<!--              :total="data.total">-->
<!--            </el-pagination>-->
              </div>
                <el-table stripe border :data="this.formDay.feeDTO">
                  <el-table-column type="index" label="序号" width="50"></el-table-column>
                  <!--                  <el-table-column width="200" prop="cardName" label="卡名称"></el-table-column>-->
                  <!--                  <el-table-column :formatter="getCardTypeForCardTable" label="类别" ></el-table-column>-->
                  <el-table-column  prop ="date" label="上课日期" width="160px" ></el-table-column>
                  <el-table-column  prop="time" label="上课时间" width="160px" ></el-table-column>
                  <!--        <el-table-column prop="enterTime" label="已约未学金额"></el-table-column>-->
                  <el-table-column  prop="courseName" label="课程名称" width="160px"></el-table-column>
                  <el-table-column  :formatter="courseFeeFormatter" label="课时费" width="220px"></el-table-column>
                </el-table>
                <div style="margin-top: 5px;" class="el-dialog__footer">
                  <el-button  :loading="submitBtnLoading" size="small" type="primary" @click="fetchPayData('day')">计算</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
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
  name: 'TeacherCourse',
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: String,
      default: ''
    },
    typex: {
      type: String
    }
  },
  data () {
    return {
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
      formMonth: {
        feeDTO: []
      },
      formDay: {
        feeDTO: []
      },
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
    ...mapActions(['ConfirmPay', 'GetCustomerById', 'UpdateCustomerById', 'GetUploadFileById', 'uploadFile', 'DeleteFileById', 'GetPersonCard', 'GetPersonCourseInfo', 'GetTeacherCourseInfo', 'GetTeacherPayInfo']),
    handleClick (tab, event) {
      console.log(tab, event)
    },
    courseTImeFormatter (row, col) {
      return row.attendTimeStr + '-' + row.finishTimeStr
    },
    mapState (row, column) {
      var val = row.state
      if (val === 1) {
        return '已约'
      } else if (val === 2) {
        return '候补'
      } else if (val === 3) {
        return '取消'
      }
    },
    getTotal (row, column) {
      if (row.type === 1) {
        return row.validityPeriod
      } else if (row.type === 2) {
        return row.payTimes
      } else {
        return row.actualAmount
      }
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
    getAvailable (row, column) {
      if (row.type === 1) {
        return row.availablePeriod
      } else if (row.type === 2) {
        return row.availableCount
      } else {
        return row.availableAmount
      }
    },
    courseFeeFormatter (row, column) {
      if (row.courseFee === 0) {
        return '免费课'
      }
      return row.courseFee
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
    search () {
      var params = {}
      params.current = this.current
      params.size = this.size
      params.teacherId = this.id
      this.GetTeacherCourseInfo(params).then(res => {
        this.loading = false
        if (res) {
          this.courseInfo = res
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
    fetchData () {
      var params = {}
      params.current = this.current
      params.size = this.size
      params.teacherId = this.id
      params.startDate = this.datePicker[0].toString
      params.endDate = this.datePicker[1].toString
      this.submitBtnLoading = true
      this.GetTeacherCourseInfo(params).then(res => {
        this.loading = false
        if (res) {
          this.courseInfo = res
        }
        this.submitBtnLoading = false
      }).catch(() => {
        this.loading = false
        this.submitBtnLoading = false
      })
    },
    fetchPayData (type) {
      var params = {}
      params.teacherId = this.id

      params.month = this.monthPicker
      params.type = type
      params.startDate = this.datePicker[0]
      params.endDate = this.datePicker[1]
      console.log(this.month)
      this.submitBtnLoading = true
      this.GetTeacherPayInfo(params).then(res => {
        this.loading = false
        if (res) {
          if (type === 'month') {
            this.formMonth = res
            this.courseFee = this.formMonth.courseFee
            this.canConfirm = true
          }
          if (type === 'day') {
            this.formDay = res
          }
          this.submitBtnLoading = false
        }
      }).catch(() => {
        this.loading = false
        this.submitBtnLoading = false
      })
    },
    confirmPay () {
      var params = {}
      this.submitBtnLoading = true
      params = this.formMonth
      params.teacherId = this.id
      params.month = this.monthPicker
      params.type = 0 // 0是按月结算
      this.ConfirmPay(params).then(() => {
        this.submitBtnLoading = false
        Notification.success({
          title: '结算成功',
          message: ''
        })
        this.fetchPayData()
      }).catch(() => {
        this.submitBtnLoading = false
      })
    }

  },
  watch: {
    visible (val) {
      if (val) {
        console.log(this.typex)
        this.dialogVisible = val
        this.search()
      }
    }
  }
}
</script>
