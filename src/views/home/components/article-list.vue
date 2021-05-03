<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-text="refreshSuccessText"
                      :success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">

        <article-item v-for="(article, index) in articles"
                      :key="index"
                      :article="article"></article-item>

      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      pagenum: 0, // 请求的页数
      isRefreshLoading: false, // 下拉刷新的 loading 状态
      refreshSuccessText: "", // 下拉刷新成功的提示文本
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      // this.loading = true;
      // console.log("onLoad");
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道 ID
        pagenum: this.pagenum,
      });

      // console.log(data);

      // 2. 把数据放到 list 数组中
      const { results } = data.data;

      //   console.log(results + "------+-----" + this.pagenum);

      this.articles.push(...results);

      // 3. 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false;
      //   console.log(results + "-----------" + this.pagenum);
      // 4. 数据全部加载完成
      if (results == null) {
        // 更新获取下一页数据的页码
        this.pagenum++;
      } else {
        // 没有数据了，把加载状态设置结束，不再触发加载更多
        this.finished = true;
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道 ID
        pagenum: this.pagenum, // 为了大家方便学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
      });
      // console.log(data)
      // 2. 把数据放到数据列表中（往顶部追加）
      const { results } = data.data;
      // this.articles.unshift(...results);
      let leng = this.articles.length;
      this.articles = results;

      // 3. 关闭刷新的状态 loading
      this.isRefreshLoading = false;

      this.refreshSuccessText = `更新了${results.length - leng}条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>