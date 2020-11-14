<template>
  <div class="success">
    <a-result
      status="success"
      title="注册成功,欢迎你的使用!"
      sub-title="网站简陋，之后会持续更新，有好的建议可以反馈给我"
    >
      <template #extra>
        <a-button key="console" type="primary" @click="f">
          前往登录
        </a-button>
      </template>
    </a-result>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    f(){
      this.$router.push("/")
    }
  },
};
</script>
<style scoped>
    .success{
      margin: -200px auto;

}
</style>