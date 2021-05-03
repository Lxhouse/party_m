<template>
  <div class="fee-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="党费缴纳"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <van-tabs v-model="active">
      <van-tab title="待缴纳">
        <van-cell-group>

          <van-cell v-for="(item,index) in paylist.wlist"
                    :key="index"
                    icon="gold-coin"
                    is-link
                    center
                    :label="item.banchName"
                    :value="siu(item)"
                    @click="$router.push('/pay?orderNo=' +item.orderNo.toString())">
            <template #title>
              <span class="custom-title">{{item.year}}年{{item.month}}月</span>
              <van-tag type="danger">待缴纳</van-tag>
            </template>
          </van-cell>

        </van-cell-group>
      </van-tab>
      <van-tab title="已缴纳">
        <van-cell-group>
          <van-cell v-for="(item,index) in paylist.ylist"
                    :key="index"
                    icon="gold-coin"
                    is-link
                    center
                    :label="item.banchName"
                    :value="siu(item)">
            <template #title>
              <span class="custom-title">{{item.year}}年{{item.month}}月</span>
              <van-tag type="success">已缴纳</van-tag>
            </template>
          </van-cell>

        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { isjiana } from "@/api/dz";
export default {
  name: "fee",
  components: {},
  props: {},
  data () {
    return {
      active: 2,
      paylist: {
        wlist: [],
        ylist: []
      },
      fee: ""
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadfee();
  },
  mounted () { },
  methods: {
    // topsy (item) {
    //   this.$router.push({ path: '/pay/' + item.orderNo })
    // },
    siu (item) {
      this.fee = "金额:" + item.totalFee + "元";
      return this.fee
    },
    loadfee () {
      isjiana().then((result) => {
        if (result.data.message == "255") {
          this.$toast('您尚未加入党组织！');//轻提示
          //this.isshow = true
        } else {
          // console.log(result.data.data.result)
          this.paylist = result.data.data.result;
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
</style>