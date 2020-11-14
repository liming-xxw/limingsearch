<template>
  <div>
    <div class="but-tags">
      <div><Button type="primary" @click="flag = true">添加</Button></div>
      <div>
        <Button type="error" @click="model2 = true">删除</Button>
      </div>
    </div>
    <div style="margin-top:15px">
      <Select v-model="asd" style="width:200px">
        <Option
          v-for="item in cityList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
    <Modal
      v-model="flag"
      title="添加你觉得好的网址链接"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p><Input v-model="value.linkname" placeholder="请输入链接名称" /></p>
      <br />
      <p><Input v-model="value.link" placeholder="请输入链接" /></p>
    </Modal>
    <Modal v-model="model2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>你将删除链接，确认之后无法撤回</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" long @click="removeall"
          >删除</i-button
        >
      </div>
    </Modal>
    <Modal v-model="flag_1" width="360" @on-ok="update" @on-cancel="cancel">
      <br />
      <p><Input v-model="currentrow.linkname" placeholder="链接名称" /></p>
      <br />
      <p><Input v-model="currentrow.iconlink" placeholder="链接图标" /></p>
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
        v-on:on-selection-change="inchange"
        @on-current-change="handleRowChange"
      >
        <template slot-scope="{ row }" slot="linkname">
          <strong>{{ row.linkname }}</strong>
        </template>
        <template slot-scope="{ row }" slot="link">
          <strong>
            {{ row.link }}
          </strong>
        </template>
        <template slot-scope="{ row }" slot="iconlink">
          <strong>
            {{ row.iconlink }}
          </strong>
        </template>
        <template slot-scope="{ row }" slot="linkuser">
          <strong>
            {{ row.linkuser=="" ?"默认": row.linkuser[0].usernet }}
          </strong>
        </template>
        <template slot-scope="{}" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="flag_1 = true"
            >编辑</Button
          >
          <Button type="error" size="small" @click="model2 = true">删除</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Linklist extends Vue {
  cityList = [
    {
      value: "默认",
      label: "默认",
    },
    {
      value: "自定义",
      label: "自定义",
    },
  ];
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
      title: "图标链接",
      key: "iconlink",
      slot: "iconlink",
    },
    {
      title: "用户",
      key: "linkuser",
      slot: "linkuser",
    },
    {
      title: "操作",
      slot: "action",
      width: 230,
      align: "center",
    },
  ];
  flag = false;
  flag_1 = false;
  model2 = false;
  asd = "默认";
  data = new Array();
  value: any = {};
  id = new Array();
  query: any = {};
  currentrow = {};
  async fetch() {
    const data = await this.$http.get("/links", {
      params: this.query,
    });
    this.data = data.data;
    console.log(this.data);
  }
  async ok() {
    this.value.default = "默认";
    const data = await this.$http.post("/links", this.value);
    this.fetch();
    this.$Message.info(data.data.message);
    this.value.linkname = "";
    this.value.link = "";
  }
  @Watch("asd")
  getShowStatus(newVal:any) {
    this.query.default = newVal;
    this.fetch();
  }
  inchange(selection: any) {
    const data1 = selection.map((v: any) => {
      return v._id;
    });
    this.id = data1;
    console.log(this.id);
    // console.log(selection)
  }
  async removeall() {
    await this.$http.post("links/delete", this.id);
    this.model2 = false;
    this.fetch();
  }
  handleRowChange(currentRow: any) {
    this.currentrow = currentRow;
  }
  async update() {
    await this.$http.post("links/modify", this.currentrow);
    this.flag_1 = false;
    this.fetch();
  }

  cancel() {}
  created() {
    this.query.default = "默认";
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
