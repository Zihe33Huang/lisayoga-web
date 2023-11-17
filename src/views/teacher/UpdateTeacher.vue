<template>
  <el-dialog :title="$t('actions.edit')" width="550px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <el-form-item :label="$t('trainer_labels.name')" prop="name">
        <el-input v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
<!--      <el-form-item :label="$t('trainer_labels.nickname')" prop="name">-->
<!--        <el-input v-model="form.akaName" class="tams-form-item"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item :label="$t('trainer_labels.type')" prop="name">
        <template>
          <el-select
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
        <el-upload
          class="upload-demo"  ref="upload"
          action="http://localhost:12010/teacher"
          :auto-upload="false"
          name="picFile"
          :on-remove="handleRemove"   :limit = "3"
          :file-list="this.fileList"  :on-change = "handleChange"
          list-type="picture">
          <el-button style="" size="small" type="primary">{{$t('trainer_labels.upload')}}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.birthday')" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            :placeholder="$t('trainer_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.phoneNumber')" label-width="120px" prop="name">
        <el-input v-model="form.phoneNum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.basicSalary')" label-width="100px" prop="name">
        <el-input v-model="form.basicSalary" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.allowance')" label-width="90px" prop="name">
        <el-input v-model="form.allowance" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.commissionRate')" label-width="140px" prop="name">
        <el-input style="width: 70px" v-model="form.royaltyRate" class="tams-form-item"></el-input>%
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.entryTime')" label-width="90px" prop="name">
        <div class="block">
          <el-date-picker
            v-model="form.enterTime"
            type="date"
            :placeholder="$t('trainer_labels.selectDate')">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.yogaQualification')" label-width="110px" prop="name">
        <el-input type="textarea" v-model="form.qualification" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trainer_labels.personalIntroduction')" label-width="100px" prop="name">
        <el-input v-model="form.introduction" type="textarea" class="tams-form-item"></el-input>
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
import moment from 'moment'

export default {
  name: 'UpdateTeacher',
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
      fileList: [],
      dialogVisible: false,
      teacherType: [{
        value: 0,
        label: '$t("trainer_labels.fulltime")'
      }, {
        value: 1,
        label: '兼职'
      }],
      form: { pictureUrlList: [], files: [] },
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
    handleRemove (file, fileList) {
      var index = 0
      if (this.form.files !== undefined) {
        for (let i = 0; i < this.form.files.length; i++) {
          if (this.form.files[i].name === file.name) {
            index = i
            break
          }
        }
        this.form.files.splice(index, 1)
      }
      if (this.fileList !== undefined) {
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name === file.name) {
            index = i
            break
          }
        }
        this.fileList.splice(index, 1)
      }
    },
    handleChange (file, fileList) {
      console.log('触发' + file)
      console.log(fileList)
      console.log(this.fileList)
      // if (fileList.length >= 4) {
      //   return
      // }
      this.form.files.push(file)
    },
    handleClose (done) {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.form = { pictureUrlList: [], files: [] }
      this.fileList = []
      done()
    },
    close () {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.form = { pictureUrlList: [], files: [] }
      this.fileList = []
      this.dialogVisible = false
    },
    search () {
      this.GetTeacherById(this.id).then(res => {
        this.form = res
        this.form.files = []
        this.form.pictureUrlList = []
        var i = 1
        res.pictureList.forEach(p => {
          this.fileList.push({ name: i++ + '', url: p })
        })
        console.log('init: ', this.fileList)
      }).catch(() => {
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          this.fileList.forEach(p => {
            this.form.pictureUrlList.push(p.url)
          })
          this.form.birthday = moment(this.form.birthday).format('yyyy-MM-DD')
          this.form.enterTime = moment(this.form.enterTime).format('yyyy-MM-DD')
          this.UpdateTeacherById({ id: this.id, data: this.form }).then(() => {
            this.submitBtnLoading = false
            this.$refs.form.resetFields()
            this.$emit('on-success')
            this.form = { pictureUrlList: [], files: [] }
            this.fileList = []
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
