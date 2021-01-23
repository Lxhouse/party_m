<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.avatar"
    />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{ comment.name }}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            :name="comment.isLiking ? 'good-job' : 'good-job-o'"
            :class="{
              liked: comment.isLiking,
            }"
            class="like-icon"
          />
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdate">{{
          comment.pubdate | datetime("MM:DD HH:mm")
        }}</span>
        <van-button
          class="reply=btn"
          @click="$emit('reply-click', comment)"
          round
          size="mini"
          >{{ comment.reply_count }}回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { CommentLike } from "@/api/article";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
    source: {
      type: [Number, Object, String],
      required: true,
    },
  },
  data() {
    return {
      likesVo: {
        articleId: "",
        comId: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCommentLike() {
      this.likesVo.articleId = this.source;
      this.likesVo.comId = this.comment.comId.toString();
      console.log(this.likesVo.articleId + "-------------------");
      const { data } = await CommentLike(this.likesVo);
      console.log(data);
      if (this.comment.isLiking) {
        this.comment.like_count--;
      } else {
        this.comment.like_count++;
      }
      this.comment.isLiking = !this.comment.isLiking;
    },
  },
};
</script>

<style scoped lang="less">
.avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.name {
  font-size: 14px;
  color: #406599;
}
.content {
  font-size: 16px;
  color: #222222;
}
.pubdate {
  font-size: 10px;
  margin-right: 10px;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.like-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.like-icon.liked {
  color: #ff69b4;
}
</style>