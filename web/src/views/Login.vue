<template>
  <div class="app">
    <div class="login">
      <a-steps :current="current" size="small">
        <a-step title="填写个人信息" />
        <a-step title="注册成功" />
      </a-steps>
    </div>
    <div>
      <register v-if="flag" @event="par"  />
      <loginsuccess v-else />
    </div>
  </div>
</template>
<script>
import register from "../components/logininfromtioc.vue";
import Loginsuccess from "../components/loginsuccess.vue";
export default {
  components: {
    register,
    Loginsuccess,
  },
  data() {
    return {
      flag: true,
      current:0
    };
  },
  methods: {
      par(data){
         this.flag = data
         this.current = 1
      }
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
  /* color: white; */
}

.steps-action {
  margin-top: 24px;
}
.login {
  width: 500px;
  margin: 200px auto;
}
.app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
