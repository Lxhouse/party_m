<template>
  <div class="falist-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="发展党员列表"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <!--人员列表-->
    <div class="fzlist">
      <div :key="index"
           v-for="(item, index) in fzlists">
        <div class="fzlist-top">
          <van-row>
            <van-col span="17">
              <div class="left-xx1">姓名:{{item.name}} 性别：{{sex[item.sex]}}</div>
              <div class="left-xx1">民族：{{item.nationAid}}</div>
              <div class="left-xx1">出生年月：{{item.birthday}}</div>

            </van-col>
            <van-col span="7"
                     class="right-xx1">
              <van-image class="imgtou"
                         width="100"
                         height="120"
                         contain
                         :src=item.avatar />
            </van-col>
          </van-row>
          <div class="left-xx2">所在支部：{{banchName}}</div>
          <div class="left-xx2">发展状态：{{fzqk[item.progress-1]}}</div>
        </div>
        <div class="fzlist-bottom">
          <van-row type="flex">
            <van-col align="center"
                     justify="center"
                     span="8">
              <van-icon name="todo-list" />

            </van-col>

            <van-col align="center"
                     justify="center"
                     span="8">
              <van-icon name="more" />
            </van-col>
            <van-col align="center"
                     justify="center"
                     span="8">
              <van-icon name="delete" />
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!--/人员列表-->
  </div>
</template>

<script>
import { getfzList } from "@/api/party.js"
export default {
  name: "FalistIndex",
  components: {},
  props: {},
  data () {
    return {
      banchName: "",
      fzlists: [],
      sex: ["女", "男"],
      fzqk: ["积极分子转预备", "预备党员转正"]
    };
  },
  computed: {},
  watch: {},
  created () {
    this.getfalists()
  },
  mounted () { },
  methods: {
    getfalists () {
      getfzList().then((res) => {
        //console.log(res.data.data.fzVoLists.length)
        this.fzlists = res.data.data.fzVoLists;
        this.banchName = res.data.data.banchName;
        if (res.data.data.fzVoLists.length == 0) {
          this.$toast('支部暂无发展中同志！');//轻提示
        }

      }).catch((err) => {
        this.$toast('您尚未加入党组织！');//轻提示
      });
    }
  },
};
</script>

<style scoped lang="less">
.falist-container {
  .fzlist {
    position: fixed;
    top: 42px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
  .fzlist-top {
    width: 356px;
    height: 220px;
    //background-color: rgb(199, 2, 2);
    background: url("../../../public/img/background_card.jpg") no-repeat;
    margin: 12px auto 0px auto;
    border-radius: 10px;
    color: #ffffff;
    font-size: 16px;
    .imgtou {
      margin-top: 6px;
      border-radius: 10px;
    }
    .left-xx1 {
      margin-top: 18px;
      margin-left: 20px;
    }
    .left-xx2 {
      margin-top: 15px;
      margin-left: 20px;
    }
    .right-xx1 {
      margin-top: 10px;
    }
    .falist-container .fzlist-top[data-v-c92ae394] {
      margin-top: 12px;
    }
  }
  .fzlist-bottom {
    width: 351px;
    height: 45px;
    box-sizing: border-box;
    background: #ffffff;
    border-bottom: 2px solid #e2e1e1;
    // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 0px rgba(0, 0, 0, 0) inset;
    // border-radius: 10px;
    margin: 0px auto;
    .van-col--8:nth-child(1) {
      color: #32aa3a;
    }
    .van-col--8:nth-child(2) {
      border-right: 1px solid #e2e1e1;
      border-left: 1px solid #e2e1e1;
      color: #20afa5;
    }
    .van-col--8:nth-child(3) {
      color: #dc3633;
    }
    .van-col--8 {
      font-size: 26px;
      line-height: 55px;
      // border-radius: 10px;
      height: 45px !important;
      // border: 1px solid #e2e1e1;
    }
    p {
      font-size: 10px;
    }
  }
}
</style>