<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <img slot="left"
           class="left-img"
           src="../../../public/img/logo3.png" />
      <van-button slot="right"
                  class="search-btn"
                  icon="search"
                  type="info"
                  round
                  size="small"
                  to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs"
              v-model="active"
              swipeable>

      <van-tab :title="channel.tabname"
               v-for="channel in channels"
               :key="channel.id">

        <!--文章列表-->
        <van-skeleton title
                      :loading="loading"
                      :row="20">
          <article-list :channel="channel" />
        </van-skeleton>
        <!--文章列表-->
      </van-tab>

      <!--频道编辑-->
      <div slot="nav-right"
           class="wap-nav-placehodler"></div>
      <div slot="nav-right"
           @click="isChannelEditShow = true"
           class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
      <!--/频道编辑-->

    </van-tabs>
    <!-- /文章频道列表 -->

    <!--弹出频道编辑-->
    <van-popup v-model="isChannelEditShow"
               position="bottom"
               class="channel-edit-popup"
               closeable
               close-icon-position="top-left"
               get-container="body"
               style="height: 100%">
      <channel-edit :userChannel="channels"
                    :active="active"
                    @close="isChannelEditShow = false"
                    @update-active="active = $event" />
    </van-popup>
    <!--/弹出频道编辑-->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/article";
import ArticleList from "./components/article-list";
import ChannelEdit from "./components/channel-edit";
export default {
  name: "HomeIndex",
  components: { ArticleList, ChannelEdit },
  props: {},
  data () {
    return {
      active: 0, // 控制被激活的标签
      channels: {},
      isChannelEditShow: false,
      loading: true,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
    };
  },
  computed: {},
  watch: {
    // $route (to, from) {
    //   // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
    //   if (to.meta.keepAlive) {
    //     !this.include.includes(to.name) && this.include.push(to.name);
    //   }
    //   // 如果 要 form(离开) 的页面是 keepAlive缓存的，
    //   // 再根据 deepth 来判断是前进还是后退
    //   // 如果是后退：
    //   if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
    //     const index = this.include.indexOf(from.name);
    //     index !== -1 && this.include.splice(index, 1);
    //   }
    // }
  },
  created () {
    this.loadChannels();
  },
  mounted () {
    this.loading = false
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels();
      this.channels = data.data.channels;
    },
    // onUpdateActive(index) {
    //   this.active = index;
    // },
  },
};
</script>

<style scoped lang="less">
.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    bottom: 20px;
    width: 15px !important;
    height: 3px;
    background: #e94747;
  }
}
.left-img {
  width: 50%;
  height: 76%;
  margin: 8px;
}
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 160px;
    height: 30px;
    background: #e94747;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
.channel-tabs {
  /deep/.van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
}
.wap-nav-wrap {
  position: fixed;
  right: 0;
  width: 33px;
  height: 44px;
  display: flex;
  line-height: 44px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  opacity: 0.9;
  .van-icon {
    font-size: 24px;
  }
}
.wap-nav-placehodler {
  width: 33px;
  flex-shrink: 0;
}
</style>