<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>{{$t('menu.Member')}}</span>
    </div>
    <el-row class="tams-search-container">
      <el-col :span="18">
        <el-radio-group v-model="params.enableState" size="small" @change="search">
          <el-radio-button :label="1">{{$t('enable')}}</el-radio-button>
          <el-radio-button :label="2">{{$t('disable')}}</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" class="tams-operate-item" @click="saveCustomerVisible=true;customerType = '1'">{{$t('buttons.addExperienceMember')}}</el-button>
        <el-button style="margin-right: 5px;" type="primary" size="small" class="tams-operate-item" @click="saveCustomerVisible=true;customerType = '0'">{{$t('buttons.addMember')}}</el-button>
      </el-col>
    </el-row>
    <div v-loading="loading">
      <div style="margin-bottom: 5px;">
        <i style="margin-left: 15px;" class="el-icon-search" ></i>
        <el-input :placeholder="$t('placeholders.enterMemberName')" v-model="name" style="width: 150px;margin-left: 15px"/>
        <el-button @click="fetchData" style="margin-left: 3px">{{$t('buttons.search')}}</el-button>
        <el-button style="margin-right: 5px;" type="primary" size="small" id="HideOps" @click="showOperationFunc">{{$t('buttons.hideOperation')}}</el-button>
      </div>
      <el-table stripe border :data="data.records">
        <el-table-column type="index" :label="$t('index')" width="60"></el-table-column>
        <el-table-column :label="$t('tableHeaders.type')" width="105">
          <template slot-scope="scope">
            <el-button v-if="scope.row.type === 0" disabled size="mini" type="success">{{$t('memberTypes.formalMember')}}</el-button>
            <el-button v-if="scope.row.type === 1" disabled size="mini" type="warning">{{$t('memberTypes.experienceMember')}}</el-button>
            <el-button v-if="scope.row.type === 2" disabled size="mini" type="success">{{$t('memberTypes.formalMember')}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('tableHeaders.name')"></el-table-column>
<!--        <el-table-column prop="wechat" :label="$t('tableHeaders.wechatNumber')"></el-table-column>-->
        <el-table-column prop="age" :label="$t('tableHeaders.age')"></el-table-column>
        <el-table-column prop="enterTime" :label="$t('tableHeaders.joiningDate')"></el-table-column>
        <el-table-column prop="phoneNum" :label="$t('tableHeaders.phoneNumber')"></el-table-column>
        <el-table-column prop="weight" :label="$t('tableHeaders.weight')"></el-table-column>
        <el-table-column prop="height" :label="$t('tableHeaders.height')"></el-table-column>
<!--        <el-table-column :formatter="getChannel" :label="$t('tableHeaders.channel')"></el-table-column>-->
        <el-table-column
          fixed="right"
          :label="$t('tableHeaders.operations')"
          width="550" v-if="showOperation">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 0 || scope.row.type === 2">
<!--              <el-button type="primary" size="mini" @click="showOpenCoupon(scope.row)">{{$t('buttons.verifyCoupon')}}</el-button>-->
              <el-button type="primary" size="mini" @click="showOpenCard(scope.row)">{{$t('buttons.openCard')}}</el-button>
              <el-button type="primary" size="mini" @click="showRefund(scope.row.id)">{{$t('buttons.refund')}}</el-button>
              <el-button type="primary" size="mini" @click="showDetail(scope.row)">{{$t('buttons.details')}}</el-button>
              <el-button type="primary" size="mini" @click="showUpdate(scope.row)">{{$t('buttons.edit')}}</el-button>
              <el-button type="primary" size="mini" @click="showUploadFile(scope.row.id)">{{$t('buttons.uploadContract')}}</el-button>
              <el-button type="danger" size="mini" @click="deleteCustomer(scope.row.id)">{{$t('buttons.delete')}}</el-button>

            <el-switch v-model="scope.row.enableState"
                       :active-value="1" :inactive-value="2"
                       active-color="#13ce66" inactive-color="#ff4949"
                       style="margin-left: 10px;"
                       @change="updateEnableState($event, scope.row.id)"></el-switch>
            </div>
            <div v-else>
              <el-button type="primary" size="mini" @click="showOpenCoupon(scope.row)">验券</el-button>
              <el-button type="primary" size="mini" @click="showUpdateAndZhuanzheng(scope.row.id)">转正</el-button>
              <el-button type="primary" size="mini" @click="showDetail(scope.row)">详情</el-button>
              <el-button type="primary" size="mini" @click="showUpdate(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteCustomer(scope.row.id)">删除</el-button>
            </div>
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
    <SaveCustomer :visible="saveCustomerVisible" :customer-type="customerType"
                 @on-close="saveCustomerVisible=false"
                 @on-success="saveSuccess">
    </SaveCustomer>
    <UpdateCustomer :visible="updateCustomerVisible" :customer-type="customerType"
                   :id="id"
                   @on-close="updateCustomerVisible=false"
                   @on-success="updateSuccess">
    </UpdateCustomer>
    <OpenCard :visible="openCardVisible" :customer-type="customerType"
                    :id="id"
                    @on-close="openCardVisible=false"
                    @on-success="updateSuccess">
    </OpenCard>
    <OpenCoupon :visible="openCoupon" :customer-type="customerType"
              :id="id"
              @on-close="openCoupon=false"
              @on-success="updateSuccess">
    </OpenCoupon>
    <Refund :visible="refundVisible"
              :id="id"
              @on-close="refundVisible=false"
              @on-success="updateSuccess">
    </Refund>
    <CustomerDetail :visible="detailVisible" :customer-type="customerType"
            :id="id"
            @on-close="detailVisible=false"
            @on-success="updateSuccess">
    </CustomerDetail>
    <UploadFile :visible="uploadFileVisible"
                    :id="id"
                    @on-close="uploadFileVisible=false"
                    @on-success="updateSuccess">
    </UploadFile>
  </el-card>
</template>
<script>
import { mapActions } from 'vuex'
import SaveCustomer from '@/views/customer/SaveCustomer'
import UpdateCustomer from '@/views/customer/UpdateCustomer'
import OpenCard from '@/views/customer/OpenCard'
import Refund from '@/views/customer/Refund'
import CustomerDetail from '@/views/customer/CustomerDetail'
import UploadFile from '@/views/customer/UploadFile'
import OpenCoupon from '@/views/customer/OpenCoupon'
export default {
  name: 'Customer',
  components: { UpdateCustomer, SaveCustomer, OpenCard, Refund, CustomerDetail, UploadFile, OpenCoupon },
  data () {
    return {
      customerType: '0',
      name: '',
      data: [],
      params: {},
      form: {},
      current: 1,
      size: 10,
      saveCustomerVisible: false,
      updateCustomerVisible: false,
      uploadFileVisible: false,
      openCardVisible: false,
      openCoupon: false,
      refundVisible: false,
      detailVisible: false,
      id: '',
      loading: false,
      channelMap: ['大众点评', '传单', '微信群', '微信朋友圈', '搜索引擎', '朋友介绍', '母婴论坛', '合作月子中心', '其他合作伙伴'],
      showOperation: true
    }
  },
  methods: {
    ...mapActions(['GetCustomerPage', 'UpdateCustomerEnableStateById', 'GetCustomerSearch', 'DeleteCustomerById']),
    showOperationFunc () {
      this.showOperation = !this.showOperation
      // location.reload()
    },
    fetchData () {
      this.params.current = this.current
      this.params.size = this.size
      this.loading = true
      this.params.name = this.name
      this.GetCustomerSearch(this.params).then(res => {
        this.loading = false
        if (res) {
          for (var i = 0; i < res.records.length; i++) {
            var record = res.records[i]
            var date = new Date(record.enterTime)
            record.enterTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          }
          this.data = res
          this.name = ''
        }
      }).catch(() => {
        this.loading = false
      })
    },
    init () {
      this.params.enableState = 1
    },
    getChannel (row) {
      return this.channelMap[row.channel]
    },
    getCustomerType (row) {
      if (row.type === 0) {
        return '正式会员'
      } else {
        return '体验会员'
      }
    },
    search () {
      this.params.current = this.current
      this.params.size = this.size
      this.loading = true
      this.GetCustomerPage(this.params).then(res => {
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
      this.saveCustomerVisible = false
    },
    showUpdate (row) {
      this.id = row.id
      this.customerType = row.type
      this.updateCustomerVisible = true
    },
    showUpdateAndZhuanzheng (id) {
      this.customerType = 2 // 2代表转正的更新
      this.id = id
      this.updateCustomerVisible = true
    },
    showUploadFile (id) {
      this.id = id
      this.uploadFileVisible = true
    },
    showDetail (row) {
      this.id = row.id
      this.customerType = row.type
      this.detailVisible = true
    },
    showOpenCard (row) {
      this.id = row.id
      this.customerType = row.type
      this.openCardVisible = true
    },
    showOpenCoupon (row) {
      this.id = row.id
      this.customerType = row.type
      this.openCoupon = true
    },
    showRefund (id) {
      this.id = id
      this.refundVisible = true
    },
    updateSuccess () {
      this.search()
      this.updateCustomerVisible = false
      this.refundVisible = false
      this.openCardVisible = false
      this.detailVisible = false
      this.uploadFileVisible = false
      this.saveCustomerVisible = false
      this.openCoupon = false
    },
    updateEnableState (enableState, id) {
      this.UpdateCustomerEnableStateById({ id, enableState }).then(res => {
        this.search()
      })
    },
    deleteCustomer (id) {
      this.DeleteCustomerById({ id }).then(res => {
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
