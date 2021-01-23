<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#eb5253"
        @search="onSearch(searchText)"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result :search-text="searchText" v-if="isResultShow" />
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
      v-else
    />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";
import { setItem, getItem } from "@/utils/storage";

export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistories: getItem("search-histories") || [],
    };
  },
  computed: {},
  watch: {
    searchHistories() {
      setItem("search-histories", this.searchHistories);
    },
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;

      const index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(searchText);
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>