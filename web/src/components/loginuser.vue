<template>
  <div class="userconter">
    <div>
      <a-popover title="已登录，欢迎你" trigger="hover">
        <template slot="content">
          <p style="text-align:center">点击注销</p>
        </template>
        <span class="iconfont user-icon">&#xe640;</span>        
      </a-popover>
    </div>
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
export default {};
</script>
