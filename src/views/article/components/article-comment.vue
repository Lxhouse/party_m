<template>
  <div class="article-comments">
    <van-cell title="全部评论"></van-cell>
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已展示所有评论"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        :source="source"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from "@/api/article";
import CommentItem from "./comment-item";
export default {
  name: "ArticleComment",
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, Object, String],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      //list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      pagenum: 1,
      perPage: 10,
    };
  },

  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type,
        source: this.source.toString(),
        pagenum: this.pagenum,
        perPage: this.perPage,
      });
      console.log(data);
      this.$emit("update-total-count", data.data.data.total_count);
      const { results } = data.data.data;
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
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>