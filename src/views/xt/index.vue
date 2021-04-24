<template>
  <div class="xt-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="协同办公"> </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 通知栏 -->
    <van-notice-bar left-icon="volume-o"
                    text="请各位预备党员同志准备好转正所需材料，支部转正大会将在近期召开。" />
    <!-- mode="link" -->
    <!--通知栏-->
    <!-- 好友列表-->
    <div class="chat-list">
      <van-cell class="userinfo">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinakd10116%2F694%2Fw804h690%2F20200709%2Fc9e3-iwasyei6065653.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618829750&t=1f5878ec3c95cae011085287196298fe" />
        <!-- <div class="name"
             slot="title">测试</div> -->
        <!-- <div class="text-wrap"
             slot="text">
          <div class="count">123</div>
          <div class="text">获赞</div>
        </div> -->
        <div class="text-wrap">
          <div class="name_top">个一
            <div class="text_time">上午7：45</div>
          </div>
          <div class="chat_last">你上次发给我的文件可以再发一次嘛？</div>
        </div>
      </van-cell>

      <van-cell class="userinfo">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   src="http://www.ruiwen.com/pic/original/copyright/img.1/c2b3d1b81_2.jpg" />
        <!-- <div class="name"
             slot="title">测试</div> -->
        <!-- <div class="text-wrap"
             slot="text">
          <div class="count">123</div>
          <div class="text">获赞</div>
        </div> -->
        <div class="text-wrap">
          <div class="name_top">
            <div class="text_name">鲁先生</div>
            <div class="text_time">上午7：45</div>
          </div>
          <div class="chat_last">勇者愤怒，抽刃向更强者；怯者愤怒，却抽刃向更弱者。不可救药的民族中，一定有许多英雄，专向孩子们瞪眼。这些孱头们。</div>
        </div>
      </van-cell>

      <van-cell class="userinfo">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=936287632,1942343296&fm=26&gp=0.jpg" />
        <!-- <div class="name"
             slot="title">测试</div> -->
        <!-- <div class="text-wrap"
             slot="text">
          <div class="count">123</div>
          <div class="text">获赞</div>
        </div> -->
        <div class="text-wrap">
          <div class="name_top">
            <div class="text_name">胡适先生</div>
            <div class="text_time">上午7：45</div>
          </div>
          <div class="chat_last">身行万里半天下,眼高四海空无人。</div>
        </div>
      </van-cell>

      <van-cell class="userinfo">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   src="http://5b0988e595225.cdn.sohucs.com/images/20180809/2db7a8a0254f476686d0c86e973bf59b.jpeg" />
        <!-- <div class="name"
             slot="title">测试</div> -->
        <!-- <div class="text-wrap"
             slot="text">
          <div class="count">123</div>
          <div class="text">获赞</div>
        </div> -->
        <div class="text-wrap">
          <div class="name_top">
            <div class="text_name">季羡林</div>
            <div class="text_time">上午7：45</div>
          </div>
          <div class="chat_last">个人的观察,对世界上绝大多数人来说,人生一无意义,二无价值。</div>
        </div>
      </van-cell>
      <!-- /好友列表-->

    </div>
  </div>
</template>

<script>
export default {
  name: "XtIndex",
  components: {},
  props: {},
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {},
};
</script>

<style scoped lang="less">
.chat-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 44px;
  overflow-y: auto;
}
.userinfo {
  color: black;
  margin-top: 0px;
  margin-bottom: 20px;
  box-sizing: border-box;
  height: 60px;
  padding-bottom: 0;
  background-color: unset;

  .avatar {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border: 1px solid #fff;
    margin-right: 11px;
  }
  .text-wrap {
    .name_top {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .text_time {
        display: flex;
        color: #888888;
        align-self: flex-end;
      }
    }
    .chat_last {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 2px;
      display: inline-block;
      height: 25px;
      box-sizing: border-box;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // .count {
    //   font-size: 18px;
    // }
    // .text {
    //   font-size: 11px;
    // }
  }
}
</style>