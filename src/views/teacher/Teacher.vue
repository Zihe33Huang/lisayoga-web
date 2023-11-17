<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>{{ $t('trainer_labels.coach') }}</span>
    </div>
    <el-row class="tams-search-container">
      <el-col :span="18">
        <el-radio-group v-model="params.enableState" size="small" @change="search">
          <el-radio-button :label="1">{{ $t('enable') }}</el-radio-button>
          <el-radio-button :label="2">{{ $t('disable') }}</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" class="tams-operate-item" @click="saveTeacherVisible=true">{{ $t('actions.add') }}</el-button>
      </el-col>
    </el-row>
    <div v-loading="loading">
      <el-table stripe border :data="data.records">
        <el-table-column type="index" :label="$t('index')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('trainer_labels.name')"></el-table-column>
<!--        <el-table-column prop="$t('trainer_labels.nickname')" :label="$t('trainer_labels.nickname')"></el-table-column>-->
        <el-table-column :formatter="teacherTpe" :label="$t('trainer_labels.type')"></el-table-column>
        <el-table-column prop="age" :label="$t('trainer_labels.age')"></el-table-column>
        <el-table-column prop="enterTime" :label="$t('trainer_labels.entryDate')"></el-table-column>
<!--        <el-table-column prop="$t('trainer_labels.currentMonthSalary')" :label="$t('trainer_labels.currentMonthSalary')">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button v-if="scope.row.isPaidThisMonth === '已结算'" round="round"  disabled size="mini" type="success">{{scope.row.isPaidThisMonth}}</el-button>-->
<!--            <el-button v-if="scope.row.isPaidThisMonth === '未结算'" round="round"   disabled size="mini" type="danger">{{scope.row.isPaidThisMonth}}</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column :prop="$t('trainer_labels.previousMonthSalary')" :label="$t('trainer_labels.previousMonthSalary')">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button v-if="scope.row.isPaidLastMonth === '已结算'"  round="round" disabled size="mini" type="success">{{scope.row.isPaidLastMonth}}</el-button>-->
<!--            <el-button v-if="scope.row.isPaidLastMonth === '未结算'" round="round"  disabled size="mini" type="danger">{{scope.row.isPaidLastMonth}}</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="phoneNum" :label="$t('trainer_labels.phoneNumber')"></el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('trainer_labels.action')"
          width="400">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showUpdate(scope.row.id)">{{ $t('actions.edit') }}</el-button>
            <el-button type="primary" size="mini" @click="showDetail(scope.row.id)">{{ $t('detail') }}</el-button>
            <el-button type="primary" size="mini" @click="showConfig(scope.row.id)">{{ $t('actions.configureHourlyRate') }}</el-button>
<!--            <el-button type="primary" size="mini" @click="showCourse(scope.row.id, scope.row.type)">{{ $t('actions.salaryStatistics') }}</el-button>-->
            <el-switch v-model="scope.row.enableState"
                       :active-value="1" :inactive-value="2"
                       active-color="#13ce66" inactive-color="#ff4949"
                       style="margin-left: 10px;"
                       @change="updateEnableState($event, scope.row.id)"></el-switch>
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
    <SaveTeacher :visible="saveTeacherVisible"
                 @on-close="saveTeacherVisible=false"
                 @on-success="saveSuccess">
    </SaveTeacher>
    <UpdateTeacher :visible="updateTeacherVisible"
                   :id="id"
                   @on-close="updateTeacherVisible=false"
                   @on-success="updateSuccess">
    </UpdateTeacher>
    <TeacherDetail :visible="detailVisible"
                   :id="id"
                   @on-close="detailVisible=false"
                   @on-success="updateSuccess">
    </TeacherDetail>
    <TeacherCourse :visible="courseVisible"
                   :id="id" :typex:="this.typex"
                   @on-close="courseVisible=false"
                   @on-success="updateSuccess">
    </TeacherCourse>
    <SavePay :visible="courseVisible"
                   :id="id" :typex:="this.typex"
                   @on-close="courseVisible=false"
                   @on-success="updateSuccess">
    </SavePay>
    <Config :visible="configVisible"
                   :id="id"
                   @on-close="configVisible=false"
                   @on-success="updateSuccess">
    </Config>
  </el-card>
</template>
<script>
import { mapActions } from 'vuex'
import SaveTeacher from '@/views/teacher/SaveTeacher'
import UpdateTeacher from '@/views/teacher/UpdateTeacher'
import TeacherDetail from '@/views/teacher/TeacherDetail'
import TeacherCourse from '@/views/teacher/TeacherCourse'
import Config from '@/views/teacher/Config'
import SavePay from '@/views/teacher/savePay'

export default {
  name: 'Teacher',
  components: { SavePay, TeacherDetail, UpdateTeacher, SaveTeacher, TeacherCourse, Config },
  data () {
    return {
      data: [],
      params: {},
      form: {},
      current: 1,
      size: 10,
      saveTeacherVisible: false,
      updateTeacherVisible: false,
      detailVisible: false,
      courseVisible: false,
      configVisible: false,
      id: '',
      loading: false,
      typex: ''
    }
  },
  methods: {
    ...mapActions(['GetTeacherPage', 'UpdateTeacherEnableStateById']),
    init () {
      this.params.enableState = 1
    },
    teacherTpe (row, column) {
      var type = row.type
      if (type === 0) {
        return this.$t('trainer_labels.fulltime')
      }
      return this.$t('trainer_labels.parttime')
    },
    search () {
      this.params.current = this.current
      this.params.size = this.size
      this.loading = true
      this.GetTeacherPage(this.params).then(res => {
        this.loading = false
        if (res) {
          for (var i = 0; i < res.records.length; i++) {
            var record = res.records[i]
            var date = new Date(record.enterTime)
            record.enterTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          }
          this.data = res
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.search()
    },
    handleCurrentChange (val) {
      this.current = val
      this.search()
    },
    saveSuccess () {
      this.search()
      this.saveTeacherVisible = false
    },
    showUpdate (id) {
      this.id = id
      this.updateTeacherVisible = true
    },
    showDetail (id) {
      this.id = id
      this.detailVisible = true
    },
    showCourse (id, type) {
      this.id = id
      this.typex = type.toString()
      console.log(this.typex)
      this.courseVisible = true
    },
    showConfig (id) {
      this.id = id
      this.configVisible = true
    },
    updateSuccess () {
      this.search()
      this.updateTeacherVisible = false
      this.configVisible = false
    },
    updateEnableState (enableState, id) {
      this.UpdateTeacherEnableStateById({ id, enableState }).then(res => {
        this.search()
      })
    }
  },
  mounted () {
    this.init()
    this.search()
  }
}
</script>

<style scoped>

</style>
