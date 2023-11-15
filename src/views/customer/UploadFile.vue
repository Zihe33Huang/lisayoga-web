<template>
  <el-dialog title="上传" width="550px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :visible.sync="dialogVisible"
             :before-close="handleClose" >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px"  label-position="left" class="tams-form-container">
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="http://localhost:12010/teacher"
          drag
          :auto-upload="false" :limit = "3"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change = "handleChange"
          :file-list="fileList"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">{{$t('tips')}}<em>{{$t('ClickUpload')}}</em></div>
          <div class="el-upload__tip" slot="tip">{{$t('fileLimit')}}</div>
        </el-upload>
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
  name: 'UploadFile',
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
      submitBtnLoading: false,
      fileList: [],
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: '该项不能为空',
        //     trigger: 'blur'
        //   }
        // ]
      },
      form: {
        files: []
      }
    }
  },
  methods: {
    ...mapActions(['SaveCustomer', 'openCard', 'uploadFile']),
    handleClose (done) {
      this.$refs.form.resetFields()
      this.$emit('on-close')
      this.form = { files: [] }
      this.fileList = []
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
      this.form = { files: [] }
      this.fileList = []
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitBtnLoading = true
          this.uploadFile({ id: this.id, data: this.form }).then(() => {
            this.submitBtnLoading = false
            this.$refs.form.resetFields()
            this.$emit('on-success')
            this.dialogVisible = false
            this.form = { files: [] }
            this.fileList = []
          }).catch(() => {
            this.submitBtnLoading = false
          })
        }
      })
    },
    handlePreview (file) {
      this.fileList.push({ name: 'x.jpeg', url: file.url })
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
