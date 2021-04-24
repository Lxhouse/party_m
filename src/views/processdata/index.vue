<template>
  <div class="processdata-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="入党进程"
                 left-arrow
                 @click-left="$router.back()">
    </van-nav-bar>
    <!-- 导航栏 -->
    <div class="gc-list">
      <van-row>
        <van-col span="3">
          <van-sidebar v-model="activeKey"
                       @change="onChange"
                       class="asid">
            <van-sidebar-item title="我的进程" />
            <van-sidebar-item title="学时" />
            <van-sidebar-item title="志愿服务" />
          </van-sidebar>
        </van-col>
        <van-col span="21">
          <div class="steps">
            <van-steps direction="vertical"
                       active-color="#e22829"
                       v-if=step
                       :active="userdailedinfo.progress-1">
              <van-step>
                <h3>【群众】</h3>
                <p>要求学时: 0</p>
                <p>要求志愿服务: 0</p>
              </van-step>
              <van-step>
                <h3>【共青团员】党的后备军</h3>
                <p>要求学时: 0</p>
                <p>要求志愿服务: 0</p>
              </van-step>
              <van-step>
                <h3>【积极分子】入党起步</h3>
                <p>要求学时: 0</p>
                <p>要求志愿服务: 0</p>
              </van-step>
              <van-step>
                <h3>【预备党员】取得党籍</h3>
                {{userdailedinfo.preparationDate ==null?"":userdailedinfo.preparationDate+"您加入中国共产党成为中共预备党员！请牢记这一日，这是您的政治生日！勿忘“第一身份”，发挥先锋模范作用。"}}
                <p>要求学时: 25</p>
                <p>要求志愿服务: 3</p>
              </van-step>
              <van-step>
                <h3>【中共党员】正式入党</h3>
                {{userdailedinfo.formalDate ==null?"":userdailedinfo.formalDate+"您正式成为一名光荣的中国共产正式党员!"}}
                <p>要求学时: 50</p>
                <p>要求志愿服务: 6</p>
              </van-step>
            </van-steps>
            <van-circle v-model="noww"
                        v-if=xs
                        size=250px
                        color="#e22829"
                        :rate="rate"
                        class="jishi"
                        speed="40"
                        layer-color="#ebedf0"
                        :text=hx />
            <van-circle v-model="noww"
                        v-if=zyfw
                        size=250px
                        color="#e22829"
                        :rate="rate2"
                        class="jishi"
                        speed="40"
                        layer-color="#ebedf0"
                        :text=hxz />

          </div>
        </van-col>
      </van-row>
    </div>
    <div>

    </div>

  </div>
</template>

<script>
import { getUserInfo, getMemberInfoall } from "@/api/user";
import * as dateUtils from "@/plugins/date";
export default {
  name: "processdata",
  components: {},
  props: {},
  data () {
    return {
      noww: 0,
      userbaseinfo: {},
      userdailedinfo: {},
      activeKey: 0,
      active: 5,
      step: true,
      xs: false,
      zyfw: false,
      rate: 100,
      rate2: 100,
      hx: "您目前学时已达标",
      hxz: "您目前志愿服务已达标"
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadCurrentUser();
    this.getallinfo();
  },
  mounted () { },
  methods: {
    onChange (index) {
      console.log(index)
      if (index == 0) {
        this.step = true;
        this.xs = false;
        this.zyfw = false
      } else if (index == 1) {
        this.step = false;
        this.xs = true;
        this.zyfw = false
      } else {

        this.step = false;
        this.xs = false;
        this.zyfw = true

      }
    },
    getallinfo () {
      getMemberInfoall().then(res => {
        //console.log(res.data.data.userInfo);
        this.userdailedinfo = res.data.data.userInfo
        // this.userdailedinfo.birthday = dateUtils.formatDate(this.userdailedinfo.birthday, 'yyyy年MM月dd日');
        this.userdailedinfo.preparationDate = dateUtils.formatDate(this.userdailedinfo.preparationDate, 'yyyy年MM月dd日');
        this.userdailedinfo.formalDate = dateUtils.formatDate(this.userdailedinfo.formalDate, 'yyyy年MM月dd日');
        // this.userdailedinfo.entranceDate = dateUtils.formatDate(this.userdailedinfo.entranceDate, 'yyyy年MM月dd日');
        // this.userdailedinfo.graduationDate = dateUtils.formatDate(this.userdailedinfo.graduationDate, 'yyyy年MM月dd日');
        if (this.userdailedinfo.progress == 3) {
          this.rate = (this.userdailedinfo.classhours / 25) * 100;
          let hous = 25 - this.userdailedinfo.classhours;
          this.hx = "距离下一阶段您还需" + hous + "学时";
        }
        else if (this.userdailedinfo.progress == 4) {
          this.rate = (this.userdailedinfo.classhours / 50) * 100;
          let hous = 50 - this.userdailedinfo.classhours;
          this.hx = "距离下一阶段您还需" + hous + "学时";
        }
        if (this.userdailedinfo.progress == 3) {
          this.rate2 = (this.userdailedinfo.volunteer / 3) * 100;
          let hous = 3 - this.userdailedinfo.volunteer;
          if (hous > 0) { this.hxz = "距离下一阶段您还需" + hous + "次志愿服务"; }

        }
        else if (this.userdailedinfo.progress == 4) {
          this.rate2 = (this.userdailedinfo.volunteer / 6) * 100;
          let hous = 6 - this.userdailedinfo.volunteer;
          if (hous > 0) { this.hxz = "距离下一阶段您还需" + hous + "次志愿服务"; }
        }

        // console.log(this.userdailedinfo.birthday)
      }).catch(

      )

    },
    async loadCurrentUser () {
      const { data } = await getUserInfo();
      this.userbaseinfo = data.data.userInfo;
      //console.log(data.data.userInfo)
    },

  }
};
</script>

<style scoped lang="less">
.asid {
  width: 21.4%;
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 0px;
  overflow-y: auto;
}
.steps {
  display: flex;
  margin-top: 5px;
  margin-left: 13.5px;
}
.gc-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 0px;
  overflow-y: auto;
}
.jishi {
  margin-top: 140px;
  margin-left: 40px;
}
</style>