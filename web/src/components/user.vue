<template>
  <div class="userconter">
    <div>
      <a-popover title="未登录" trigger="hover">
        <template slot="content">
          <p style="text-align:center">点击图标登录</p>
        </template>
        <span class="iconfont user-icon" @click="visible = true">&#xe640;</span>
      </a-popover>
    </div>
    <a-modal v-model="visible" centered footer title="用户登录">
      <div class="login">
        <p></p>
        <div class="login-ipt-1 login-i">
          <a-input placeholder="输入账号" v-model="data.username" />
        </div>
        <div class="login-ipt-2 login-i">
          <a-input-password placeholder="输入密码" v-model="data.userpass" />
        </div>
        <br />
        <div class="login-but">
          <a-button type="danger" @click="sub">登录</a-button>
          <a-button style="margin-left:10px" @click="push">注册</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
}
.user-icon {
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
}
.userconter {
  position: absolute;
  right: 100px;
  top: 5px;
}
.login-i {
  margin: 27px;
}
.login-but {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      visible: false,
      data: {},
    };
  },
  methods: {
    push() {
      let routeUrl = this.$router.resolve({
        path: "/register",
      });

      window.open(routeUrl.href, "_blank");
    },
    async sub() {
      if (this.data.username != "" && this.data.userpass != "") {
        const data = await this.$http.post("/auth/login", this.data);
        this.visible = false 
        this.data.username=""
        this.data.userpass="" 
        localStorage.token = data.data.token
         this.$message.success('登录成功');
      }
    },
  },
};
</script>
