<template>
  <div>
    <el-dialog :title="$t('schedule_labels.details')" width="1000px"
               :visible.sync="dialogVisible"
               :before-close="handleClose">
      <el-form ref="form" :model="form" inline label-width="80px" class="tams-form-container">
        <el-form-item :label="$t('schedule_labels.date')">
          <el-input v-model="form.date" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.classroom')">
          <el-input v-model="form.classroomName" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.course')">
          <el-input v-model="form.courseName" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.teacher')">
          <el-input v-model="form.teacherName" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.attendTime')">
          <el-input v-model="form.attendTime" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.finishTime')">
          <el-input v-model="form.finishTime" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.cardType')">
          <el-input v-model="form.cardTypeList" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.capacity')">
          <el-input v-model="form.maximum" class="tams-form-item" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('schedule_labels.price')">
          <el-input v-model="form.price" class="tams-form-item" readonly></el-input>
        </el-form-item>
      </el-form>
      <div v-loading="loading">
        <el-table stripe border :data="data.records">
          <el-table-column :formatter="mapState" :label="$t('schedule_labels.status')" width="80">
            <template slot-scope="scope">
              <el-button v-if="scope.row.state === 1" disabled size="mini" type="success">{{ mapState(scope.row) }}
              </el-button>
              <el-button v-if="scope.row.state === 2" disabled size="mini" type="warning">{{ mapState(scope.row) }}
              </el-button>
              <el-button v-if="scope.row.state === 3" disabled size="mini" type="danger">{{ mapState(scope.row) }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="customerId" :label="$t('schedule_labels.studentId')" width="50"></el-table-column>
          <el-table-column prop="cardName" :label="$t('schedule_labels.cardName')" width="180px"></el-table-column>
          <el-table-column prop="name" :label="$t('schedule_labels.name')"></el-table-column>
          <el-table-column :label="$t('schedule_labels.memberDetails')">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="showDetail(scope.row.customerId)">{{$t('schedule_labels.details') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="appointTime" :label="$t('schedule_labels.appointmentTime')" width="160px"></el-table-column>
          <el-table-column prop="cancelTime" :label="$t('schedule_labels.cancelTime')" width="180px"></el-table-column>
          <el-table-column
            fixed="right"
            :label="$t('schedule_labels.actions')"
            width="270">
            <template slot-scope="scope">
              <el-button v-if="signInButtonVisible(scope.row)" type="warning" size="mini" @click="signIn(scope.row)">
                {{ $t('schedule_labels.signIn') }}
              </el-button>
              <el-button v-if="CancelSignInButtonVisible(scope.row)" type="warning" size="mini"
                         @click="cancelSignIn(scope.row)">{{ $t('schedule_labels.cancelSignIn') }}
              </el-button>
              <el-button v-if="cancelAppointButtonVisible(scope.row)" type="danger" size="mini"
                         @click="cancelAppoint(scope.row)">{{ $t('schedule_labels.cancelAppointment') }}
              </el-button>
              <el-button v-if="ReAppointVisible(scope.row)" type="danger" size="mini" @click="appoint(scope.row)">
                {{ $t('schedule_labels.reappoint') }}
              </el-button>
              <el-button v-if="scope.row.attendance === 1" size="mini" type="success" disabled>{{$t('schedule_labels.signedIn')}}
              </el-button>
              <el-button v-if="cutInSignInButtonVisible(scope.row)" type="warning" size="mini"
                         @click="signIn(scope.row)">{{ $t('schedule_labels.insertSignIn') }}
              </el-button>
              <el-button v-if="upWaitButtonVisible(scope.row)" type="success" icon="el-icon-top" size="mini"
                         @click="upWait(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="CourseAppointVisible=true" type="primary" slot="reference"
                   style="margin-right: 10px;float: left;">{{ $t('schedule_labels.appointment') }}
        </el-button>
        <el-popconfirm :title=" $t('schedule_labels.confirmDelete')" @onConfirm="remove">
          <el-button type="danger" slot="reference" style="margin-right: 10px;">{{ $t('schedule_labels.delete') }}</el-button>
        </el-popconfirm>
        <el-button type="primary" @click="updateCourseSchedulingVisible=true">{{ $t('schedule_labels.modify') }}</el-button>
      </div>
    </el-dialog>
    <UpdateCourseScheduling :visible="updateCourseSchedulingVisible"
                            :id="id"
                            @on-success="updateSuccess"
                            @on-close="updateCourseSchedulingVisible=false"></UpdateCourseScheduling>
    <CourseAppoint :visible="CourseAppointVisible"
                   :id="id"
                   @on-success="appointSuccess"
                   @on-close="CourseAppointVisible=false"></CourseAppoint>
    <CustomerDetail :visible="detailVisible"
                    :id="customerId"
                    @on-close="detailVisible=false"
                    @on-success="updateSuccess">
    </CustomerDetail>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import UpdateCourseScheduling from '@/views/course-scheduling/UpdateCourseScheduling'
import CourseAppoint from '@/views/course-scheduling/CourseAppoint'
import CustomerDetail from '@/views/customer/CustomerDetail'

export default {
  name: 'ViewCourseScheduling',
  components: { CourseAppoint, UpdateCourseScheduling, CustomerDetail },
  props: {
    visible: {
      type: Boolean
    },
    id: [Number, String]
  },
  data () {
    return {
      detailVisible: false,
      customerId: '',
      CourseAppointVisible: false,
      dialogVisible: false,
      updateCourseSchedulingVisible: false,
      form: {},
      data: {},
      current: 1,
      size: 10,
      loading: false,
      params: {},
      options: [{
        value: '123',
        label: '常规团课卡'
      }, {
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
        value: '8',
        label: '充值卡'
      }, {
        value: '9',
        label: '大礼包充值卡'
      }, {
        value: '10',
        label: '孕产卡'
      }],
      cancelForm: {},
      appointForm: {}
    }
  },
  methods: {
    ...mapActions(['GetCourseSchedulingById', 'RemoveCourseSchedulingById', 'GetAppointInfoByScheduleId', 'SignIn', 'CancelAppoint', 'Appoint', 'CancelSignIn', 'UpWait']),
    showDetail (id) {
      this.customerId = id
      this.detailVisible = true
    },
    appoint (row) {
      this.loading = true
      this.appointForm.customerId = row.customerId
      this.appointForm.cardId = row.cardId
      this.appointForm.scheduleId = this.id
      this.appointForm.endType = 0
      this.Appoint(this.appointForm).then(res => {
        console.log('ok')
        this.loading = false
        this.search()
        this.$emit('on-success')
        // this.dialogVisible = false
      }).catch(() => {
        this.loading = false
      })
    },
    search () {
      this.GetCourseSchedulingById(this.id).then((res) => {
        console.log(res)
        this.form = res
        this.form.attendTime = moment(res.attendTime, 'HH:mm:ss').format('HH:mm')
        this.form.finishTime = moment(res.finishTime, 'HH:mm:ss').format('HH:mm')
      }).catch(() => {
      })
      this.params.current = this.current
      this.params.size = this.size
      this.params.scheduleId = this.id
      this.loading = true
      this.GetAppointInfoByScheduleId(this.params).then(res => {
        this.loading = false
        if (res) {
          // for (var i = 0; i < res.records.length; i++) {
          //   var record = res.records[i]
          //   var date = new Date(record.enterTime)
          //   record.enterTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          // }
          this.data = res
        }
      }).catch(() => {
        this.loading = false
      })
    },
    remove () {
      this.RemoveCourseSchedulingById(this.id).then((res) => {
        this.$emit('on-success')
        this.dialogVisible = false
      }).catch(() => {
      })
    },
    handleClose (done) {
      this.$refs.form.resetFields()
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
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.dialogVisible = false
    },
    updateSuccess () {
      this.$emit('on-success')
      this.search()
      this.updateCourseSchedulingVisible = false
    },
    cardTypeFunc (row, column) {
      console.log(row)
      var key = parseInt(column.columnKey)
      // var key = parseInt(column.columnKey)
      if (row === key) {
        return '√'
      } else {
        return ''
      }
    },
    appointSuccess () {
      this.$emit('on-success')
      this.search()
      this.CourseAppointVisible = false
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
    cutInSignInButtonVisible (data) {
      console.log(data.attendance)
      console.log(data.state)
      if (data.attendance === 0 && data.state === 2) {
        return true
      } else {
        return false
      }
    },
    CancelSignInButtonVisible (data) {
      if (data.attendance === 1) {
        return true
      } else {
        return false
      }
    },
    signInButtonVisible (data) {
      console.log(data.attendance)
      console.log(data.state)
      if (data.attendance === 0 && data.state === 1) {
        return true
      } else {
        return false
      }
    },
    cancelAppointButtonVisible (data) {
      if (data.attendance === 0 && data.state !== 3) {
        return true
      } else {
        return false
      }
    },
    // 把候补上提
    upWaitButtonVisible (data) {
      if (data.attendance === 0 && data.state === 2) {
        return true
      } else {
        return false
      }
    },
    ReAppointVisible (data) {
      if (data.attendance === 0 && data.state === 3) {
        return true
      } else {
        return false
      }
    },
    // cancelAppointButtonVisible (data) {
    //   // 未签到的都可以取消预约
    //   if (data.attendance === 1 && data.state === 1) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    signIn (row) {
      var param = {}
      param.customerId = row.customerId
      param.scheduleId = this.id
      param.cardId = row.cardId
      this.SignIn(param).then(res => {
        this.loading = false
        this.search()
        this.$emit('on-success')
        // this.dialogVisible = false
      }).catch(() => {
        this.loading = false
      })
    },
    cancelSignIn (row) {
      var param = {}
      param.customerId = row.customerId
      param.scheduleId = this.id
      param.cardId = row.cardId
      this.CancelSignIn(param).then(res => {
        this.loading = false
        this.search()
        this.$emit('on-success')
        // this.dialogVisible = false
      }).catch(() => {
        this.loading = false
      })
    },
    upWait (row) {
      var param = {}
      param.customerId = row.customerId
      param.scheduleId = this.id
      param.cardId = row.cardId
      this.UpWait(param).then(res => {
        this.loading = false
        this.search()
        this.$emit('on-success')
        // this.dialogVisible = false
      }).catch(() => {
        this.loading = false
      })
    },
    cancelAppoint (row) {
      this.loading = true
      this.cancelForm.customerId = row.customerId
      this.cancelForm.cardId = row.cardId
      this.cancelForm.scheduleId = this.id
      this.cancelForm.endType = 0
      this.CancelAppoint(this.cancelForm).then(res => {
        this.loading = false
        this.search()
        this.$emit('on-success')
        // this.dialogVisible = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.search()
        this.dialogVisible = val
        console.log(this.scheduleId)
      }
    }
  }
}
</script>
