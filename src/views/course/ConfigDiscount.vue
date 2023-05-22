<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>配置课程折扣</span>
    </div>

    <div v-loading="loading">
      <el-table :data="tableData" border stripe style="width: 100%;">
        <el-table-column prop="name" label="价格区间">
          <template slot-scope="scope">
            <span>超过或等于</span>
            <el-input style="width: 100px; margin-left: 5px" v-if="scope.row.edit" v-model="scope.row.value" placeholder="xx"></el-input>
            <span v-else>{{scope.row.value}}</span>
            <span>元</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardType" label="课程" width="200" label-class-name="cardType">
          <el-table-column  v-for ="(item, index) in course " :key="item.value"
                            :label="item.label"   :column-key="item.value"
                            width="120">
            <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.discount[index]" >
              <i slot="suffix" > % </i>
            </el-input>
              <span v-else>{{scope.row.discount[index]}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-button type="text" size="medium" @click="confirmAdd(scope.row)">
                <i class="el-icon-check" aria-hidden="true"></i>
              </el-button>
              <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                <i class="el-icon-delete" aria-hidden="true"></i>
              </el-button>
            </div>
            <div v-else>
              <el-button type="text" size="medium" @click="editData(scope.row)">
                <i class="el-icon-edit" aria-hidden="true"></i>
              </el-button>
              <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                <i class="el-icon-delete" aria-hidden="true"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click="addData">添加数据</el-button>
      <el-divider></el-divider>
      <el-button :loading="submitBtnLoading" @click="submitData">提交 </el-button>
    </div>
  </el-card>
</template>
<script>
import { mapActions } from 'vuex'
import { Notification } from 'element-ui'

export default {
  name: 'ConfigDiscount',
  components: { },
  data () {
    return {
      submitBtnLoading: false,
      value: [4, 8],
      tableData: [],
      loading: false,
      course: [{
        value: '123',
        label: '常规团课'
      }, {
        value: '4',
        label: 'vip团课'
      }, {
        value: '5',
        label: '常规私教'
      }, {
        value: '6',
        label: '普拉提器械私教'
      }, {
        value: '7',
        label: '普拉提器械团课'
      }, {
        value: '10',
        label: '孕产课'
      }]
    }
  },
  methods: {
    ...mapActions(['SaveCourseConfig', 'GetCourseConfig']),
    init () {
      this.search()
    },
    search () {
      this.GetCourseConfig().then(res => {
        // var newArr1 = JSON.parse(res.cardType)
        // 将新的number 数组，绑定到select空间的v-model上
        this.tableData = res
      }).catch(() => {
      })
    },
    // 添加
    addData () {
      var array = new Array(this.course.length)
      for (let i = 0; i < array.length; i++) {
        array[i] = 100
      }
      this.tableData.push({
        edit: true,
        discount: array
      })
    },
    // 确认添加
    confirmAdd (row) {
      if (row.value === undefined) {
        Notification.error({
          title: '错误提示',
          message: '请输入值'
        })
        return
      }
      if (row.value === null || row.value < 0) {
        Notification.error({
          title: '错误提示',
          message: '请输入正确的值'
        })
        return
      }
      // for (let i = 0; i < this.tableData.length - 1; i++) {
      //   if (parseInt(this.tableData[i].value) > parseInt(row.value)) {
      //     Notification.error({
      //       title: '错误提示',
      //       message: '请价格顺序输入'
      //     })
      //     return
      //   }
      // }
      row.edit = false
    },
    // 修改
    editData (row) {
      row.edit = true
    },
    // 删除
    deleteData (row, index) {
      this.tableData.splice(index, 1)
    },
    submitData () {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].edit !== false) {
          Notification.error({
            title: '错误提示',
            message: '请确认输入'
          })
        }
      }
      this.submitBtnLoading = true
      this.SaveCourseConfig(this.tableData).then(() => {
        this.submitBtnLoading = false
        Notification.success({
          title: '配置成功',
          message: ''
        })
      }).catch(() => {
        this.submitBtnLoading = false
      })
    }
  },
  mounted () {
    this.init()
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
