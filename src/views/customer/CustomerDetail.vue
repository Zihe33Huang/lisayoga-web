<template>
  <el-dialog title="详情" width="1000px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <el-form-item :label="$t('name')" prop="name">
        <el-input disabled v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.wechat')" prop="name">
        <el-input disabled v-model="form.wechat" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.birthdate')" prop="name">
        <div class="block">
          <el-date-picker
            disabled
            v-model="form.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('member_labels.phoneNumber')" prop="name">
        <el-input disabled v-model="form.phoneNum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.joiningDate')" prop="name">
        <div class="block">
          <el-date-picker
            disabled
            v-model="form.enterTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('member_labels.weight')" prop="name">
        <el-input disabled v-model="form.weight" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.height')" prop="name">
        <el-input disabled v-model="form.height" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.channel')" prop="name" v-if="customerType === 0">
        <template>
          <el-select
            disabled
            v-model="form.channel"
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item :label="$t('member_labels.channel')" prop="name" v-else>
        <template>
          <el-select
            disabled
            v-model="form.channel"
            collapse-tags
            placeholder="请选择">
            <el-option
              v-for="item in optionsExperience"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item v-if="form.channel ==='5'" label="朋友名字" prop="name">
        <el-input disabled v-model="form.channelExt" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.channel === '9'" label="具体地方" prop="name">
        <el-input disabled v-model="form.channelExt" class="tams-form-item"></el-input>
      </el-form-item>
    </el-form>
<!--    <div slot="footer" class="dialog-footer">-->
<!--      <el-button @click="close">取消</el-button>-->
<!--      <el-button type="primary" :loading="submitBtnLoading" @click="submit">确定</el-button>-->
<!--    </div>-->
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="会员卡信息" name="first" >
          <div v-loading="loading">
                  <el-table stripe border :data="this.cardData">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="240">
                      <template slot-scope="scope">
                        <el-switch v-model="scope.row.enableState"
                                   :active-value="1" :inactive-value="2"
                                   active-color="#13ce66" inactive-color="#ff4949"
                                   style="margin-left: 10px;"
                                   @change="updateEnableState($event, scope.row.id)"></el-switch>
                        <el-button style="margin-left: 5px" v-if="scope.row.isFree === 1" type="success" size="mini" @click="updateIsFree(1 , scope.row.id)">赠送</el-button>
                        <el-button style="margin-left: 5px" v-if="scope.row.isFree === 2" type="warning" size="mini" @click="updateIsFree(2, scope.row.id)">取消赠送</el-button>
                        <el-button style="margin-left: 5px" v-if="(scope.row.cancelTimes >= 4)" type="danger" size="mini" >惩罚</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column width="200" prop="createTIme" label="办卡日期"></el-table-column>
                    <el-table-column width="200" prop="cardName" label="卡名称"></el-table-column>
                    <el-table-column width="200" prop="teacherName" label="开单教练"></el-table-column>
                    <el-table-column :formatter="getCardTypeForCardTable" label="类别" ></el-table-column>
                    <el-table-column prop="paymentAmount" label="总付款金额" width="120px"></el-table-column>
                    <el-table-column  :formatter="getTotal" label="总天数(次数、金额)" width="160px" ></el-table-column>
                    <el-table-column  :formatter="getUsed" label="已用天数(次数、金额)" width="160px" ></el-table-column>
                    <!--        <el-table-column prop="enterTime" label="已约未学金额"></el-table-column>-->
                    <el-table-column  :formatter="getAvailable" label="剩余天数(次数、金额)" width="160px"></el-table-column>
                    <el-table-column width="200" prop="cancelTimes" label="取消次数"></el-table-column>
                    <el-table-column label="有效期">
                      <el-table-column label="开始时间" width="200">
                        <template slot-scope="scope">
                        <div class="block">
                          <el-date-picker
                            v-model="scope.row.openCardDay"  @change="updateOpenCardDay($event, scope.row.id)"
                            type="date" style="width: 140px;"
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="结束时间" width="200">
                        <template slot-scope="scope">
                        <div class="block">
                          <el-date-picker
                            v-model="scope.row.endCardDay" @change="updateEndCardDay($event, scope.row.id)"
                            type="date" style="width: 140px;"
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                    <!--                    <el-table-column prop="useAmount" label="已用金额"></el-table-column>-->
<!--                    <el-table-column prop="availableAmount" label="剩余金额"></el-table-column>-->
<!--                    <el-table-column  prop="useCount" label="已用次数"></el-table-column>-->
<!--                    <el-table-column  prop="availableCount" label="剩余次数"></el-table-column>-->
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
        </el-tab-pane>
        <el-tab-pane label="约课信息" name="second">
          <div v-loading="loading">
            <el-table stripe border :data="this.courseInfo.records">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column :formatter="mapState"  label="状态" width="80">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.attendance === 0 && scope.row.appointState == 1" disabled size="mini" type="warning">已约</el-button>
                  <el-button v-if="scope.row.attendance === 1" disabled size="mini" type="success">已学</el-button>
                  <el-button v-if="scope.row.attendance === 0 && scope.row.appointState == 3" disabled size="mini" type="danger">取消</el-button>

                </template>
              </el-table-column>
              <el-table-column prop="cardName" label="卡名称"></el-table-column>
              <el-table-column :formatter="getCardTypeForAppointTable" label="类别" ></el-table-column>
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column :formatter="courseTImeFormatter" label="上课时间"></el-table-column>
              <el-table-column prop="courseName" label="课程"></el-table-column>
              <el-table-column prop="teacherName" label="教练"></el-table-column>
              <!--        <el-table-column prop="weight" label="孕前体重"></el-table-column>-->
              <!--        <el-table-column prop="height" label="身高"></el-table-column>-->
              <!--        <el-table-column  :formatter="getChannel" label="了解渠道"></el-table-column>-->
<!--              <el-table-column-->
<!--                fixed="right"-->
<!--                label="操作"-->
<!--                width="130">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button type="primary" size="mini" @click="showUpdate(scope.row.id)">退卡</el-button>-->
<!--                              <el-switch v-model="scope.row.enableState"-->
<!--                                         :active-value="1" :inactive-value="2"-->
<!--                                         active-color="#13ce66" inactive-color="#ff4949"-->
<!--                                         style="margin-left: 10px;"-->
<!--                                         @change="updateEnableState($event, scope.row.id)"></el-switch>-->
<!--                </template>-->
<!--              </el-table-column>-->
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
        </el-tab-pane>
        <el-tab-pane label="文件信息" name="third" v-if="this.customerType !== 1">
          <div v-loading="loading">
            <el-table stripe border :data="fileList">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="fileName" label="文件名称"></el-table-column>
              <!--        <el-table-column prop="url" label="文件地址"></el-table-column>-->
              <el-table-column  label="操作">
                <template slot-scope="scope">
                  <el-button
                    style="margin-right: 10px;"
                    size="mini"
                    icon="el-icon-download"
                    @click="download(scope.row)"
                  >下载文件</el-button>
                  <el-popconfirm title="确定要删除吗？" @onConfirm="deleteFile(scope.row)">
                    <el-button
                      size="mini"
                      type="danger"
                      slot="reference"
                    >删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { Notification } from 'element-ui'

export default {
  name: 'CustomerDetail',
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
      loading: false,
      size: 0,
      activeName: 'first',
      current: 0,
      data: {},
      cardData: [],
      courseInfo: [],
      dialogVisible: false,
      form: {},
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
      optionsExperience: [{
        value: '0',
        label: '大众点评'
      }, {
        value: '2',
        label: '微信群'
      }, {
        value: '3',
        label: '微信朋友圈'
      }, {
        value: '5',
        label: '朋友介绍'
      }, {
        value: '9',
        label: '其他'
      }],
      channel: '',
      channelMap: ['大众点评', '传单', '微信群', '微信朋友圈', '搜索引擎', '朋友介绍', '母婴论坛', '合作月子中心', '其他合作伙伴']
    }
  },
  methods: {
    ...mapActions(['changeDate', 'GetCustomerById', 'UpdateCustomerById', 'GetUploadFileById', 'uploadFile', 'DeleteFileById', 'GetPersonCard', 'GetPersonCourseInfo', 'UpdateCardEnableStateById', 'UpdateIsFreeById']),
    updateOpenCardDay (event, id) {
      const param = {}
      param.type = 0
      param.date = event
      param.cardId = id
      this.changeDate(param).then(res => {
        Notification.success({
          title: '配置成功',
          message: ''
        })
        this.search()
      })
    },
    updateEndCardDay (event, id) {
      const param = {}
      param.type = 1
      param.date = event
      param.cardId = id
      this.changeDate(param).then(res => {
        Notification.success({
          title: '配置成功',
          message: ''
        })
        this.search()
      })
    },
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
    updateEnableState (enableState, id) {
      this.UpdateCardEnableStateById({ id, enableState }).then(res => {
        this.search()
      })
    },
    updateIsFree (isFree, id) {
      console.log(isFree)
      this.UpdateIsFreeById({ id, isFree }).then(res => {
        this.search()
      })
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
    getUsed (row, column) {
      if (row.type === 1) {
        return row.usePeriod
      } else if (row.type === 2) {
        return row.useCount
      } else {
        return row.useAmount
      }
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
      this.$refs.form.resetFields()
      this.$emit('on-close')
      done()
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.dialogVisible = false
    },
    search () {
      this.loading = true
      this.GetCustomerById(this.id).then(res => {
        res.channel = res.channel.toString()
        // this.$set(this.form, res)
        this.form = res
      }).catch(() => {
      })
      this.GetUploadFileById(this.id).then(res => {
        this.fileList = res
      }).catch(() => {
      })
      var params = {}
      params.current = this.current
      params.size = this.size
      params.customerId = this.id

      this.GetPersonCourseInfo(params).then(res => {
        this.loading = false
        if (res) {
          this.courseInfo = res
        }
      }).catch(() => {
        this.loading = false
      })
      this.personInfo.customerId = this.id
      this.GetPersonCard(this.personInfo).then(res => {
        this.loading = false
        if (res) {
          this.cardData = res
        }
      }).catch(() => {
        this.loading = false
      })
    },
    download (row) {
      // window.open(process.env.VUE_APP_BASE_API + "/hospital/file/downloadFile?tPath=" + tPath)
      const a = document.createElement('a')
      console.log(row)
      a.setAttribute('download', row.fileName)
      a.setAttribute('target', '_blank')
      a.setAttribute('href', row.url)
      a.click()
    },
    deleteFile (row) {
      this.submitBtnLoading = true
      console.log(row)
      console.log(row.id)
      this.DeleteFileById(row.id).then(() => {
        this.submitBtnLoading = false
      }).catch(() => {
        this.submitBtnLoading = false
      })
      this.search()
    },
    handleCurrentChange (val) {
      this.current = val
      this.search()
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
        this.dialogVisible = val
        this.search()
      }
    }
  }
}
</script>
