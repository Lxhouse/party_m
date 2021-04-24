<template>
  <div class="article-container">

    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->

    <!-- 加载中 -->
    <!-- <div class="loading-wrap">
      <van-loading color="#3296fa" vertical>加载中</van-loading>
    </div> -->
    <!-- /加载中 -->

    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center
                class="user-info">
        <div slot="title"
             class="name">{{ article.autName }}</div>
        <van-image class="avatar"
                   slot="icon"
                   fit="cover"
                   round
                   :src="article.avatar" />
        <div slot="label"
             class="pubdate">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button :type="article.is_followed ? 'default' : 'danger'"
                    round
                    class="follow-btn"
                    size="small"
                    :loading="isFollowedLoading"
                    @click="onFollow"
                    :icon="article.is_followed ? '' : 'plus'">{{ article.is_followed ? "已关注" : "关注" }}
        </van-button>
      </van-cell>
      <div class="markdown-body"
           v-html="article.content"
           ref="article-content"></div>

      <!--文章评论列表-->
      <article-comment @update-total-count="totalCommentCount = $event"
                       :list="commentList"
                       :source="articleId"
                       @reply-click="onReplyClick" />
    </div>
    <!--/文章评论列表-->

    <!-- 加载失败：404 -->
    <!-- <div class="error-wrap">
      <van-icon name="failure" />
      <p class="text">该资源不存在或已删除！</p>
    </div> -->
    <!-- /加载失败：404 -->

    <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
    <!-- <div class="error-wrap">
      <van-icon name="failure" />
      <p class="text">内容加载失败！</p>
      <van-button class="retry-btn">点击重试</van-button>
    </div> -->
    <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn"
                  @click="isPostShow = true"
                  type="default"
                  round
                  size="small">写评论</van-button>
      <van-icon name="comment-o"
                :badge="totalCommentCount"
                color="#777" />
      <van-icon :color="article.is_collected ? 'orange' : '#777'"
                :name="article.is_collected ? 'star' : 'star-o'"
                @click="onCollect" />
      <van-icon :color="article.attitude ? 'pink' : '#777'"
                :name="article.attitude ? 'good-job' : 'good-job-o'"
                @click="onLike" />
      <van-icon name="share"
                color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!--发布评论-->
    <van-popup v-model="isPostShow"
               position="bottom">
      <post-comment @post-success="onPostSuccess"
                    :target="articleId" />
    </van-popup>
    <!--/发布评论-->

    <!--评论回复-->
    <van-popup v-model="isreplyShow"
               position="bottom">
      <comment-reply v-if="isreplyShow"
                     :comment="replyComment"
                     :source="articleId"
                     @close="isreplyShow = false"
                     :articleId="articleId" />
    </van-popup>
    <!--评论回复-->
  </div>
</template>

<script>
import "./github-markdown.css";
import ArticleComment from "./components/article-comment";
import PostComment from "./components/post-comment";
import CommentReply from "./components/comment-reply";
import {
  getArticlesbyid,
  getsetFollow,
  getsetCollections,
  getsetLikings,
} from "@/api/article";
import { ImagePreview } from "vant";

export default {
  name: "ArticleIndex",
  components: {
    ArticleComment,
    PostComment,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data () {
    return {
      article: {},
      isFollowedLoading: false,
      isCollectionsLoading: false,
      isLikingsLoading: false,
      isPostShow: false,
      isreplyShow: false,
      commentList: [], //文章评论列表
      totalCommentCount: 0,
      replyComment: {},
    };
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle();
  },
  mounted () { },
  methods: {
    async loadArticle () {
      const { data } = await getArticlesbyid(this.articleId);

      this.article = data.data.data;
      this.$nextTick(() => {
        this.handlePerviewImage();
      });
    },

    handlePerviewImage () {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");

      const imgPaths = [];
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index,
          });
        };
      });
    },
    async onFollow () {
      this.isFollowedLoading = true;
      await getsetFollow(this.article.autId);
      this.article.is_followed = !this.article.is_followed;
      this.isFollowedLoading = false;
    },
    async onCollect () {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });
      this.isCollectionsLoading = true;
      await getsetCollections(this.article.artId);
      this.article.is_collected = !this.article.is_collected;
      this.isCollectionsLoading = false;
      this.$toast.success(`${this.article.is_collected ? "" : "取消"}收藏成功`);
    },
    async onLike () {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });
      this.isLikingsLoading = true;
      await getsetLikings(this.article.artId);
      this.article.attitude = !this.article.attitude;
      this.isLikingsLoading = false;
      this.$toast.success(`${this.article.attitude ? "" : "取消"}点赞成功`);
    },
    onPostSuccess (comment) {
      console.log(comment);
      this.commentList.unshift(comment);
      this.totalCommentCount++;
      this.isPostShow = false;
    },
    onReplyClick (comment) {
      console.log(comment);
      this.replyComment = comment;
      this.isreplyShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #ffffff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #ffffff;
}
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
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
.error-wrap {
  padding: 200px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .van-icon {
    font-size: 122px;
    color: #b4b4b4;
  }
}
.loading-wrap {
  padding: 200px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
</style>