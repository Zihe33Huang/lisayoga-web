<template>
  <el-row>
    <el-col :style="{width: '1200px'}">
      <el-table stripe border :data="data"     show-summary :summary-method="getSummaries">
        <el-table-column prop="teacherName" label="教练" width="100"></el-table-column>
        <el-table-column  label="类型" width="105">
          <template slot-scope="scope">
          <el-button v-if="scope.row.payType === 0" round="round"  disabled size="mini" type="success">按月结算</el-button>
          <el-button v-if="scope.row.payType === 1" round="round"   disabled size="mini" type="danger">灵活结算</el-button>
          </template>
        </el-table-column>
        <el-table-column :formatter="teacherTpe" label="类型" width="100"></el-table-column>
        <el-table-column  sortable prop="month" label="月份" width="100"></el-table-column>
        <el-table-column sortable prop="count" label="上课数"></el-table-column>
        <el-table-column prop="courseFee" label="课时费"></el-table-column>
        <el-table-column prop="royalty" label="提成工资"></el-table-column>
        <el-table-column prop="basicSalary" label="基本工资"></el-table-column>
        <el-table-column prop="allowance" label="饭贴车贴"></el-table-column>
        <el-table-column sortable prop="totalSalary" label="总工资"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from 'vuex'
import echarts from 'echarts'

export default {
  name: 'TeacherPayList',
  components: { },
  props: {
    startDate: String,
    endDate: String
  },
  data () {
    return {
      data: [],
      width: '600px'
    }
  },
  methods: {
    ...mapActions(['GetReportRechergerCount', 'GetTeacherPayList']),
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (index === 4 || index === 5 || index === 6 || index === 7) {
          sums[index] = '/'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    teacherTpe (row, column) {
      var type = row.type
      if (type === 0) {
        return '全职'
      }
      return '兼职'
    },
    payType (row, column) {
      var type = row.payType
      if (type === 0) {
        return '按月结算'
      }
      return '灵活结算'
    },
    search () {
      this.GetTeacherPayList({
        startDate: this.startDate,
        endDate: this.endDate
      }).then((res) => {
        if (res) {
          this.data = res
          this.draw()
        }
      }).catch(() => {
      })
    },
    draw () {
      const chart = echarts.init(document.getElementById('TeacherPayList'))
      chart.setOption({
        title: {
          text: 'Top10'
        },
        grid: {
          left: '15%'
        },
        series: [
        ]
      })
    }
  },
  watch: {
    startDate (val) {
      this.search()
    },
    endDate (val) {
      this.search()
    }
  }
}
</script>

<style scoped>

</style>
