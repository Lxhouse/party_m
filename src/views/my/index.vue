<template>
  <div class="my-container">
    <van-cell-group class="my-info"
                    v-if="user">
      <van-cell class="base-info"
                center
                :border="false">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   :src="currentUser.avatar" />
        <div class="name"
             slot="title">{{ currentUser.name }}</div>
        <!-- <van-button class="update-btn"
                    size="small"
                    round>党员信息</van-button> -->
      </van-cell>
      <van-grid class="data-info"
                :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">{{memdata.classhours}}</div>
            <div class="text">学时时长</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">{{memdata.volunteer}}</div>
            <div class="text">服务次数</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-wrap">
            <div class="count">{{memdata.nationAid}}</div>
            <div class="text">民族</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap"
               slot="text">
            <div class="count">{{memdata.progress==0?"其他":memdata.progress==1?"群众":memdata.progress==2 ?"共青团员":memdata.progress==3?"积极分子":memdata.progress==4 ?"预备党员":"中共党员"}}</div>
            <div class="text">进度</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login"
         v-else>
      <div @click="$router.push('/login')">
        <img class="mobile"
             src="../../../public/img/mobile.png" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid mb-4"
              :column-num="2">
      <van-grid-item class="nav-grid-item"
                     icon-prefix="party"
                     icon="ziliao"
                     text="我的资料"
                     to="/myinfo" />
      <van-grid-item class="nav-grid-item"
                     icon-prefix="party"
                     icon="jincheng"
                     text="入党进程"
                     to="/processdata" />
    </van-grid>

    <van-cell class="mb-4"
              title="党讯快问"
              is-link
              to="/user/chat" />
    <!-- <van-cell title="个人信息查询"
              is-link
              to="/" />
    <van-cell title="我的入党进程"
              is-link
              to="/" /> -->
    <van-cell v-if="user"
              class="logout-cell"
              title="退出登录"
              @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}, // 当前登录用户信息
      memdata: {}
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created () {
    this.loadCurrentUser();
    this.getallinfo();
  },
  mounted () { },
  methods: {
    getallinfo () {
      getMemberInfoall().then(res => {
        // console.log(res.data.data.userInfo);
        this.memdata = res.data.data.userInfo
      })
    },
    async loadCurrentUser () {
      const { data } = await getUserInfo();
      this.currentUser = data.data.userInfo;
      //console.log(data.data.userInfo)
    },
    onLogout () {
      // 提示用户确认退出
      // 确认 -> 处理退出
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗？",
        })
        .then(() => {
          // 确认执行这里
          // 清除用户登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // 退出执行这里
          // on cancel
        });
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("../../../public/img/background_party.jpg") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("../../../public/img/background_party.jpg") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .party {
        font-size: 22px;
      }
      .party-ziliao {
        color: #eb5253;
      }
      .party-jincheng {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>