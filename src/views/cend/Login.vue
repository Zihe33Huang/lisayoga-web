<template>
  <div>
    <van-nav-bar  title="登录" fixed :z-index="10"></van-nav-bar>
    <div class="nav-con align-center login-con"
         :style="{'background-image':'url(http://101.133.146.88/lisaPic/login_back.png)'}">
      <div class="top-area">
        <van-image src="http://101.133.146.88/lisaPic/vant_logo.png" class="top-logo"></van-image>
        <div>LisaYoga</div>
      </div>
      <!--用户名密码登录-->
      <div>
        <van-cell-group>
          <!--输入账号-->
          <van-field v-model="phoneNum" left-icon="http://101.133.146.88/lisaPic/login_user.png" required clearable label="用户名"
                     placeholder="请输入手机号" label-align="left" size="large" maxlength="20"></van-field>
          <!--输入密码-->
<!--          <van-field v-model="password" left-icon="http://101.133.146.88/lisaPic/login_pass.png" label="密码"-->
<!--                     placeholder="请输入密码(随便填)" size="large" required clearable-->
<!--                     :type="showPassword?'text':'password'" maxlength="20"-->
<!--                     :right-icon="'http://101.133.146.88/lisaPic/eye_'+(showPassword?'open':'close')+'.png'"-->
<!--                     @click-right-icon="showPassword=!showPassword"></van-field>-->
        </van-cell-group>
        <!--账密登录按钮-->
        <div class="button-con">
          <van-button type="danger" round class="login-btn" :disabled = "phoneNum == ''" @click="onLoginClick">登录
          </van-button>
<!--          <van-button type="danger" plain round class="login-btn" @click="loginWay=3-loginWay">短信登录</van-button>-->
        </div>
      </div>
      <!--验证码登陆-->
<!--      <div v-else>-->
<!--        <van-cell-group>-->
<!--          &lt;!&ndash;输入账号&ndash;&gt;-->
<!--          <van-field v-model="userName" left-icon="http://101.133.146.88/lisaPic/login_user.png" required clearable label="手机号"-->
<!--                     placeholder="请输入手机号(随便填)" label-align="left" size="large" maxlength="11"></van-field>-->
<!--          &lt;!&ndash;填写验证码&ndash;&gt;-->
<!--          <van-field v-model="smsCode" clearable label="验证码" placeholder="请输入短信验证码" size="large"-->
<!--                     left-icon="envelop-o" maxlength="6" required>-->
<!--            <van-button slot="button" size="small" plain type="danger" class="send-btn" @click="onSMSSend"-->
<!--                        :disabled="!isSendSMSEnable">-->
<!--              {{getSendBtnText}}-->
<!--            </van-button>-->
<!--          </van-field>-->
<!--        </van-cell-group>-->
<!--        &lt;!&ndash;账密登录按钮&ndash;&gt;-->
<!--        <div class="button-con">-->
<!--          <van-button type="danger" round class="login-btn"  @click="onSMSLogin">登录-->
<!--          </van-button>-->
<!--          <van-button type="danger" plain round class="login-btn" @click="loginWay=3-loginWay">账号登录</van-button>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
function getQueryVariable (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return pair[1] }
  }
  return (false)
}
export default {
  name: 'login-page',
  data () {
    return {
      userCode: '',
      phoneNum: '',
      userInfo: {}
    }
  },
  mounted () {
    var queryVariable = getQueryVariable('code')
    this.userCode = queryVariable
    // var cookie = this.getCookie('userInfo')
    var userInfo = localStorage.getItem('userInfo')
    // console.log(cookie)
    if (userInfo !== null) {
      console.log(userInfo)
      this.$router.push('/home')
    }
  },
  beforeDestroy () {
    if (this.smsCountInterval) {
      clearInterval(this.smsCountInterval)
    }
  },
  methods: {
    ...mapActions(['GetCustomerByPhone', 'setCookie', 'getCookie']),
    // 模拟登陆
    setCookie (name, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      // eslint-disable-next-line camelcase
      document.cookie = name + '=' + escape(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },
    getCookie (name) {
      if (document.cookie.length > 0) {
        // eslint-disable-next-line camelcase
        var c_start = document.cookie.indexOf(name + '=')
        // eslint-disable-next-line camelcase
        if (c_start !== -1) {
          // eslint-disable-next-line camelcase
          c_start = c_start + name.length + 1
          // eslint-disable-next-line camelcase
          var c_end = document.cookie.indexOf(';', c_start)
          // eslint-disable-next-line camelcase
          if (c_end === -1) c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ''
    },
    onLoginClick () {
      // this._showLoading()
      // setTimeout(() => {
      //   this._dismissLoading()
      //   this.saveUserInfo()
      //   this._showConfirm('登陆成功, 去设置手势密码？', () => {
      //     this._routeReplace('GestureCreate')
      //   }, this._routerBack)
      // }, 1000)
      var queryVariable = getQueryVariable('code')
      var params = {}
      params.phoneNum = this.phoneNum
      params.code = queryVariable.toString()
      this.GetCustomerByPhone(params).then(res => {
        // this.$set(this.form, res)
        this.userInfo = res
        this.saveUserInfo(this.userInfo)
        this.setCookie('userInfo', JSON.stringify(this.userInfo), 20)
        this.$router.push('/home')
      }).catch(() => {
      })
    },
    // 保存用户信息
    saveUserInfo (userInfo) {
      // 全局修改
      this.$store.commit('setUserInfo', userInfo)
      // 持久化修改
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }
}
</script>

<style scoped>
.send-btn {
  height: 26px;
  line-height: 24px;
}

.button-con {
  margin-top: 36px;
}

.top-area {
  margin: 30px 0;
}

.login-con {
  background-size: 100% 100%;
  height: calc(100vh - 46px);
}

.login-btn {
  width: 60%;
  margin: 12px;
}

.top-logo {
  width: 100px;
  margin: 16px 0;
}

.nav-con {
  padding-top: 46px;
}

.nav-con-16 {
  padding-top: 62px;
}

.top-mar-16 {
  margin-top: 16px;
}

.underline {
  text-decoration: underline;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.align-center {
  text-align: center;
}

.shadow-box {
  -webkit-box-shadow: 0 0 12px #ebedf0;
  box-shadow: 0 0 12px #ebedf0;
}

.light-txt {
  color: #aaaaaa;
}

.red-txt {
  color: red;
}

.flex1 {
  flex: 1;
}

.click-box {
  background-color: white;
}

.click-box:active {
  background-color: #fafafa;
}

</style>
