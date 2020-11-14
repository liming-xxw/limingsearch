<template>
  <div class="setup">
    <div class="default">
      <span class="title">默认</span>
      <div class="picture-list">
        <div
          v-for="item in data"
          :key="item._id"
          class="picture-tags"
          @click="switchimg(item.url)"
        >
          <img :src="item.url" alt="" />
        </div>
      </div>
    </div>
    <span class="title">自定义</span>

    <div class="clearfix" style="display:flex">
      <div class="picture-list">
        <div
          v-for="item in fileList"
          :key="item._id"
          class="picture-tags"
          @click="switchimg(item.url)"
        >
          <img :src="item.url" alt="" />
        </div>
      </div>
      <a-upload
        action="http://localhost:3001/upload"
        :headers="headers"
        list-type="picture-card"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      query: {},
      data: {},
      fileList: [],
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    };
  },
  methods: {
    async fetch() {
      const data = await this.$http.get("/baimage");
      this.data = data.data;
      console.log(this.data);
    },
    async fetchuser() {
      const data = await this.$http.get("/baimage/user");
      // const t = [...data.data]
      // const arr = []
      //  t.map((itme)=>{
      // arr.push(Object.assign({},itme,{name:"xxw",tatus:"done:"}))
      // })
      this.fileList = data.data;
      // console.log(arr);
      console.log(this.fileList);
    },
    switchimg(img) {
      //  this.$store.dispatch("addimg",img)
      //  console.log(img)
      localStorage.setItem("imgurl1", img);
      this.$store.commit("addimg", img);
      console.log(localStorage.getItem("imgurl1"));
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    // handleChange({ fileList }) {
    //   this.fileList = fileList;
    // },
  },
  created() {
    this.fetch();
    this.fetchuser();
  },
};
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.setup {
  height: 400px;
  overflow-y: auto;
}
.title {
  color: #ccc;
  font-size: 13px;
  padding: 10px;
}
.picture-list {
  min-width: auto;
  /* height: auto; */
  min-height: 120px;
  cursor: pointer;
}
.picture-tags {
  float: left;
  width: 104px;
  height: 104px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin: 0 8px 8px 0;
}
.picture-tags img {
  width: 86px;
  height: 86px;
  margin: 7px;
}
</style>
