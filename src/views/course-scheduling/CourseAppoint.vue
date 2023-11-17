<template>
  <el-dialog title="Appointment" width="900px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose">
    <div v-loading="loading">
      <el-input :placeholder="$t('name')" v-model="name"/>
      <el-table stripe border :data="data.records">
        <el-table-column type="index" label="No." width="50"></el-table-column>
        <el-table-column prop="cardName" label="Card Name" width="180"></el-table-column>
        <el-table-column :formatter="getCardType" label="Category"></el-table-column>
        <el-table-column prop="customerName" label="Name"></el-table-column>
        <el-table-column :formatter="getAvailable" label="Remaining Days (Visits, Amount)" width="250px"></el-table-column>
        <!--        <el-table-column label="Membership Card" width="200px">-->
        <!--          <template slot-scope="scope">-->
        <!--          <el-select  placeholder="Please select">-->
        <!--            <el-option-->
        <!--              @change="handleChange"-->
        <!--              v-for="item in scope.row.cardList"-->
        <!--              :key="item.id"-->
        <!--              :label="item.cardName"-->
        <!--              :value="item.id">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column prop="weight" label="Pre-pregnancy Weight"></el-table-column>-->
        <!--        <el-table-column prop="height" label="Height"></el-table-column>-->
        <!--        <el-table-column :formatter="getChannel" label="Channel"></el-table-column>-->
        <el-table-column
          fixed="right"
          label="Action"
          width="130">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="appoint(scope.row)">{{ $t('schedule_labels.appoint') }}</el-button>
            <!--            <el-switch v-model="scope.row.enableState"-->
            <!--                       :active-value="1" :inactive-value="2"-->
            <!--                       active-color="#13ce66" inactive-color="#ff4949"-->
            <!--                       style="margin-left: 10px;"-->
            <!--                       @change="updateEnableState($event, scope.row.id)"></el-switch>-->
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
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  name: 'CourseAppoint',
  props: {
    visible: {
      type: Boolean
    },
    id: [String, Number] // 课程scheduleId
  },
  data () {
    return {
      cardId: [],
      data: [],
      params: {},
      dialogVisible: false,
      members: {},
      current: 1,
      size: 10,
      loading: false,
      channelMap: ['大众点评', '传单', '微信群', '微信朋友圈', '搜索引擎', '朋友介绍', '母婴论坛', '合作月子中心', '其他合作伙伴'],
      name: '',
      chooseCardVisible: false,
      appointForm: {}
    }
  },
  methods: {
    ...mapActions(['GetCustomerPage', 'UpdateCustomerEnableStateById', 'GetCustomerSearch', 'GetCustomerCardSearch', 'Appoint']),
    appoint (row) {
      this.loading = true
      this.appointForm.customerId = row.customerId
      this.appointForm.cardId = row.cardId
      this.appointForm.scheduleId = this.id
      // 0是b端
      this.appointForm.endType = 0
      this.Appoint(this.appointForm).then(res => {
        this.loading = false
        this.$emit('on-success')
        this.dialogVisible = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleChange (value) {
      console.log(value)
      this.cardId = value
    },
    updateSuccess () {
      this.search()
      this.chooseCardVisible = false
    },
    init () {
      console.log('aa')
      this.search()
    },
    getChannel (row) {
      return this.channelMap[row.channel]
    },
    resetData () {
      this.form = {}
    },
    handleClose (done) {
      this.resetData()
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
      this.resetData()
      this.$emit('on-close')
      this.dialogVisible = false
    },
    search () {
      this.params.current = this.current
      this.params.size = this.size
      this.loading = true
      this.GetCustomerCardSearch(this.params).then(res => {
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
    // showChooseCard (id) {
    //   this.id = id
    //   this.chooseCardVisible = true
    // },
    getAvailable (row, column) {
      if (row.type === 1) {
        return row.availablePeriod
      } else if (row.type === 2) {
        return row.availableCount
      } else {
        return row.availableAmount
      }
    },
    getCardType (row, column) {
      if (row.type === 2) {
        return '次卡'
      } else if (row.type === 1) {
        return '时长卡'
      } else if (row.type === 3) {
        return '充值卡'
      }
    },
    fetchData () {
      this.params.current = this.current
      this.params.size = this.size
      this.loading = true
      this.params.name = this.name
      this.GetCustomerCardSearch(this.params).then(res => {
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
    }
  },
  mounted () {
    // this.init()
  },
  watch: {
    name () {
      delay(() => {
        this.fetchData()
      }, 1000)
    },
    visible (val) {
      if (val) {
        this.init()
        this.dialogVisible = val
        // this.search()
      }
    }
  }
}

</script>
