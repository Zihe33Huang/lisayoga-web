<template>
  <el-dialog :title="$t(form.type)" :width="form.type === 0 ? '450px' : '800px'"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <el-form-item :label="$t('member_labels.name')" prop="name">
        <el-input v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('member_labels.wechat')" prop="name">
        <el-input v-model="form.wechat" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item  :label="$t('member_labels.birthdate')" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            :placeholder="$t('member_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('member_labels.phoneNumber')" prop="name">
        <el-input v-model="form.phoneNum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 0" :label="$t('member_labels.entryTime')" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.enterTime"
            type="date"
            :placeholder="$t('member_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item v-if="form.type === 0" :label="$t('member_labels.weight')" prop="name">
        <el-input style="width: 80px" v-model="form.weight" class="tams-form-item"></el-input> kg
      </el-form-item>
      <el-form-item v-if="form.type === 0" :label="$t('member_labels.height')" prop="name">
        <el-input style="width: 80px" v-model="form.height"  class="tams-form-item"></el-input> cm
      </el-form-item>
      <el-form-item :label="$t('member_labels.channel')" prop="name" v-if="customerType === 0">
        <template>
          <el-select
            v-model="form.channel"
            collapse-tags
            style="margin-left: 20px;"
            :placeholder="$t('member_labels.select')">
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
            v-model="form.channel"
            collapse-tags
            :placeholder="$t('member_labels.select')">
            <el-option
              v-for="item in optionsExperience"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item v-if="form.channel ==='5'" :label="$t('member_labels.friendName')" prop="name">
        <el-input v-model="form.channelExt" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.channel === '9'" :label="$t('member_labels.specificPlace')" prop="name">
        <el-input v-model="form.channelExt" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type === 1" :label="$t('member_labels.experienceYoga')" prop="name" label-width="120px">
        <template>
          <el-radio v-model="form.hasPracticed" label="1">{{$t('member_labels.yes')}}</el-radio>
          <el-radio v-model="form.hasPracticed" label="0">{{$t('member_labels.no')}}</el-radio>
        </template>
      </el-form-item>
      <el-form-item v-if="form.type === 1" :label="$t('member_labels.sportInjury')" prop="name" label-width="170px">
        <el-radio v-model="form.hasHurt" label="1">{{$t('member_labels.yes')}}</el-radio>
        <el-radio v-model="form.hasHurt" label="0">{{$t('member_labels.no')}}</el-radio>
      </el-form-item>
      <el-form-item v-if="form.type === 1" :label="$t('member_labels.experienceAim')" prop="name">
        <el-input v-model="form.aim" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{$t('buttons.cancel')}}</el-button>
      <el-button type="primary" :loading="submitBtnLoading" @click="submit">{{$t('buttons.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SaveCustomer',
  props: {
    visible: {
      type: Boolean
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
      }]
    }
  },
  methods: {
    ...mapActions(['SaveCustomer']),
    handleClose (done) {
      this.$refs.form.resetFields()
      this.form = {}
      this.$emit('on-close')
      done()
    },
    close () {
      this.$refs.form.resetFields()
      this.form = {}
      this.$emit('on-close')
      this.dialogVisible = false
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          this.SaveCustomer(this.form).then(() => {
            this.submitBtnLoading = false
            this.$refs.form.resetFields()
            this.$emit('on-success')
            this.dialogVisible = false
            this.form = {}
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
        this.form.type = parseInt(this.customerType)
      }
    }
  }
}
</script>
