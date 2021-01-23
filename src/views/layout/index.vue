<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar v-model="active" active-color="#ff0000"  inactive-color="#000000" route>
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment" to="/xt">协同办公</van-tabbar-item>
      <van-tabbar-item icon="column" to="/dz">党政生活</van-tabbar-item>
      <van-tabbar-item icon="manager" to="/my">党员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
</style>