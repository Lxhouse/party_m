<template>
  <div class="Team-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="组织队伍"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <!--搜索框-->
    <van-search v-model="sname"
                :show-action=true
                placeholder="搜索党员姓名或党内职务">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!--/搜索框-->
    <!--支部人员列表-->
    <van-collapse v-model="activeNames"
                  icon="arrow"
                  accordion>

      <van-collapse-item :title=collapseTitle
                         class="collapseItem"
                         name="1">

        <van-cell :key="index"
                  :value="progressList[item.progress]"
                  v-for="(item, index) in items"
                  class="userinfo">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     :src=item.avatar />
          <div class="name"
               slot="title">{{item.name}}</div>
        </van-cell>

      </van-collapse-item>

    </van-collapse>
    <!--/支部人员列表-->
  </div>
</template>

<script>
import { getTeamList } from "@/api/party.js"
export default {
  name: "TeamIndex",
  components: {},
  props: {},
  data () {
    return {
      sname: null,
      activeNames: [],
      collapseTitle: "尚未加入组织",
      items: [],
      progressList: ["其他", "群众", "共青团员", "积极分子", "预备党员", "中共党员"]
    };
  },
  computed: {},
  watch: {},
  created () { this.getlist() },
  mounted () { },
  methods: {
    onSearch () {
    },
    getlist () {

      getTeamList().then(
        res => {
          if (res.data.success != false) {
            this.items = res.data.data.teamlist;
            this.collapseTitle = res.data.data.banchName;
          }
          console.log(res)
        }).catch((err) => {
          console.log("获取数据出错！！")
        });

    }
  },
};
</script>

<style scoped lang="less">
.collapseItem {
  /deep/.van-cell--clickable {
    color: #d90a13;
  }
  .userinfo {
    box-sizing: border-box;
    background-color: unset;
    line-height: 45px;
    .avatar {
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      border: 1px solid #fff;
      margin-right: 11px;
    }
  }
}
</style>
