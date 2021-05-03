<template>
  <div class="dz-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="党政生活"> </van-nav-bar>
    <!-- /导航栏 -->
    <van-cell-group class="message-list">
      <!--组织工作-->
      <van-cell-group>
        <van-cell title="组织工作"
                  icon-prefix="party"
                  icon="zuzhi" />
      </van-cell-group>
      <van-grid direction="horizontal"
                :column-num="3">
        <van-grid-item icon-prefix="party"
                       icon="tuanduiguanli"
                       text="组织队伍"
                       class="fontred"
                       to="/team" />
        <van-grid-item icon-prefix="party"
                       icon="fazhandangyuan"
                       text="发展党员"
                       class="fontred"
                       to="/falist" />
        <van-grid-item icon-prefix="party"
                       icon="wenjuantoupiao"
                       text="投票选举"
                       class="fontred"
                       to="/vote" />
      </van-grid>
      <van-image class="image-wrap"
                 width="96%"
                 height="130px"
                 fit="cover"
                 src="https://edu-1233.oss-cn-beijing.aliyuncs.com/2021/01/21/87eaf4ec40f94a6f8e4c7551792310a1微信图片_20210121111249.png" />
      <!--/组织工作-->
      <van-grid direction="horizontal"
                :column-num="3">
        <van-grid-item icon-prefix="party"
                       icon="dangyuan1"
                       text="党员考评"
                       class="fontred"
                       to="/peopleevaluation" />
        <van-grid-item icon-prefix="party"
                       icon="zhibu"
                       text="支部考评"
                       class="fontred"
                       to="/branchev" />
        <van-grid-item icon-prefix="party"
                       icon="zhibuxinxi"
                       text="支部互评"
                       class="fontred"
                       to="/mutual" />
      </van-grid>
      <van-image class="image-wrap"
                 width="96%"
                 height="130px"
                 fit="cover"
                 src="https://edu-1233.oss-cn-beijing.aliyuncs.com/2021/01/21/ba89b2818d6447dc9190db7d100b68fa微信图片_20210121111335.png" />
      <!--/组织工作-->
      <!--党内生活-->
      <van-cell-group>
        <van-cell title="党内生活"
                  icon-prefix="party"
                  icon="zuzhi" />
      </van-cell-group>
      <van-grid direction="horizontal"
                :column-num="1">
        <van-grid-item icon-prefix="party"
                       icon="dangfeishoujiao"
                       text="党费缴纳"
                       class="fontred"
                       to="/fee" />
        <!-- <van-grid-item icon-prefix="party"
                       icon="kaizhantanxintanhua"
                       text="谈心谈话"
                       class="fontred" /> -->

      </van-grid>
      <!--/党内生活-->

    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "DzIndex",
  components: {},
  props: {},
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {},
};
</script>

<style scoped lang="less">
.fontred {
  color: #ff0000;
  background-color: #f0f0f0;
}
van-grid-item {
  background-color: #f0f0f0 !important;
}
// .van-grid-item__content {
//   background-color: #888888;
// }
.image-wrap {
  margin: 20px 0 10px 10px;
}
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
.send-button {
  width: 55px;
}
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
</style>