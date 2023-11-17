<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>{{ $t('course') }}</span>
    </div>
    <el-row class="tams-search-container">
      <el-col :span="18">
        <el-radio-group v-model="params.enableState" size="small" @change="search">
          <el-radio-button :label="1">{{ $t('enabled') }}</el-radio-button>
          <el-radio-button :label="2">{{ $t('disabled') }}</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" class="tams-operate-item" @click="saveCourseVisible=true">{{ $t('add') }}</el-button>
      </el-col>
    </el-row>

    <div v-loading="loading">
      <div style="margin-bottom: 5px;">
        <i style="margin-left: 15px;" class="el-icon-search"></i>
        <el-input :placeholder="$t('course_labels.courseName')" v-model="courseName" style="width: 150px; margin-left: 15px" />
        <el-button @click="search" style="margin-left: 3px">{{ $t('search') }}</el-button>
      </div>
      <el-table stripe border :data="data.records">
        <el-table-column type="index" :label="$t('index')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('course_labels.name')" width="200"></el-table-column>
        <el-table-column prop="cardType" :label="$t('course_labels.availableCardTypes')" width="200" label-class-name="cardType">
          <el-table-column v-for="(item) in options" :key="item.value" :label="item.label" :formatter="cardTypeFunc" :column-key="item.value" width="120"></el-table-column>
        </el-table-column>
        <el-table-column prop="duration" :label="$t('course_labels.duration')" width="100"></el-table-column>
        <el-table-column prop="maximum" :label="$t('course_labels.capacity')" width="100"></el-table-column>
        <el-table-column prop="minimum" :label="$t('course_labels.minimumStart')" width="100"></el-table-column>
        <el-table-column prop="price" :label="$t('course_labels.coursePrice')" width="100"></el-table-column>
        <el-table-column :label="$t('course_labels.backgroundColor')">
          <template slot-scope="scope">
            <div v-if="scope.row.backgroundColor" :style="{ height: '23px', width: '100%', borderRadius: '5px', backgroundColor: scope.row.backgroundColor }"></div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('course_labels.actions')" width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showUpdate(scope.row.id)">{{ $t('edit') }}</el-button>
            <el-switch
              v-model="scope.row.enableState"
              :active-value="1"
              :inactive-value="2"
              active-color="#13ce66"
              inactive-color="#ff4949"
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
    <SaveCourse :visible="saveCourseVisible"
                @on-close="saveCourseVisible=false"
                @on-success="saveSuccess">
    </SaveCourse>
    <UpdateCourse :visible="updateCourseVisible"
                  :id="id"
                  @on-close="updateCourseVisible=false"
                  @on-success="updateSuccess">
    </UpdateCourse>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import SaveCourse from '@/views/course/SaveCourse'
import UpdateCourse from '@/views/course/UpdateCourse'

export default {
  name: 'Course',
  components: { UpdateCourse, SaveCourse },
  computed: {
    options () {
      return [
        {
          value: '1',
          label: this.$t('courseList.timeCard')
        },
        {
          value: '2',
          label: this.$t('courseList.visitCard')
        },
        {
          value: '3',
          label: this.$t('courseList.rechargeCard')
        }
      ]
    }
  },
  data () {
    return {
      courseName: '',
      data: [],
      params: {},
      form: {},
      current: 1,
      size: 10,
      saveCourseVisible: false,
      updateCourseVisible: false,
      id: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['GetCoursePage', 'UpdateCourseEnableStateById']),
    init () {
      this.params.enableState = 1
    },
    search () {
      this.params.current = this.current
      this.params.size = this.size
      this.loading = true
      this.params.courseName = this.courseName
      this.GetCoursePage(this.params).then(res => {
        this.loading = false
        if (res) {
          this.data = res
          this.courseName = ''
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
      this.saveCourseVisible = false
    },
    showUpdate (id) {
      this.id = id
      this.updateCourseVisible = true
    },
    updateSuccess () {
      this.search()
      this.updateCourseVisible = false
    },
    updateEnableState (enableState, id) {
      this.UpdateCourseEnableStateById({ id, enableState }).then(res => {
        this.search()
      })
    },
    cardTypeFunc (row, column) {
      var key = parseInt(column.columnKey)
      if (row.cardTypeList.indexOf(key) >= 0) {
        return '√'
      } else {
        return ''
      }
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
