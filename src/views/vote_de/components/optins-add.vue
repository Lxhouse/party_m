<template>
  <div class="optins-add">
    <van-field class="post-field"
               v-model.trim="newoptin"
               rows="2"
               autosize
               type="textarea"
               maxlength="15"
               placeholder="请输入选项内容"
               show-word-limit />
    <van-button @click="onPost"
                :disabled="!newoptin"
                class="post-btn">新增</van-button>
  </div>
</template>

<script>
export default {
  name: "OptinsAdd",
  components: {},
  props: {
  },
  data () {
    return {
      newoptin: "",
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // async onPost () {
    //   const { data } = await commentsreply({
    //     target: this.target.toString(),
    //     content: this.message,
    //     art_id: this.articleId ? this.articleId.toString() : null,
    //   });

    //   this.$emit("post-success", data.data.new_obj);
    //   this.$toast.success("展示发布效果,实际发布需等待审核");
    //   this.message = "";
    // },
    onPost () {

      this.$emit('newoptin', this.newoptin);
      this.newoptin = "";
    }
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
    color: #e22829;
    &::before {
      display: none;
    }
  }
}
</style>