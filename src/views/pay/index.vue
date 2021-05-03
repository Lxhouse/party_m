<template>
  <div class="pay-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="党费支付"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <!-- <qriously :value="payObj.code_url"
              :size="200" />
    <div class="saosao">
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div> -->
    <div class="loading-warp"
         v-if=loadingshow>
      <van-loading size="50px"
                   type="spinner"
                   color="#e22829">党费订单生成中...</van-loading>
    </div>

    <div class="paylist"
         v-if=payshow>
      <div class="checkout-tit">
        <h4 class="tit-txt"><span class="success-icon"></span><span class="success-info">党费缴纳订单生成成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orangemoney">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url"
                      :size="338" />
            <!-- <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div> -->

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->

      </div>
    </div>
  </div>
</template>

<script>
import { createNatvie, queryPayStatus } from "@/api/dz";
export default {
  name: "pay",
  components: {},
  props: {},
  data () {
    return {
      payObj: {
        code_url: "weixin://wxpay/bizpayurl?pr=5FJOAGHzz",
        out_trade_no: "6532",
        result_code: "SUCCESS",
        total_fee: 0.01,
        user_id: 1
      },
      timer1: '',
      loadingshow: true,
      payshow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    setInterval(() => {
      this.loadingshow = false;
      this.payshow = true
      // console.log(this.loadingshow)
      // alert("Hello")
    }, 2000);
    // console.log(this.$route.query.orderNo)
    this.paymony(this.$route.query.orderNo)
  },
  //每隔三秒调用一次查询订单状态的方法
  mounted () {//页面渲染之后执行
    this.timer1 = setInterval(() => {
      this.queryOrderStatus(this.payObj.out_trade_no)
    }, 3000);
  },
  methods: {
    paymony (orderNo) {
      createNatvie(orderNo).then(res => {
        // console.log(res.data.data)
        this.payObj = res.data.data
      })
    },
    queryOrderStatus (orderNo) {
      queryPayStatus(orderNo)
        .then(response => {
          if (response.data.message == "SUCCESS") {
            //支付成功，清除定时器
            clearInterval(this.timer1)
            //提示
            this.$toast.success("支付成功！");
            //跳转回到课程详情页面
            //this.$router.push({ path: '/fee' })
            this.$router.back()
          }
          // console.log(response.data.message)
        })
    }
  }
};
</script>

<style scoped lang="less">
.paylist {
  font-size: 16px;
  .checkout-tit {
    .tit-txt {
      font-size: 15px;
    }
    .orangemoney {
      color: #ffa500;
      font-weight: 900;
    }
  }
  .checkout-steps {
    display: flex;
    justify-content: center;
    font-size: 12px;
    .red {
      color: red;
      font: 14px;
      margin-left: 100px;
      margin-top: 30px;
    }
  }
}
.loading-warp {
  display: flex;
  justify-content: center;
  margin-top: 250px;
}
</style>