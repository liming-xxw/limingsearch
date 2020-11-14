<template>
  <div class="home">
    <div class="layout">
      <Row type="flex">
        <i-col span="5" class="layout-menu-left">
          <Menu theme="dark" width="auto" router>
            <div class="layout-logo-left">
              <p>limingxxw视频网站后台管理</p>
            </div>
            <Submenu
              v-for="(item, index) in menu"
              :name="index + 1"
              :index="index + 1"
              :key="`menu-item-${index}`"
            >
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                {{ item.title }}
              </template>
              <Menu-item
                v-for="(subitem, subindex) in item.items"
                :name="`menu-items1-${index}-${subindex}`"
                :to="subitem.path"
                :key="`menu-items-${index}-${subindex}`"
                >{{ subitem.title }}</Menu-item
              >
            </Submenu>
          </Menu>
        </i-col>
        <i-col span="19">
          <div class="layout-header"></div>
          <div class="layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb-item
                v-for="(item1, index1) in $route.meta"
                :key="index1"
                >{{ item1.name }}</Breadcrumb-item
              >
            </Breadcrumb>
          </div>
          <div class="layout-content">
            <div class="layout-content-main">
              <router-view></router-view>
            </div>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Main extends Vue {
  menu = [
    {
      title: "主页",
      items: [
        { title: "控制台", path: "/" },
      ],
    },
    {
      title: "内容",
      items: [
        { title: "链接管理", path: "/link/list" },
        { title: "背景图管理", path: "/image/list" },
      ],
    },
    {
      title: "用户",
      items: [
        {
          title: "网站用户",
          path: "/users/list",
        },
        {
          title: "管理员管理",
          path: "",
        },
      ],
    },
  ];
  created() {}
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f2f2f2;
  position: relative;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 631px;
  margin: 15px;
  overflow: hidden;
  background: #f2f2f2;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
  margin-left: -1px;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
  size: 10px;
  line-height: 30px;
  cursor: pointer;
}
.layout-logo-left p {
  color: black;
  text-align: center;
}
</style>
