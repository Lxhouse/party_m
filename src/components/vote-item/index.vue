<template id="plist"
            ref="plist">
  <van-cell class="vote_warp"
            :to="{
      name:'vote_deone',
      params:{
        tid:voteone.tid,
        state:voteone.state
      }
   }">
    <div style="font-weight: 700;">
      <van-tag :type="voteone.state==1||voteone.state==0 ? 'primary':(voteone.state==2? 'success':'danger')"
               class="status_tag"
               round
               size="medium">{{voteone.state==1||0 ? "未开始":(voteone.state==2?"进行中":"已结束")}}</van-tag>
      {{voteone.title}}
    </div>
    <div class="xx_div">
      <span>发起：{{voteone.creatName}}</span>
      <span class="bt_span">开始时间：{{voteone.begin}}</span>
      <span>结束时间：{{voteone.end}}</span>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: "VoteItem",
  components: {},
  props: {
    voteone: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created () {
    this.$nextTick(() => {
      //console.log(this.$refs['fzlist']);
      if (this.$refs['plist'] != null)
        document.getElementById('plist').innerHTML = this.$refs['plist'];
    }
    )
  },
  mounted () { },
  methods: {},
};
</script>

<style scoped lang="less">
.vote_warp {
  width: 96%;
  height: 125px;
  box-sizing: border-box;
  // border-radius: 15px;
  // background-color: #faf9f9;
  margin: 2% 2% 0 2%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .status_tag {
    margin-right: 15px;
  }
  .xx_div {
    display: block;
    margin-top: 15px;
    margin-left: 10px;
    .bt_span {
      display: block;
      margin-top: 10px;
    }
  }
  .xx_div:nth-child(2) {
    margin-top: 5px;
  }
}
</style>