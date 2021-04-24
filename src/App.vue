<template>
  <div id="app">
    <!-- 路由出口 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
</style>
