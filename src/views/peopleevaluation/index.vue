<template>
  <div class="peopleevaluation-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="党员考评"
                 left-arrow
                 @click-left="$router.back()"> </van-nav-bar>

    <!--人员列表-->
    <div class="fzlist"
         id="fzlist"
         ref="fzlist">
      <van-tag round
               type="danger"
               class="tagmar"
               v-if="datashow"
               size=large>{{kplist.year}}年{{kplist.month}}月的考评</van-tag>
      <div :key="index"
           v-for="(item, index) in kplist.items">
        <div class="fzlist-top">
          <van-row>
            <van-col span="17">
              <div class="left-xx1">姓名:{{item.name}} 性别：{{sex[item.sex]}}</div>
              <div class="left-xx1">民族：{{item.nationAid}}</div>
              <div class="left-xx1">出生年月：{{item.birthday.split('-')[0]+"年"+item.birthday.split('-')[1]+"月"}}</div>

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
        </div>
        <div class="fzlist-bottom">
          <van-row type="flex"
                   @click="showit(index,item)">
            <van-col align="center"
                     justify="center">
              <van-icon class="btn-icn"
                        name="todo-list" />
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!--/人员列表-->
    <!-- /导航栏 -->
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

import { addpeopj, getfzList } from "@/api/user.js"
export default {
  name: "peopleevaluationIndex",
  components: {},
  props: {},
  data () {
    return {
      datashow: false,
      fid: -1,
      index: -1,
      banchName: '学生第二党支部',
      fzlists: [],
      sex: ["女", "男"],
      kplist: [],
      progressList: ["群众", "共青团员", "积极分子", "预备党员", "中共党员"],
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
  created () { this.onload(); },
  mounted () { },
  methods: {
    onload () {
      getfzList({
        type: 0,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      }).then(res => {
        console.log(res)
        if (res.data.message == "255") {
          this.$toast('您尚未加入党组织！');//轻提示
          //this.isshow = true
        } {
          const { results } = res.data.data;
          this.kplist = results;
          this.datashow = true;
          // if (this.kplist.items.length == 0) {
          //   this.$toast('暂无需要考评对象！');//轻提示
          //   this.datashow = false
          // }
          if (res.data.code == 20001) {
            this.$toast('暂无需要考评对象！');//轻提示
            this.datashow = false
          }
        }

        // console.log(res.data.data.results)
      })
    },
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      addpeopj({
        passiveid: this.fid,
        grade: item.value,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      });
      this.kplist.items.splice(this.index, 1);
      this.$toast('考评成功');    //轻提示
      if (this.kplist.items.length == 0) {
        this.$toast('本月考评已完成！');    //轻提示
        this.datashow = false
      }
    },
    showit (index, item) {
      this.fid = item.uid;
      this.show = true;
      this.index = index;
      // console.log(Object.prototype.toString.call(this.kplist));
      // Array.prototype.splice.call(this.kplist)
      // this.kplist["index"] = undefined;
      // console.log(this.kplist.items.splice(index))
    }
  }
};
</script>

<style scoped lang="less">
.peopleevaluation-container {
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
    display: flex;
    justify-content: center;
    width: 351px;
    height: 45px;
    box-sizing: border-box;
    background: #ffffff;
    .btn-icn {
      margin-top: 5px;
      color: #20afa5;
    }
    // border-bottom: 2px solid #e2e1e1;
    // box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 0px rgba(0, 0, 0, 0) inset;
    // border-radius: 10px;
    // margin: 0px auto;
    // .van-col--8:nth-child(1) {
    //   color: #32aa3a;
    // }
    // .van-col--8:nth-child(2) {
    //   border-right: 1px solid #e2e1e1;
    //   border-left: 1px solid #e2e1e1;
    //   color: #20afa5;
    // }
    // .van-col--8:nth-child(3) {
    //   color: #dc3633;
    // }
    // .van-col--8 {
    //   font-size: 26px;
    //   line-height: 55px;
    //   // border-radius: 10px;
    //   height: 45px !important;
    //   // border: 1px solid #e2e1e1;
    // }
    p {
      font-size: 10px;
    }
  }
  .tagmar {
    margin: 5px 0 0 20px;
  }
}
</style>