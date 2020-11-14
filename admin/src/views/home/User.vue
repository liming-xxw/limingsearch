<template>
  <div>
    <div class="but-tags">
      <!-- <div><Button type="primary" @click="flag = true">添加</Button></div> -->
      <div>
        <Button type="error" @click="model2 = true">删除</Button>
      </div>
      <Modal v-model="model2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>你将删除分类，确认之后无法撤回</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer">
          <i-button type="error" size="large" long @click="removeall"
            >删除</i-button
          >
        </div>
      </Modal>
    </div>
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
        v-on:on-selection-change="inchange"
      >
        <template slot-scope="{ row }" slot="username">
          <strong>{{ row.username }}</strong>
        </template>
        <template slot-scope="{ row }" slot="usernet">
          <strong>
            {{ row.usernet }}
          </strong>
        </template>
        <template slot-scope="{ row }" slot="userdate">
          <strong>
            {{ row.userdate }}
          </strong>
        </template>
        <template slot-scope="{ row }" slot="createdAt">
          <strong>
            {{ row.createdAt }}
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
      title: "用户账号",
      slot: "username",
    },
    {
      title: "用户名",
      key: "usernet",
      slot: "usernet",
    },
    {
      title: "用户生日",
      key: "userdate",
      slot: "userdate",
    },
    {
      title: "注册时间",
      key: "createdAt",
      slot: "createdAt",
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
  value: any = {};
  id = new Array();
  model2 = false

  async fetch() {
    const data = await this.$http.get("/users");
    this.data = data.data;
    console.log(this.data);
  }
  async ok() {
    // this.value.default = "默认";
    // const data = await this.$http.post("links", this.value);
    // this.fetch();
    // this.$Message.info(data.data.message);
    // this.value.linkname = "";
    // this.value.link = "";
  }
  inchange(selection: any) {
    const data1 = selection.map((v: any) => {
      return v._id;
    });
    this.id = data1;
    console.log(this.id);
    // console.log(selection)
  }
 async removeall(){
    await this.$http.post('users/delete',this.id)
    this.model2 = false
    this.fetch()
  }
  cancel() {}
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
