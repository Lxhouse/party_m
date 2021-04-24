<template>
  <div class="search-result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(article, index) in list"
                :key="index"
                @click="toact(article.artId)"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/article";

export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      pagenum: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    toact (aid) {
      // console.log(aid)
      this.$router.replace({ path: '/article/' + aid });
    },
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getSearchResult({
        se: this.searchText,
        pagenum: this.pagenum,
        per_page: this.perPage,
      });
      const { results } = data.data;
      this.list.push(...results);

      this.loading = false;
      if (results.length) {
        this.pagenum++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>