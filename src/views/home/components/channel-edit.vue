<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        round
        plain
        size="mini"
        class="follow-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in userChannel"
        :key="index"
        :text="channel.tabname"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="'+' + channel.tabname"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/article";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.userChannel.find((userChannel) => {
          return userChannel.id === channel.id;
        });
      });
    },
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    async onAdd(channel) {
      //   console.log(channel);
      this.userChannel.push(channel);

      //TODO：数据持久化
      await addUserChannel(channel.id);
    },
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        //编辑状态，删除频道
        this.deleteChannel(channel, index);
      } else {
        //非编辑状态，切换频道
        this.swithChannel(index);
      }
    },
    async deleteChannel(channel, index) {
      if (index <= this.active) {
        this.$emit("update-active", this.active - 1);
      }
      this.userChannel.splice(index, 1);

      //TODO：数据持久化
      await deleteUserChannel(channel.id);
    },
    swithChannel(index) {
      this.$emit("update-active", index);
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;

  .channel-title {
    margin-top: 10px;
    font-size: 16px;
    color: #333333;
  }
  .follow-btn {
    width: 45px;
    height: 20px;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
        margin-top: 0px;
      }
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #cccccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>