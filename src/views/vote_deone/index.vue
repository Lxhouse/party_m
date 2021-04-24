<template>
  <div class="vote_Deone">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="投票界面"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <van-cell class="vote_warp">
      <div style="font-weight: 700;">
        <van-tag :type="state==1 ? 'primary':(state==2? 'success':'danger')"
                 class="status_tag"
                 round
                 size="medium">{{state==1 ? "未开始":(state==2?"进行中":"已结束")}}</van-tag>
        {{voteone.title}}
      </div>
      <div class="xx_div">
        <div>发起：{{voteone.creatName}}</div>
        <span class="bt_span">开始时间：{{voteone.begin}}</span>
        <br>
        <span>结束时间：{{voteone.end}}</span>
      </div>
    </van-cell>
    <van-cell class="vote_warp1">
      投票内容： {{voteone.content}}
    </van-cell>
    <!--单选-->
    <van-radio-group v-model="dopt"
                     checked-color="#ee0a24"
                     v-if=doptshow>
      <van-cell-group>
        <van-cell :name="item"
                  v-for="(item, index) in voteone.optionlist"
                  :key="index">
          <template #right-icon>
            <van-radio :name="item">{{item.vname}}</van-radio>
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!--/单元按钮-->
    <!--多选按钮-->
    <van-checkbox-group v-model="dopts"
                        checked-color="#ee0a24"
                        v-if=doptsshow
                        :max="voteone.maxnum">
      <van-cell-group>
        <van-cell v-for="(item, index) in voteone.optionlist"
                  clickable
                  :key="index"
                  :title="item.vname">
          <template #right-icon>
            <van-checkbox :name="item"
                          ref="checkboxes" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <!--/多选按钮-->
    <!--确认按钮-->
    <div class="sub_but_warp">
      <van-button type="danger"
                  id="tj"
                  :disabled=sfjy
                  @click="submit"
                  class="sub_but">{{sub}}</van-button>
      <van-button type="primary"
                  class="sub_but"
                  @click="goback">取消</van-button>
    </div>
    <!--确认按钮-->
  </div>
</template>

<script>
import { getVoteDetill, getidtp, addmenvervote } from "@/api/dz";
export default {
  name: "voteDeone",
  components: {},
  props: {
    tid: {
      type: [Number, String],
      required: true,
    },
    state: {
      type: [Number, String],
      required: true,
    },
  },
  data () {
    return {
      voteone: {},
      dopt: null,
      dopts: [],
      doptshow: true,
      doptsshow: false,
      sfjy: false,
      sub: "投票"
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onload2();
  },
  mounted () { },
  methods: {
    async submit () {
      let _this = this;
      // console.log(_this.dopts)
      if (_this.dopts.length == 0) {
        this.$toast.fail("请投票！");
      } else {
        // debugger
        if (this.voteone.type == 1) {
          this.dopts.push(this.dopt)
          addmenvervote(this.dopts);
        } else {
          addmenvervote(this.dopts);
        }
        this.$toast.success("投票成功！");
        this.$router.back()
      }
    },
    async onload () {
      let _this = this;
      const { data } = await getVoteDetill(_this.tid);
      _this.voteone = data.data.results;
      if (_this.voteone.type == 2) {
        _this.doptshow = false;
        _this.doptsshow = true;
      }

    },
    async onload2 () {
      let _this = this;

      const { data } = await getidtp(_this.tid);
      let dtp = data.data.results;
      // console.log(dtp);
      this.onload()
      if (this.state != 2) {
        _this.sub = "投票"
        _this.$toast.fail("投票未在进行中！");
        _this.sfjy = true;
      }
      else if (dtp.length != 0) {
        // debugger
        if (this.state != 2) {
          _this.sub = "投票"
          _this.$toast.fail("投票未在进行中！");
          _this.sfjy = true;
        }
        else {
          if (_this.voteone.type == 1) {
            _this.dopt = dtp[0];
          } else {
            _this.dopts = dtp;
          }
          _this.sub = "已投票"
          _this.$toast.success("您已投票，谢谢参与！");
          _this.sfjy = true;
        }
      }


    },
    goback () { this.$router.back() }
  }
};
</script>

<style scoped lang="less">
.vote_Deone {
  .vote_warp {
    width: 96%;
    height: auto;
    box-sizing: border-box;
    margin: 2% 2% 0 2%;
    .status_tag {
      margin-right: 15px;
    }
    .xx_div {
      display: block;
      margin-top: 15px;
      margin-left: 10px;
      .bt_span {
        margin-top: 10px;
        margin-right: 30px;
      }
    }
    .xx_div:nth-child(2) {
      margin-top: 4px;
    }
  }
  .vote_warp1 {
    margin-top: 6px;
  }
  .sub_but_warp {
    display: flex;
    justify-content: center;

    .sub_but {
      margin: 6px;
      border-radius: 5px;
      width: 30%;
      height: 40px;
    }
  }
}
</style>