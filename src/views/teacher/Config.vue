<template>
  <div>
    <el-dialog :title="$t('detail')" width="440px"
               :visible.sync="dialogVisible"
               :before-close="handleClose" >
      <div v-loading="loading">
        <div style="margin-bottom: 5px;">
          <i style="margin-left: 15px;" class="el-icon-search" ></i>
          <el-input :placeholder="$t('placeholders.memberName')" v-model="name" style="width: 150px;margin-left: 15px"/>
          <el-button @click="search" style="margin-left: 3px">{{$t('buttons.search')}}</el-button>
        </div>
        <el-table stripe border :data="this.data.records">
          <el-table-column type="index" :label="$t('index')" width="50"></el-table-column>
          <el-table-column prop="courseName" :label="$t('trainer_labels.courseName')" width="180px"></el-table-column>
          <el-table-column prop="courseFee" :label="$t('trainer_labels.courseFee')" width="160px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.courseFee" :placeholder="$t('placeholders.courseFee')" class="tams-form-item"></el-input>
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
        <el-button type="primary" @click="save">{{$t('buttons.save')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Config',
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    id: [Number, String]
  },
  data () {
    return {
      name: '',
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
      cancelForm: {},
      appointForm: {}
    }
  },
  methods: {
    ...mapActions(['UpdateConfig', 'GetCourseFeeConfig', 'GetCourseSchedulingById', 'RemoveCourseSchedulingById', 'GetAppointInfoByScheduleId', 'SignIn', 'CancelAppoint', 'Appoint', 'CancelSignIn']),

    save () {
      this.UpdateConfig(this.data.records).then(() => {
        this.submitBtnLoading = false
        this.$emit('on-success')
        this.data = {}
        this.dialogVisible = false
      }).catch(() => {
        this.submitBtnLoading = false
      })
    },
    search () {
      var params = {}
      params.name = this.name
      params.teacherId = this.id
      params.size = this.size
      params.current = this.current
      this.GetCourseFeeConfig(params).then((res) => {
        console.log(res)
        this.data = res
        this.name = ''
      }).catch(() => {
      })
    },
    handleClose (done) {
      this.$emit('on-close')
      this.data = {}
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
      this.$emit('on-close')
      this.dialogVisible = false
      this.data = {}
    }

    // cancelAppointButtonVisible (data) {
    //   // 未签到的都可以取消预约
    //   if (data.attendance === 1 && data.state === 1) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
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
