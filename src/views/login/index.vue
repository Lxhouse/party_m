<template>
  <div class="login-container">
    <div class="top-wrap">
      <img class="logo-top" src="../../../public/img/logo2.png" />
    </div>
    <div class="body-wrap">
      <van-form
        class="from-input-wrap"
        @submit="onLogin"
        @failed="onFailed"
        validate-first
        :show-error="false"
        :show-error-message="false"
      >
        <van-field
          v-model="member.mobile"
          clearable
          label="+86"
          icon-prefix="party"
          left-icon="shouji1"
          center
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="member.password"
          type="password"
          clearable
          label="密码"
          icon-prefix="party"
          left-icon="mima"
          center
          placeholder="请输入密码"
          :rules="formRules.password"
        />
        <div class="login-btn-wrap">
          <van-button class="login-btn" type="danger" block>登录</van-button>
          <van-button
            class="login-btn"
            type="default"
            block
            @click.prevent="gorregister"
            >新用户注册</van-button
          >
        </div>
      </van-form>
    </div>
    <div class="end-wrap">
      <div class="login-end-from">
        <p class="p-sty">
          <router-link to="/lostPassword">找回密码 |</router-link>
          <router-link to="/lostId"> 账号挂失</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      member: {
        mobile: "13702020202",
        password: "111111",
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        password: [{ required: true, message: "请填写密码" }],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      //找到数据接口
      //封装请求方法
      //请求调用登录
      //处理响应结果
      const { data } = await login(this.member);
      console.log(data);
      if (data.success == true) {
        Toast.success("登录成功");
        this.$store.commit("setUser", data.data);
        this.$router.push({ path: "/my" });
      } else {
        Toast.fail("登录失败,请检查账号密码");
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        Toast({ message: error.errors[0].message, position: "top" });
      }
    },
    gorregister() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>
 
<style scoped lang="less">
.login-container {
  // .body-wrap {
  // }
  .top-wrap {
    margin-top: 20%;
    text-align: center;
    .logo-top {
      margin: 0px;
      padding: 0px;
      text-align: center;
      width: 50%;
      height: 50%;
    }
  }
  .from-input-wrap {
    font-size: 20px;
  }
  .login-btn-wrap {
    padding: 26px 16px;
  }
  .login-end-from {
    text-align: center;
  }
  .login-btn {
    margin-top: 16px;
    .van-button__text {
      font-size: 15px;
    }
  }
  .p-sty {
    font-size: 10px;
    color: #000000;
  }
  .end-wrap {
    margin-top: 10%;
  }
}
</style>