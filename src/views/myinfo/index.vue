<template>
  <div class="myinfo-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="我的资料"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <div class="zl-list">
      <van-skeleton title
                    :loading="loading"
                    :row="21" />
      <!-- <van-cell-group>
      <van-cell title="真实姓名"
                size="large"
                :value="userbaseinfo.name" />

    </van-cell-group> -->
      <van-collapse class="zl-list"
                    v-model="activeName"
                    accordion>
        <van-collapse-item title="真实姓名"
                           name="1">
          {{userbaseinfo.name}}
        </van-collapse-item>
        <van-collapse-item title="手机号码"
                           name="2">{{userbaseinfo.mobile}}</van-collapse-item>
        <van-collapse-item title="性别"
                           name="3">{{userdailedinfo.sex ==0?"女":"男"}}</van-collapse-item>
        <van-collapse-item title="身份证号"
                           name="4">{{userdailedinfo.identityCard}}</van-collapse-item>
        <van-collapse-item title="民族"
                           name="5">{{userdailedinfo.nationAid}}</van-collapse-item>
        <van-collapse-item title="学历"
                           name="9">{{userdailedinfo.educationAid}}</van-collapse-item>
        <van-collapse-item title="出生日期"
                           name="6">{{userdailedinfo.birthday}}</van-collapse-item>
        <van-collapse-item title="所在支部名称"
                           name="12">{{userdailedinfo.banchName}}</van-collapse-item>
        <van-collapse-item title="积极分子转预备日期"
                           name="7">{{userdailedinfo.preparationDate}}</van-collapse-item>
        <van-collapse-item title="预备党员转正日期"
                           name="8">{{userdailedinfo.formalDate}}</van-collapse-item>
        <van-collapse-item title="最高学历入学日期"
                           name="10">{{userdailedinfo.entranceDate}}</van-collapse-item>
        <van-collapse-item title="最高学历毕业日期"
                           name="11">{{userdailedinfo.graduationDate}}</van-collapse-item>

        <van-collapse-item title="家庭地址"
                           name="13">{{userdailedinfo.homeAddress}}</van-collapse-item>
        <van-collapse-item title="固定电话"
                           name="14">{{userdailedinfo.fixedTelephone}}</van-collapse-item>
        <van-collapse-item title="电子邮箱"
                           name="15">{{userdailedinfo.mailbox}}</van-collapse-item>
        <van-collapse-item title="QQ"
                           name="16">{{userdailedinfo.qq}}</van-collapse-item>
        <van-collapse-item title="微信"
                           name="17">{{userdailedinfo.wechat}}</van-collapse-item>
        <van-collapse-item title="工作（学习）单位"
                           name="18">{{userdailedinfo.unit}}</van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getMemberInfoall } from "@/api/user";
import * as dateUtils from "@/plugins/date";
export default {
  name: "myinfo",
  components: {
  },
  props: {},
  data () {
    return {
      loading: true,
      activeName: '-1',
      userbaseinfo: {},
      userdailedinfo: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCurrentUser();
    this.getallinfo();
  },
  mounted () {
    this.loading = false;
  },
  methods: {

    getallinfo () {
      getMemberInfoall().then(res => {
        //console.log(res.data.data.userInfo);
        this.userdailedinfo = res.data.data.userInfo
        this.userdailedinfo.birthday = dateUtils.formatDate(this.userdailedinfo.birthday, 'yyyy年MM月dd日');
        this.userdailedinfo.preparationDate = dateUtils.formatDate(this.userdailedinfo.preparationDate, 'yyyy年MM月dd日');
        this.userdailedinfo.formalDate = dateUtils.formatDate(this.userdailedinfo.formalDate, 'yyyy年MM月dd日');
        this.userdailedinfo.entranceDate = dateUtils.formatDate(this.userdailedinfo.entranceDate, 'yyyy年MM月dd日');
        this.userdailedinfo.graduationDate = dateUtils.formatDate(this.userdailedinfo.graduationDate, 'yyyy年MM月dd日');
        // console.log(this.userdailedinfo.birthday)
      })
    },
    async loadCurrentUser () {
      const { data } = await getUserInfo();
      this.userbaseinfo = data.data.userInfo;
      //console.log(data.data.userInfo)
    },

  }

};
</script>

<style scoped lang="less">
.info {
  font-size: 16px;
  font-weight: 700;
}
.zl-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 0px;
  overflow-y: auto;
}
</style>