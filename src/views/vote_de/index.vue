<template>
  <div class="vote_de-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar"
                 title="创建投票选举"
                 left-arrow
                 @click-left="$router.back()" />
    <!--/导航栏-->
    <!--投票标题-->
    <div class="vote_bt">
      <p>投票标题</p>
      <van-field v-model="voteone.title"
                 rows="2"
                 autosize
                 type="textarea"
                 placeholder="填写投票标题" />
    </div>
    <!--/投票标题-->
    <van-divider />
    <!--投票内容-->
    <div class="vote_nr">
      <p>投票内容</p>
      <van-field v-model="voteone.content"
                 rows="3"
                 autosize
                 type="textarea"
                 maxlength="100"
                 placeholder="填写投票内容"
                 show-word-limit />
    </div>
    <!--/投票内容-->
    <van-divider />
    <!--投票类型-->
    <div class="vote_lx">
      <p>投票类型</p>
      <van-radio-group v-model="voteone.type">
        <van-radio name="1"
                   class="vote_xz"
                   checked-color="#ee0a24"
                   @click="jishuqu">单项选择</van-radio>
        <van-radio name="2"
                   class="vote_xz"
                   checked-color="#ee0a24"
                   @click="jishuquf">多项选择</van-radio>
      </van-radio-group>
    </div>
    <div class="vote_tp"
         v-show=tpshow>
      <p>最高投票数：</p>
      <van-stepper v-model="voteone.Maxnum"
                   theme="round"
                   button-size="22"
                   class="jishu"
                   disable-input />
    </div>
    <!--/投票类型-->
    <van-divider />
    <!--投票选项-->
    <div class="vote_xx">
      <p>投票选项
        <i class="xzxx"
           @click="popalt">新增选项</i>
      </p>

      <van-cell-group>
        <van-field v-for=" item in voteone.optionlist"
                   :key="item"
                   :label=item
                   left-icon="circle" />
      </van-cell-group>

    </div>
    <!--/投票选项-->
    <van-divider />
    <!--投票时间-->
    <div class="seller">
      <p>投票时间</p>
      <van-cell title="开始时间"
                is-link
                :value-class="className"
                :value="this.voteone.currentDate "
                @click="showPopup" />
      <van-cell title="结束时间"
                is-link
                :value-class="className1"
                :value="this.voteone.endDate "
                @click="showPopup1" />
      <van-popup v-model="show"
                 position="bottom">
        <van-datetime-picker v-model="oneDate"
                             type="datetime"
                             title="选择时间"
                             :loading="isLoadingShow"
                             :min-date="minDate"
                             :max-date="maxDate"
                             :formatter="formatter"
                             @cancel="show = false"
                             @confirm="confirmPicker" />
      </van-popup>
      <van-popup v-model="show1"
                 position="bottom">
        <van-datetime-picker v-model="twoDate"
                             type="datetime"
                             title="选择时间"
                             :loading="isLoadingShow1"
                             :min-date="minDate1"
                             :max-date="maxDate1"
                             :formatter="formatter"
                             @cancel="show1 = false"
                             @confirm="confirmPicker1" />
      </van-popup>
      <!--新增选项-->
      <van-popup v-model="isPostShow"
                 position="bottom">
        <optins-add @newoptin="newoptins" />
      </van-popup>
      <!--/新增选项-->

    </div>
    <!--投票时间-->
    <!--确认按钮-->
    <div class="sub_but_warp">
      <van-button type="danger"
                  class="sub_but"
                  @click="addvoteone">发布投票</van-button>
      <van-button type="primary"
                  class="sub_but"
                  @click="goback">取消发布</van-button>
    </div>
    <!--确认按钮-->
  </div>
</template>

<script>
import { addvotes } from "@/api/dz";
import { Toast } from "vant";
import OptinsAdd from './components/optins-add';
export default {
  name: "VoteDeIndex",
  components: {
    OptinsAdd
  },
  props: {},
  data () {
    return {
      voteone: {
        title: null,
        content: null,
        type: '1',
        currentDate: '请选择时间',
        endDate: '请选择时间',
        Maxnum: 1,
        optionlist: []
      },
      tpshow: false,
      votexxList: [],
      isPostShow: false,
      show: false,
      show1: false,
      isLoadingShow: true,
      isLoadingShow1: true,
      oneDate: new Date(),
      twoDate: new Date(),
      minDate: new Date(),
      maxDate: new Date(2021, 12, 31),
      minDate1: new Date(),
      maxDate1: new Date(2021, 12, 31),
      className: '',
      className1: ''
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    jishuqu () { this.tpshow = false; this.voteone.Maxnum = 1; },
    jishuquf () { this.tpshow = true },
    goback () { this.$router.back() },
    addvoteone () {
      Toast.loading({
        message: "发布中...",
        forbidClick: true,
        duration: 0,
      });
      //找到数据接口
      //封装请求方法
      //请求调用登录
      //处理响应结果
      if (this.voteone.currentDate > this.voteone.endDate || this.voteone.currentDate == null || this.voteone.endDate == null) {
        Toast.fail("发布失败,请检查时间");
      } else if (this.voteone.title == "" ||
        this.voteone.content == "" ||
        this.voteone.optionlist == []) {
        Toast.fail("发布失败,请检查是否有敏感词汇或者时间有误");
      } else {
        addvotes(this.voteone);
        Toast.success("发布成功");
        this.$router.push('/vote')
        // this.$router.push({ path: '/vote', query: { one: this.voteone } });
      }
    },
    newoptins (newoptin) {
      this.voteone.optionlist.unshift(newoptin);
      this.isPostShow = false
    },
    popalt () {
      this.isPostShow = true
    },
    // 显示开始弹窗
    showPopup () {
      this.show = true
      this.isLoadingShow = true
      setTimeout(() => {
        this.isLoadingShow = false
      }, 500)
    },
    // 显示结束弹窗
    showPopup1 () {
      this.show1 = true
      this.isLoadingShow1 = true
      setTimeout(() => {
        this.isLoadingShow1 = false
      }, 500)
    },
    // 确认选择的时间
    confirmPicker (val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.className = 'timeClass'
      this.voteone.currentDate = `${year}-${month}-${day} ${hour}:${minute}:00`
      this.show = false
    },
    // 确认选择的时间
    confirmPicker1 (val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.className1 = 'timeClass'
      this.voteone.endDate = `${year}-${month}-${day} ${hour}:${minute}:00`
      this.show1 = false
      this.maxDate = val
    },
    // 选项格式化函数
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    }
  },
};
</script>

<style scoped lang="less">
.app-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

.vote_bt {
  box-sizing: border-box;
  p {
    margin: 60px 0 7.5px 15px;
    font-size: 15px;
    text-shadow: 0px 0px #000;
  }
}
.vote_nr {
  box-sizing: border-box;
  p {
    margin: 10px 0 5px 15px;
    font-size: 15px;
    text-shadow: 0px 0px #000;
  }
}
.vote_lx {
  box-sizing: border-box;
  p {
    margin: 30px 0 10px 15px;
    font-size: 15px;
    text-shadow: 0px 0px #000;
  }
  .vote_xz {
    font-size: 15px !important;
    margin: 10px 0 13px 15px;
    .van-radio__label {
      margin-bottom: 5px;
    }
  }
  .jishu {
    display: inline-block;
  }
}
.vote_tp {
  display: flex;
  align-content: center;
  box-sizing: border-box;
  p {
    margin: 10px;
    font-size: 15px;
    text-shadow: 0px 0px #000;
  }
  .jishu {
    margin: 10px;
  }
}
.vote_xx {
  p {
    margin: 10px 0 5px 15px;
    font-size: 15px;
    text-shadow: 0px 0px #000;
  }
  .xzxx {
    font-style: normal;
    font-size: 9px;
    margin-left: 230px;
  }
}
.seller {
  p {
    margin: 5px 0 10px 15px;
    font-size: 15px;
    text-shadow: 0px 0px #000;
  }
  .timeClass {
    color: #333;
    p {
      margin: 30px 0 10px 15px;
      font-size: 15px;
      text-shadow: 0px 0px #000;
    }
  }
}
</style>
