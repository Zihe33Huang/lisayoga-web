<template>
  <el-dialog :title="$t('trainer_labels.add')" width="450px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left" class="tams-form-container">
      <el-form-item :label="$t('trainer_labels.name')" prop="name" :placeholder="$t('trainer_labels.name')">
        <el-input v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
<!--      <el-form-item :label="$t('trainer_labels.nickname')" prop="name" :placeholder="$t('trainer_labels.nickname')">-->
<!--        <el-input v-model="form.akaName" class="tams-form-item"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('trainer_labels.type')" prop="name" :placeholder="$t('trainer_labels.select')">
        <template>
          <el-select
            v-model="form.type"
            collapse-tags
            style="margin-left: 20px;"
            :placeholder="$t('trainer_labels.select')">
            <el-option
              v-for="item in teacherType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.personalImage')">
        <el-upload
          class="upload-demo" ref="upload"
          action="http://localhost:12010/teacher"
          :auto-upload="false"
          :on-preview="handlePreview" name="picFile"
          :on-remove="handleRemove" :limit="3"
          :file-list="fileList" :on-change="handleChange"
          list-type="picture">
          <el-button style="" size="small" type="primary">{{ $t('actions.upload') }}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.birthdate')" prop="name" :placeholder="$t('trainer_labels.selectDate')">
        <div class="block">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            :placeholder="$t('trainer_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.phoneNumber')" prop="name" :placeholder="$t('trainer_labels.phoneNumber')">
        <el-input v-model="form.phoneNum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.basicSalary')" prop="name" :placeholder="$t('trainer_labels.basicSalary')">
        <el-input v-model="form.basicSalary" class="tams-form-item"></el-input>
      </el-form-item>
<!--      <el-form-item :label="$t('trainer_labels.foodCarAllowance')" prop="name" :placeholder="$t('trainer_labels.foodCarAllowance')">-->
<!--        <el-input v-model="form.allowance" class="tams-form-item"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('trainer_labels.commissionRate')" prop="name" :placeholder="$t('trainer_labels.commissionRate')">
        <el-input style="width: 70px" v-model="form.royaltyRate" class="tams-form-item"></el-input>%
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.entryDate')" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.enterTime"
            type="date"
            :placeholder="$t('trainer_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.yogaQualification')" prop="name">
        <el-input type="textarea" v-model="form.qualification" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.personalIntroduction')" prop="name">
        <el-input v-model="form.introduction" type="textarea" class="tams-form-item"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{ $t('actions.cancel') }}</el-button>
      <el-button type="primary" :loading="submitBtnLoading" @click="submit">{{ $t('actions.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SaveTeacher',
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      fileList: [],
      disabled: false,
      dialogVisible: false,
      teacherType: [{
        value: 0,
        label: '全职'
      }, {
        value: 1,
        label: '兼职'
      }],
      form: {
        files: []
      },
      rules: {
        name: [
          {
            required: true,
            message: '此项不能为空',
            trigger: 'blur'
          }
        ]
      },
      submitBtnLoading: false,
      hasFile: false
    }
  },
  methods: {
    ...mapActions(['SaveTeacher']),
    handlePreview (file) {
      this.fileList.push({ name: 'x.jpeg', url: file.url })
    },

    //  handleSuccess(file) {
    // console.log(file);
    // this.$store.dispatch('person/setAvatar', '头像地址');
    // },
    handleAvatarSuccess (res, file) {
      this.headUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'img/jpeg'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    },
    handleClose (done) {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      done()
    },
    handleRemove (file, fileList) {
      if (!fileList.length) {
        this.hasFile = false
      }
      var index = 0
      for (let i = 0; i < this.form.files.length; i++) {
        if (this.form.files[i].name === file.name) {
          index = i
          break
        }
      }
      this.form.files.splice(index, 1)
    },
    handleChange (file, fileList) {
      console.log('触发' + file)
      if (fileList.length >= 4) {
        return
      }
      if (fileList.length === 1) {
        this.hasFile = true
      }
      this.form.files.push(file)
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.dialogVisible = false
    },
    submit () {
      console.log('aaa')
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          this.SaveTeacher(this.form).then(() => {
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
      }
    }
  }
}
</script>
