<template>
  <div class="vote-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="投票选举"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <!--tab栏-->
    <van-tabs v-model="active"
              swipeable>
      <van-tab :title="item"
               v-for="(item, index) in titles"
               :key="index">

        <!--投票列表-->
        <vote-list :actid="active" />
        <!--投票列表-->

      </van-tab>
    </van-tabs>
    <!--/tab栏-->
  </div>
</template>

<script>
import VoteList from "./components/vote-list";
export default {
  name: "VoteIndex",
  components: {
    VoteList
  },
  props: {
  },
  data () {
    return {
      active: 0,
      titles: ["我创建的", "未开始", "进行中", "已结束"]
    };
  },
  computed: {},
  watch: {

  },
  created () { },
  mounted () { },
  methods: {

  },
};
</script>

<style scoped lang="less">
</style>