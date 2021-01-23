<template>
  <div class="register-container">
    <div class="top-wrap">
      <img class="logo-top" src="../../../public/img/logo2.png" />
    </div>
    <van-form
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      @submit="onRegister"
      ref="register-from"
      class="from-input-top"
    >
      <van-cell-group>
        <van-field
          v-model="registerVo.name"
          label="姓名"
          clearable
          icon-prefix="party"
          left-icon="dangyuan1"
          center
          placeholder="请输入姓名"
          :rules="formRules.name"
        />
        <van-field
          v-model="registerVo.mobile"
          clearable
          label="+86"
          icon-prefix="party"
          left-icon="shouji1"
          name="mobile"
          center
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="registerVo.password"
          type="password"
          clearable
          label="密码"
          icon-prefix="party"
          left-icon="mima"
          center
          placeholder="请输入密码"
          :rules="formRules.password"
        />
        <van-field
          v-model="registerVo.code"
          clearable
          center
          label="验证码"
          icon-prefix="party"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="formRules.code"
        >
          <template #button>
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 60"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button
              v-else
              size="small"
              round
              :loading="isSendSmsLoading"
              @click.prevent="onSendSms"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="danger" block>注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { sendSms,register } from "@/api/user";
export default {
  name: "registerIndex",
  components: {},
  props: {},
  data() {
    return {
      registerVo: {
        name: "",
        mobile: "",
        password: "",
        code: "",
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        password: [{ required: true, message: "请填写密码" }],
        name: [{ required: true, message: "请填写姓名" }],
        code: [{ required: true, message: "请填写验证码" }],
      },
      isCountDownShow: false,
      isSendSmsLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onRegister() {
      Toast.loading({
        message: "注册中...",
        forbidClick: true,
        duration: 0,
      });
      //找到数据接口
      //封装请求方法
      //请求调用登录
      //处理响应结果
      const { data } = await register(this.registerVo);
      console.log(data);
      if (data.success == true) {
        Toast.success("注册成功");
        this.$router.push({ path: "/login" });
      } else {
        Toast.fail("注册失败,请检查验证码");
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        Toast({ message: error.errors[0].message, position: "top" });
      }
    },
    async onSendSms() {
      try {
        await this.$refs["register-from"].validate("mobile");
        this.isSendSmsLoading = true;
        const res = await sendSms(this.registerVo.mobile);
        this.isCountDownShow = true;
        console.log(res);
      } catch (err) {
        Toast({
          message: err.message,
          position: "top",
        });
        console.log("验证失败", err);
      }
      this.isSendSmsLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
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

.login-btn-wrap {
  padding: 26px 16px;
}
</style>