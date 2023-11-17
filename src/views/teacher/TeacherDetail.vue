<template>
  <el-dialog :title="$t('dialog.title')" width="450px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <el-form-item :label="$t('trainer_labels.name')" prop="name">
        <el-input disabled v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
<!--      <el-form-item :label="$t('trainer_labels.nickname')" prop="name">-->
<!--        <el-input disabled v-model="form.akaName" class="tams-form-item"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('trainer_labels.type')" prop="name">
        <template>
          <el-select
            disabled
            v-model="form.type"
            collapse-tags
            style="margin-left: 20px;"
            :placeholder="$t('trainer_labels.selectType')">
            <el-option
              v-for="item in teacherType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.profilePicture')" label-width="110px" prop="name">
        <el-image disabled="true" style="width: 30%;" v-for="item in form.pictureList"  :key="item" :src="item"></el-image>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.birthday')" prop="name">
        <div class="block">
          <el-date-picker
            disabled
            v-model="form.birthday"
            type="date"
            :placeholder="$t('trainer_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.phoneNumber')" label-width="120px" prop="name">
        <el-input disabled v-model="form.phoneNum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.basicSalary')" label-width="100px" prop="name">
        <el-input disabled v-model="form.basicSalary" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.allowance')" label-width="100px" prop="name">
        <el-input disabled v-model="form.allowance" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.commissionRate')" label-width="135px" prop="name">
        <el-input disabled style="width: 70px" v-model="form.royaltyRate" class="tams-form-item"></el-input>%
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.entryTime')"  label-width="110px" prop="name">
        <div class="block">
          <el-date-picker
            disabled
            v-model="form.enterTime"
            type="date"
            :placeholder="$t('trainer_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.yogaQualification')" label-width="110px" prop="name">
        <el-input disabled type="textarea" v-model="form.qualification" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.personalIntroduction')" label-width="110px" prop="name">
        <el-input disabled v-model="form.introduction" type="textarea" class="tams-form-item"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{$t('trainer_labels.cancel')}}</el-button>
      <el-button type="primary" :loading="submitBtnLoading" @click="submit">{{$t('trainer_labels.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TeacherDetail',
  props: {
    visible: {
      type: Boolean
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogVisible: false,
      form: {},
      teacherType: [{
        value: 0,
        label: '全职'
      }, {
        value: 1,
        label: '兼职'
      }],
      rules: {
        name: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ]
      },
      submitBtnLoading: false
    }
  },
  methods: {
    ...mapActions(['GetTeacherById', 'UpdateTeacherById']),
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
      this.GetTeacherById(this.id).then(res => {
        this.form = res
      }).catch(() => {
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          this.UpdateTeacherById({ id: this.id, data: this.form }).then(() => {
            this.submitBtnLoading = false
            this.$refs.form.resetFields()
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
      }
    }
  }
}
</script>
