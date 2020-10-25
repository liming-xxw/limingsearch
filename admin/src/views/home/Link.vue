<template>
  <div>
    <div class="but-tags">
      <div><Button type="primary" @click="flag = true">添加</Button></div>
      <div>
        <Button type="error" @click="model2 = true">删除</Button>
      </div>
    </div>
    <Modal v-model="flag" title="添加你觉得好的网址链接" @on-ok="ok" @on-cancel="cancel">
      <p><Input v-model="value.linkname" placeholder="请输入链接名称" /></p>
      <br>
      <p><Input v-model="value.link" placeholder="请输入链接" /></p>
    </Modal>
    <div class="table">
      <Table
        width="1150"
        height="400"
        border
        highlight-row
        :columns="columns12"
        :data="data"
        show-context-menu
        context-menu
        ref="selection"
        style="margin-top:20px"
      >
        <template slot-scope="{ row }" slot="linkname">
          <strong>{{ row.linkname }}</strong>
        </template>
        <template slot-scope="{ row }" slot="link">
          <strong>
            {{ row.link }}
          </strong>
        </template>
        <template slot-scope="{}" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="flag2 = true"
            >编辑</Button
          >
          <Button type="error" size="small" @click="model2 = true">删除</Button>
        </template>
        <template slot="contextMenu">
          <DropdownItem>
            <div @click="flag1 = true">
              创建子分类
            </div>
          </DropdownItem>
        </template></Table
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Linklist extends Vue {
  columns12 = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "链接名称",
      slot: "linkname",
    },
    {
      title: "链接",
      key: "link",
      slot: "link",
    },
    {
      title: "操作",
      slot: "action",
      width: 230,
      align: "center",
    },
  ];
  flag1 = false;
  flag = false;
  data = new Array();
  value:any = {} 

  async fetch() {
    const data = await this.$http.get("links");
    this.data = data.data;
    console.log(this.data);
  }
 async ok(){
   this.value.default = "默认"
   const data =  await this.$http.post("links",this.value)
   this.fetch()
   this.$Message.info(data.data.message)
   this.value.linkname = ""
   this.value.link = ""
 }
 cancel(){}
  created() {
    this.fetch();
  }
}
</script>
<style>
.but-tags {
  width: 150px;
  display: flex;
  justify-content: space-between;
}
</style>
