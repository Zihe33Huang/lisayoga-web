<template>
  <el-dialog :title="(this.customerType === 2 && this.form.enterTime == null) ? '体验会员转正': '编辑'" width="450px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="name">
        <el-input v-model="form.wechat" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item  label="出生日期" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="手机号码" prop="name">
        <el-input v-model="form.phoneNum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 0|| form.type === 2" label="入会时间" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.enterTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item v-if="form.type === 0|| form.type === 2" label="体重" prop="name">
        <el-input  v-model="form.weight" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 0|| form.type === 2" label="身高" prop="name">
        <el-input v-model="form.height"  class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item label="了解渠道" prop="name" v-if="customerType === 0">
        <template>
          <el-select
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
      <el-form-item label="了解渠道" prop="name" v-else>
        <template>
          <el-select
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
        <el-input v-model="form.channelExt" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.channel === '9'" label="具体地方" prop="name">
        <el-input v-model="form.channelExt" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 1" label="是否练过瑜伽" prop="name" label-width="120px">
        <template>
          <el-radio v-model="form.hasPracticed" :label="1">是</el-radio>
          <el-radio v-model="form.hasPracticed" :label="0">否</el-radio>
        </template>
      </el-form-item>
      <el-form-item v-if="form.type !== 1 " label="备注" prop="name">
        <el-input v-model="form.remark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 1 " label="是否有运动损失或疾病" prop="name" label-width="170px">
        <el-radio v-model="form.hasHurt" :label="1">是</el-radio>
        <el-radio v-model="form.hasHurt" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item v-if="form.type === 1" label="体验目的" prop="name">
        <el-input v-model="form.aim" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button v-if="form.type === 0 || form.type === 1" type="primary" :loading="submitBtnLoading" @click="submit">确定</el-button>
      <el-button v-else-if="this.form.enterTime == null" type="warning" :loading="submitBtnLoading" @click="submit">确定转正</el-button>
      <el-button v-else type="primary" :loading="submitBtnLoading" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UpdateCustomer',
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
      dialogVisible: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: '该项不能为空',
            trigger: 'blur'
          }
        ]
      },
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
    ...mapActions(['GetCustomerById', 'UpdateCustomerById']),
    getChannel (v) {
      return this.channelMap[v]
    },
    handleClose (done) {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.form = {}
      done()
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.form = {}
      this.dialogVisible = false
    },
    search () {
      this.GetCustomerById(this.id).then(res => {
        res.channel = res.channel.toString()
        this.form = res
        this.form.type = this.customerType
      }).catch(() => {
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          this.submitBtnLoading = true
          this.form.type = this.customerType
          console.log(this.form.channel)
          if (parseInt(this.form.channel) !== 5 && parseInt(this.form.channel) !== 9) {
            this.form.channelExt = ''
          }
          this.UpdateCustomerById({ id: this.id, data: this.form }).then(() => {
            this.submitBtnLoading = false
            this.$refs.form.resetFields()
            this.form = {}
            this.$emit('on-success')
            this.dialogVisible = false
          }).catch(() => {
            this.submitBtnLoading = false
          })
        }
      })
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.dialogVisible = val
        this.search()
        this.form.type = parseInt(this.customerType)
        console.log(this.customerType)
        console.log(this.form)
      }
    }
  }
}
</script>
