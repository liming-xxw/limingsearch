<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: "iconfont"; /* project id 2119916 */
  src: url("//at.alicdn.com/t/font_2119916_otnj9roq39.eot");
  src: url("//at.alicdn.com/t/font_2119916_otnj9roq39.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2119916_otnj9roq39.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2119916_otnj9roq39.woff") format("woff"),
    url("//at.alicdn.com/t/font_2119916_otnj9roq39.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2119916_otnj9roq39.svg#iconfont") format("svg");
}
/*---滚动条默认显示样式--*/
::-webkit-scrollbar-thumb {
  height: 50px;
  outline-offset: -2px;
  outline: 2px solid #fff;
  -webkit-border-radius: 4px;
  border: 2px solid #fff;
}

/*---鼠标点击滚动条显示样式--*/
::-webkit-scrollbar-thumb:hover {
  height: 50px;
  -webkit-border-radius: 4px;
}

/*---滚动条大小--*/
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/*---滚动框背景样式--*/
::-webkit-scrollbar-track-piece {
  -webkit-border-radius: 0;
}
</style>
