<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar class="v_tabbar"
                v-model="active"
                active-color="#FFCB65"
                inactive-color="#ffffff"
                route>
      <!-- <van-tabbar-item icon="comment"
                       to="/xt">协同</van-tabbar-item> -->
      <van-tabbar-item icon="fire"
                       to="/dz">生活</van-tabbar-item>
      <van-tabbar-item icon="column"
                       to="/">资讯</van-tabbar-item>
      <van-tabbar-item icon="manager"
                       to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data () {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {},
};
</script>

<style scoped lang="less">
.v_tabbar {
  background-image: url("../../../public/img/nav_bar.png");
}
.van-tabbar-item--active {
  background-color: transparent;
}
</style>