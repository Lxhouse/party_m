<template>
  <div class="cpmment-reply">
    <!--头部信息-->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!--/头部信息-->
    <!--当前评论项-->
    <comment-item :comment="comment" :source="source" />
    <!--/当前评论项-->

    <!--所有评论回复-->
    <van-cell title="所有回复" />
    <article-comment
      :source="comment.comId"
      type="c"
      :list="commentList"
    ></article-comment>
    <!--/所有评论回复-->

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!--发布回复-->

    <van-popup v-model="isPostShow" position="bottom">
      <post-comment
        :target="comment.comId"
        :articleId="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>

    <!--/发布回复-->
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import ArticleComment from "./article-comment";
import PostComment from "./post-comment";

export default {
  name: "CommentReply",
  components: {
    CommentItem,
    ArticleComment,
    PostComment,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    source: {
      type: [Number, Object, String],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(comment) {
      this.commentList.unshift(comment);
      this.comment.reply_count++;
      this.isPostShow = false;
    },
  },
};
</script>

<style scoped lang="less">
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
}
</style>