<template>
  <div>
    <div>
      <span class="upicon iconfont" @click="add()">&#xe611;</span>
      <a-modal v-model="visible" centered footer @cancel="canceladd">
        <a-tabs default-active-key="0" @change="goto">
          <a-tab-pane key="0">
            <span slot="tab">
              <span class="iconfont">&#xe8ba;</span>
              背景图片
            </span>
            <router-view></router-view>
          </a-tab-pane>
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="setting" theme="filled" />  
              设置
            </span>
            <router-view></router-view>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      flag: "",
      tags: [
        {
          to: "/picture",
        },
        {
          to: "/setup",
        },
      ],
    };
  },
  methods: {
    goto(activeKey) {
      this.$router.push(`${this.tags[activeKey].to}`);
      this.flag = this.$route.path;
    },
    canceladd() {
      this.$router.push("/");
    },
    add() {
      this.$store.commit("add",0)
      this.visible = true;
      if (this.flag != "") {
        this.$router.push(this.flag);
      } else {
        this.$router.push("/picture");
      }
    },
  },
};
</script>

<style>
.upicon {
  position: absolute;
  right: 50px;
  top: 8px;
  transform: scale(1.3);
  color: #cccccc;
  font-size: 20px;
  cursor: pointer;
}
</style>
