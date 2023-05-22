<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="http://101.133.146.88/lisaPic/logo.jpg" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
        ref="LoginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user" :placeholder="$t('login.username')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-more-outline" :placeholder="$t('login.password')"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            round
            style="background-color: lightcoral; border: 1px solid #eee"
            @click="login"
          >{{$t('login.login')}}</el-button
          >
          <el-button
            type="info"
            round
            style="background-color: #ddd; border: 1px solid #eee"
            @click="resetForm"
          >{{$t('login.reset')}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="position: absolute; top: 90%; left: 50%">
      <a href="https://beian.miit.gov.cn">沪ICP备2022015114号</a>
    </div>
  </div>
</template>

<script>
// 导入登录接口模块
import { Notification } from 'element-ui'

export default {
  data () {
    return {
      // Form data object
      loginForm: {
        username: '',
        password: ''
      },
      // Form data validation rules
      rules: {
        username: [
          { required: true, message: this.$t('login.validation.usernameRequired'), trigger: 'blur' },
          {
            min: 2,
            max: 25,
            message: this.$t('login.validation.usernameLength'),
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: this.$t('login.validation.passwordRequired'), trigger: 'blur' },
          { min: 6, max: 15, message: this.$t('login.validation.passwordLength'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // Login method with validation
    login () {
      if (this.loginForm.username === 'lisayoga' && this.loginForm.password === '000') {
        this.$router.push('/bend')
      } else {
        Notification.error({
          title: this.$t('login.notification.errorTitle'),
          message: this.$t('login.notification.errorMsg')
        })
      }
      // this.$refs.LoginFormRef.validate(async (result) => {
      //   if (!result) return
      //   const loginData = { ...this.loginForm }
      //   // 发起请求
      //   const { data: res } = await loginAPI(loginData)
      //   console.log(res)
      //
      //   // 显示提示信息
      //   this.$message(res.meta.msg)
      //   // 如果失败  则停止执行
      //   if (res.meta.status !== 200) {
      //
      //   } else {
      //     // 如果成功
      //     // 将返回的token 保存到 sessionStorage
      //     console.log(11)
      //     window.sessionStorage.setItem('token', res.data.token)
      //     // 跳转到home页面
      //     this.$router.push('/home')
      //   }
      // })
    },
    // 添加表单重置方法
    resetForm () {
      this.$refs.LoginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: lightcoral;
  height: 100vh;
  width: 100%;
  background-image: url("http://101.133.146.88/lisaPic/back.png");
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px #ddd; //阴影
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px; //头像图片和头像盒子的距离
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  .avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
  background-color: #eee;
}
</style>
