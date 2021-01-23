<template>
  <div class="user-chat">
    <!--导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="党讯快问"
      left-arrow
      @click-left="$router.back()"
    />
    <!--/导航栏-->
    <!--消息列表-->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell :title="item" v-for="(item, index) in messages" :key="index" />
    </van-cell-group>
    <!--/消息列表-->
    <!--发送消息-->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button
        round
        class="send-button"
        type="danger"
        size="small"
        @click="onSend"
        >发送</van-button
      >
    </van-cell-group>
    <!--/发送消息-->
  </div>
</template>

<script>
// import io from "socket.io-client";
// import VueSocketIO from "vue-socket.io";
import { setItem, getItem } from "@/utils/storage";

export default {
  name: "UserChat",
  components: {},
  props: {},
  data() {
    return {
      message: "",
      socket: null,
      messages: getItem("djkx-messages") || [],
    };
  },
  computed: {},
  watch: {
    messages() {
      setItem("djkx-messages", this.messages);
      //视图立即更新
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  created() {
    // console.log("开始建立连接。。。。。。。。");
    // //建立连接
    // var loginUserNum = "80";
    // var opts = {
    //   query: "loginUserNum=" + loginUserNum,
    // };
    // const socket = io.connect('http://localhost:9099', opts);
    // console.log(socket);
    // this.socket = socket;
    // //建立连接
    // socket.on("connect", function () {
    //   console.log("连接成功");
    // });
    // //接收数据
    // socket.on("push_event", function (data) {
    //   console.log(data);
    // });
    // //断开连接
    // socket.on("disconnect", function () {
    //   console.log("断开连接了");
    // });
  },
  mounted() {
    // var loginUserNum = "79";
    // var opts = {
    //   query: "loginUserNum=" + loginUserNum,
    // };
    // this.$socket.emit("connect", opts);
    this.scrollToBottom();
    this.$socket.open();
    this.$socket.emit("firstconnet", 80);
  },
  sockets: {
    connect: () => {
      console.log("socket 连接成功");
    },
    //断开连接
    disconnect: () => {
      // alert("断开连接");
    },
    reconnect: () => {
      console.log("重新连接");
      // this.$socket.emit("connect");
    },
    async push_event(res) {
      console.log("接收数据", res.content);
      this.messages.push(res.content);
    },
  },
  beforeDestroy() {
    this.$socket.close();
  },
  methods: {
    onSend() {
      //请求发送消息
      console.log(this.message);
      const data = {
        msg: this.message,
        timestamp: Date.now(),
      };
      if (this.message != "" && this.message.trim().length != 0) {
        this.$socket.emit("dxkw", data);
        this.messages.push(this.message);
        // this.message = "";
      }
      this.message = "";
    },
    scrollToBottom() {
      const list = this.$refs["message-list"];
      list.scrollTop = list.scrollHeight;
    },
  },
};
</script>

<style scoped lang="less">
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
.send-button {
  width: 55px;
}
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
</style>