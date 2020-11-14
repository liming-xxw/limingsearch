<template>
  <div
    class="home"
    :style="{ backgroundImage: 'url(' + imgurl2 + ')' }"
    @click.self="stopnumber1"
    @contextmenu.prevent="show1()"
  >
    <a-drawer
      title="快捷方式"
      placement="top"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <crud />
    </a-drawer>
    <!-- 顶部 -->
    <!-- {{ imgurl2}} -->
    <div class="home-header">
      <!-- 用户 -->
      <loginuser v-if="login" />

      <user v-else />
      <!-- 设置 -->
      <up />
    </div>

    <div class="big-box">
      <span class="time"> {{ time }}</span>

      <div class="search-box">
        <input
          type="text"
          name=""
          :style="{ width: xwidth + 'px' }"
          class="search-txt"
          v-model="value"
          v-on:keyup.13="submit"
        />
        <a class="search-btn" @click="opennumber1" @mouseenter="vwidth1">
          <a-icon type="search" />
        </a>
      </div>
      <div class="drop-box">
        <div class="list-box">
          <ul class="list-ul" :style="{ width: vwidthh1 + 'px' }">
            <li
              v-for="(item, index) in data"
              :key="index"
              @click="opennumber2(item.q)"
            >
              {{ item.q }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 天气控件 -->
      <weather />

      <!-- 底部 -->
    </div>
  </div>
</template>

<script>
import weather from "../components/weather.vue";
import user from "../components/user.vue";
import up from "../views/up/index.vue";
import crud from "../components/Crud.vue";
import loginuser from "../components/loginuser";
export default {
  components: {
    weather,
    user,
    up,
    crud,
    loginuser,
  },
  computed: {
    xwidth() {
      return this.$store.state.vwidth;
    },
    imgurl2(){
      return this.$store.state.imgurl
    }
  },
  data() {
    return {
      data: {},
      vwidthh1: 0,
      time: 0,
      value: "",
      visible: false,
      login: false,
      // img: "https://github.com//favicon.ico",
    };
  },
  methods: {
    opennumber1() {
      window.open("https://www.baidu.com/s?wd=" + this.value);
    },
    opennumber2(val) {
      window.open("https://www.baidu.com/s?wd=" + val);
    },
    stopnumber1() {
      this.$store.commit("add", 0);
    },
    vwidth1() {
      this.$store.commit("add", 450);
    },
    show1() {
      this.visible = true;
      this.$store.commit("add", 0);
    },
    onClose() {
      this.visible = false;
    },
    timedata() {
      // var _this = this;
      var data4 = new Date();
      var hours =
        data4.getHours() < 10 ? "0" + data4.getHours() : data4.getHours();
      var minutes =
        data4.getMinutes() < 10 ? "0" + data4.getMinutes() : data4.getMinutes();
      this.time = hours + ":" + minutes;
    },
    stopnumber2() {},
    timeset() {
      this.timedata();
      setInterval(this.timedata, 1000);
    },
    submit() {
      if (this.value != "") {
        window.open("https://www.baidu.com/s?wd=" + this.value);
      } else {
        this.$message.info("请输入你想搜索的内容");
      }
    },
  },
  created() {
    this.timeset();
    if (localStorage.token) {
      this.login = true;
    } else {
      this.login = false;
    }
    console.log()
  },

  watch: {
    xwidth(val) {
      if (val === 0) {
        this.vwidthh1 = 0;
        this.value = "";
      }
    },
    imgurl2(val){
      console.log(val)
    },
    async value(val) {
      if (val != "") {
        const data = await this.$jsonp(
          `https://www.baidu.com/sugrec?prod=pc&cb=getData&wd=${val}`,
          {
            callbackQuery: "cb",
            callbackName: "jsonp_func",
          }
        );
        this.data = data.g;
        this.vwidthh1 = 490;
      } else {
        this.vwidthh1 = 0;
      }

      // console.log(data);
    },
  },
};
</script>

<style>
@import "../plugins/css/home.css";
.ant-drawer-content-wrapper {
  height: auto !important;
}
</style>
