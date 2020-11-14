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
      title="添加你觉得好的图片"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Upload
        ref="upload"
        :show-upload-list="true"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg', 'jpeg', 'png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="http://localhost:3000/upload"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="View Image" v-model="visible">
        <img
          :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
          v-if="visible"
          style="width: 100%"
        />
      </Modal>
    </Modal>
    <Modal v-model="model2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>你将删除图片，确认之后无法撤回</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <i-button type="error" size="large" long @click="removeall"
          >删除</i-button
        >
      </div>
    </Modal>
    <div class="table">
      <Table
        width="1150"
        height="465"
        border
        highlight-row
        :columns="columns12"
        :data="data"
        context-menu
        ref="selection"
        style="margin-top:20px"
        v-on:on-selection-change="inchange"
        @on-current-change="handleRowChange"
      >
        <template slot-scope="{ row }" slot="url">
          <strong>
            <div>
              <img class="baimg" :src="row.url" alt="" />
            </div>
          </strong>
        </template>
         <template slot-scope="{ row }" slot="type">
          <strong>
            {{  row.type }}
          </strong>
        </template>
        <template slot-scope="{ row }" slot="image_user">
          <strong>
            {{ row.image_user == "" ? "默认" : row.image_user[0].usernet }}
          </strong>
        </template>
        <template slot-scope="{}" slot="action">
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
  defaultList = [];
  columns12 = [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "背景图",
      slot: "url",
      align:'center'
    },
     {
      title: "类型",
      slot: "type",
    },
    {
      title: "用户",
      key: "image_user",
      slot: "image_user",
    },
    {
      title: "操作",
      slot: "action",
      width: 230,
      align: "center",
    },
  ];
  flag = false;
  model2 = false;
  asd = "默认";
  data = new Array();
  value: any = {};
  id = new Array();
  query: any = {};
  currentrow = {};
  imgName = "";
  uploadList = [];
  visible = false;
  async fetch() {
    const data = await this.$http.get("/baimage", {
      params: this.query,
    });
    this.data = data.data;
    console.log(this.data);
  }
  async ok() {
    this.fetch();
    this.$Message.info("上传成功");
  }
  @Watch("asd")
  getShowStatus(newVal: any) {
    this.query.type = newVal;
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
    await this.$http.post("baimage/delete", this.id);
    this.model2 = false;
    this.fetch();
  }
  handleRowChange(currentRow: any) {
    this.currentrow = currentRow;
  }

  handleView(name: any) {
    this.imgName = name;
    this.visible = true;
  }
  handleRemove() {
    // const fileList = this.$refs.upload.fileList;
    // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    console.log(this.$refs.upload);
  }
  handleSuccess(res: any, file: any) {
    console.log(file);

  }
  handleFormatError(file: any) {
    this.$Notice.warning({
      title: "The file format is incorrect",
      desc:
        "File format of " +
        file.name +
        " is incorrect, please select jpg or png.",
    });
  }
  handleMaxSize(file: any) {
    this.$Notice.warning({
      title: "Exceeding file size limit",
      desc: "File  " + file.name + " is too large, no more than 2M.",
    });
  }
  handleBeforeUpload() {
    const check = this.uploadList.length < 5;
    if (!check) {
      this.$Notice.warning({
        title: "数量超出",
      });
    }
    return check;
  }

  cancel() {}
  created() {
    this.query.type = "默认";
    this.fetch();
  }
  mounted() {
    //  this.uploadList = this.$refs.upload.fileList;
    console.log(this.$refs.upload);
  }
}
</script>
<style>
.but-tags {
  width: 150px;
  display: flex;
  justify-content: space-between;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.baimg{
  width: 100px;
  height: 100px;
  transform: scale(0.7);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: center;
}
</style>
