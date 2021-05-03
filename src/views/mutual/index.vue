<template>
  <div class="mutualIndex-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="支部互评"
                 left-arrow
                 @click-left="$router.back()">
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="zbbq">
      <div class="zb-listone">
        <p class="bname">支部名称：{{branch.banchName}}</p>
        <p class="bname">支部书记：{{branch.banchuser}}</p>
        <p class="bname">考评时间：{{year}}年{{month}}月</p>
        <van-icon class-prefix="party"
                  class="logo"
                  name="dangjianlogo" />

      </div>
      <div class="input-warp">
        <van-field v-model="branchev.proposal"
                   rows="10"
                   autosize
                   clearable
                   :disabled=isshow
                   label="考评建议"
                   type="textarea"
                   maxlength="50"
                   placeholder="请输入您的建议"
                   show-word-limit />
      </div>
      <div class="kp-warp">
        <button class="kp-btn"
                :disabled=isshow
                @click="showit()">考评</button>
      </div>
    </div>
    <!--动作面板-->
    <van-action-sheet v-model="show"
                      :actions="actions"
                      cancel-text="取消"
                      close-on-click-action
                      @select="onSelect" />
    <!--动作面板-->
  </div>
</template>

<script>
import { getMemberbranchinfo } from "@/api/dz";
import { getfzList, addbrace } from "@/api/user";
export default {
  name: "mutualIndexIndex",
  components: {},
  props: {},
  data () {
    return {
      branch: {
        banchName: "",
        banchuser: "",
      },
      branchev: {
        proposal: '',
      },
      year: 2021,
      month: 4,
      isshow: false,
      show: false,
      actions: [
        { name: '不合格', value: 0, color: '#ee0a24' },
        { name: '基本合格', value: 1, color: '#ee0a24' },
        { name: '合格', value: 2, color: '#00FF00' },
        { name: '优秀', value: 3, color: '#00FF00' }
      ]

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadbra();
  },
  mounted () { },
  methods: {
    loadbra () {
      var myDate = new Date();
      this.year = myDate.getFullYear();
      this.month = myDate.getMonth() + 1;
      getfzList({
        type: 1,
        year: this.year,
        month: this.month
      }).then(res => {
        //console.log(res)

        if (res.data.code == 20001) {
          if (res.data.message == "255") {
            this.$toast('您尚未加入党组织！');//轻提示
            this.isshow = true
          } else {
            getMemberbranchinfo().then(res => {
              //console.log(res.data.data.userInfo)
              this.branch = res.data.data.userInfo;
            })
            this.$toast('已参与考评或考评未开始！');//轻提示
            this.isshow = true
          }
        } else {
          this.branch = res.data.data.userInfo;
        }

        // console.log(res.data.code = 20001)
      })

    },
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      addbrace({
        passiveid: this.branch.banchAid,
        grade: item.value,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        proposal: this.branchev.proposal
      });
      this.branchev.proposal = ''
      this.isshow = true
      this.$toast('考评成功');    //轻提示
      // console.log(item.value)
    },
    showit () {
      this.show = true
    }
  }
};
</script>

<style scoped lang="less">
.zbbq {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 0px;

  // overflow-y: auto;
  padding: 0 5%;
}
.zb-listone {
  // display: flex;
  // justify-content: center;
  // flex-wrap: wrap;
  position: relative;
  border-radius: 6px;
  width: 97%;
  height: 180px;
  margin-top: 10px;
  padding: 5px;
  //border: 3px solid red;
  color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background: url("../../../public/img/background_card.jpg") no-repeat;
  :nth-child(2) {
    margin-bottom: 2px;
  }
  :nth-child(3) {
    display: inline;
    margin-top: 3px;
    margin-bottom: 0px;
  }
}
.bname {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 500;
}
.kp-btn {
  width: 100px;
  margin: 10px;
  margin-bottom: 0;
  height: 37px;
  background: #fff;
  background: #e22829;
  margin-top: 50px;
  color: #fff;
  font-size: 14px;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.15s ease;
}
.selected {
  background: #242cd9;
  color: #fff;
}
.kp-warp {
  display: flex;
  justify-content: center;
}
.logo {
  position: absolute;
  color: yellow;
  font-size: 120px;
  // background-position-x: 5px;
  // background-position-y: 7px;
  right: 29px;
  bottom: -15px;
  // margin-left: 65%;
  // margin-bottom: 70%;
}
.input-warp {
  margin-top: 20px;
  // border: 2px #242cd9 solid;
}
</style>