<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/article";
import { debounce } from "lodash";

//函数防抖
// const fn = _.debounce(function () {
//   console.log("hello");
// }, 1000);

// fn();
// fn();
// fn();
// fn();
// fn();
// fn();

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      }, 200),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    highlight(str) {
      return str.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color: red">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style scoped lang="less"></style>