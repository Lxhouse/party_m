<template>
  <div class="vote-list">
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-text="refreshSuccessText"
                      :success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <vote-item v-for="(voteone, index) in list"
                   :key="index"
                   :voteone="voteone" />
      </van-list>

    </van-pull-refresh>

    <van-icon name="add"
              class="add_vote"
              size="50"
              @click="add_votes" />
  </div>
</template>

<script>
import { getvotes } from "@/api/dz";
import VoteItem from "@/components/vote-item"
export default {
  name: "VoteList",
  components: { VoteItem },
  props: {
    actid: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      isRefreshLoading: false, // 下拉刷新的 loading 状态
      refreshSuccessText: "", // 下拉刷新成功的提示文本
    };
  },
  computed: {},
  watch: {},
  created () { },
  activated () { this.onLoad() },
  mounted () { },
  methods: {
    add_votes () {
      this.$router.push({
        path: `/vote_de`,
      })
    },
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getvotes(this.actid);
        // 2. 把数据放到 list 数组中
        const { results } = data.data;
        this.list = [];
        this.list.push(...results);
        this.finished = true;
      } catch (error) {
        this.finished = true;
      }
    }, async onRefresh () {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      try {
        // 1. 请求获取数据
        const { data } = await getvotes(this.actid);
        // 2. 把数据放到 list 数组中
        const { results } = data.data;
        // console.log(results)
        this.list = [];
        this.list.push(...results);
        // 3. 关闭刷新的状态 loading
        this.isRefreshLoading = false;
        this.refreshSuccessText = `共有${results.length}场投票`;
      } catch (error) {
        this.isRefreshLoading = false;
      }


    }
  },
};
</script>

<style scoped lang="less">
.vote-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 95px;
  bottom: 0;
  z-index: 999;
  overflow-y: auto;
}
.add_vote {
  position: fixed;
  right: 20px;
  bottom: 45px;
  color: red;
}
</style>