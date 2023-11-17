<template>
  <el-dialog
    :title="$t('edit')"
    width="450px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="tams-form-container"
      label-position="left"
    >
      <el-form-item
        :label="$t('course_labels.name')"
        prop="name"
      >
        <el-input v-model="form.name" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.courseDuration')"
        prop="duration"
      >
        <el-input-number
          v-model="form.duration"
          :step="$consts.COURSE_DURATION_STEP_MINUTE"
          :min="0"
          :max="360"
          class="tams-form-item"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.courseDescription')"
        prop="desc"   label-width="130px"
        class="tams-form-label"
      >
        <el-input
          v-model="form.description"
          class="tams-form-item"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.availableCardTypes')"
        label-width="120px"
        class="tams-form-label"
      >
        <template>
          <el-select
            v-model="form.cardTypeList"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            :placeholder="$t('placeholders.select')"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.maximumCapacity')"
        prop="maximum"
        class="tams-form-label" label-width="130px"
      >
        <el-input v-model="form.maximum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.minimumEnrollment')"
        prop="minimum"  label-width="140px"
        class="tams-form-label"
      >
        <el-input v-model="form.minimum" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.coursePrice')"
        prop="price"
        class="tams-form-label"
      >
        <el-input v-model="form.price" class="tams-form-item"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('course_labels.backgroundColor')"
        prop="backgroundColor"  label-width="140px"
      >
        <el-color-picker v-model="form.backgroundColor" :predefine="predefineColors">
        </el-color-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{ $t('cancel') }}</el-button>
      <el-button
        type="primary"
        :loading="submitBtnLoading"
        @click="submit"
      >{{ $t('confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UpdateCourse',
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
      predefineColors: [],
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      submitBtnLoading: false,
      options: [{
        value: 123,
        label: '常规团课卡'
      }, {
        value: 4,
        label: 'vip团课卡'
      }, {
        value: 5,
        label: '常规私教卡'
      }, {
        value: 6,
        label: '普拉提器械私教卡'
      }, {
        value: 7,
        label: '普拉提器械团课卡'
      }, {
        value: 8,
        label: '充值卡'
      }, {
        value: 9,
        label: '大礼包充值卡'
      }, {
        value: 10,
        label: '孕产卡'
      }],
      selectValue: []
    }
  },
  methods: {
    ...mapActions(['GetCourseById', 'UpdateCourseById', 'GetEffectiveList']),
    init () {
      this.GetEffectiveList().then((res) => {
        this.predefineColors = res
      }).catch(() => {
      })
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
      this.GetCourseById(this.id).then(res => {
        // var newArr1 = JSON.parse(res.cardType)
        // 将新的number 数组，绑定到select空间的v-model上
        this.selectValue = res.cardTypeList
        this.form = res
      }).catch(() => {
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.backgroundColor = this.form.backgroundColor === null ? '' : this.form.backgroundColor
          this.submitBtnLoading = true
          if (this.form.cardTypeList.indexOf(10) !== -1) {
            this.form.cardTypeList.push(15)
          }
          this.form.cardType = JSON.stringify(this.form.cardTypeList)
          this.UpdateCourseById({ id: this.id, data: this.form }).then(() => {
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
        this.init()
        this.search()
      }
    }
  }
}
</script>
