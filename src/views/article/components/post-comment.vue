<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="onPost" :disabled="!message" class="post-btn"
      >发布</van-button
    >
  </div>
</template>

<script>
import { commentsreply } from "@/api/article";
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      const { data } = await commentsreply({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null,
      });

      this.$emit("post-success", data.data.new_obj);
      this.$toast.success("展示发布效果,实际发布需等待审核");
      this.message = "";
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    // background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    // color: #6ba3d8;
    color: #e22829;
    &::before {
      display: none;
    }
  }
}
</style>