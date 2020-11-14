<template>
  <div class="setup">
    <div>
      <h4 class="title">搜索</h4>
      <div class="seather-box">
        <div class="seather-item">
          <p class="seather-p">你是否希望在搜索时显示搜索框提示</p>
          <a-switch default-checked />
        </div>
        <div class="seather-item">
          <p class="seather-p">你是否希望显示你的搜索历史</p>
          <a-switch default-checked />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setup {
  height: 400px;
  overflow-y: auto;
  overflow: hidden;
}
.seather-box {
  width: 472px;
  height: 85px;
  border: 1px #ccc solid;
  padding: 10px;
  border-radius: 10px;
}
.seather-item {
  display: flex;
  justify-content: space-between;
}
.title{
  font-weight: 600;
  margin-left: 5px;
}
</style>
