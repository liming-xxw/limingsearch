<template>
  <div class="crud">
    <a-card>
      <a-modal
        title="请输入自定义的链接"
        v-model="flag"
        centered
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p><a-input placeholder="请输入链接" v-model="value.link" /></p>
        <br />
        <p>
          <a-input
            placeholder="请自定义你的链接名称"
            v-model="value.linkname"
          />
        </p>
      </a-modal>
      <a-card-grid class="cards" v-for="item in data" :key="item._id">
        <a :href="item.link" target="_blank">
          <div class="">
            <img
              class="card-img"
              :src="
                `${
                  Boolean(item.iconlink) ? item.iconlink : item.link
                }/favicon.ico`
              "
              alt=""
            />
          </div>
          <div class="crud-title">
            <a-tooltip>
              <template slot="title">
                {{ item.linkname }}
              </template>
              <p>{{ item.linkname }}</p>
            </a-tooltip>
          </div>
        </a>
      </a-card-grid>
      <a-card-grid class="cards" v-for="item in userdata" :key="item._id">
        <a :href="item.link" target="_blank">
          <div class="">
            <img
              class="card-img"
              :src="
                `${
                  Boolean(item.iconlink) ? item.iconlink : item.link
                }/favicon.ico`
              "
              alt=""
            />
          </div>
          <div class="crud-title">
            <a-tooltip>
              <template slot="title">
                {{ item.linkname }}
              </template>
              <p>{{ item.linkname }}</p>
            </a-tooltip>
          </div>
        </a>
      </a-card-grid>
      <a-card-grid class="cards" @click="flagb">
        <div>
          <a-icon type="plus" />
          <div class="ant-upload-text">
            自定义
          </div>
        </div>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      userdata: {},
      linkicon: {},
      flag: false,
      value: {},
    };
  },
  methods: {
    async fetch() {
      const data = await this.$http.get("/links");
      this.data = data.data;
    },
    async UserLink() {
      const data = await this.$http.get("/links/user");
      this.userdata = data.data;
      console.log(this.userdata);
    },
    flagb() {
      if (localStorage.token) {
        this.flag = true;
      } else {
        this.$message.warning("请先登录");
      }
    },
    async handleOk() {
      await this.$http.post("/links", this.value);
      this.flag = false;
      this.UserLink()
    },
    handleCancel() {
      this.$message.warning("添加取消");
    },
  },
  created() {
    this.fetch();
    if (localStorage.token) {
      this.UserLink()
    }
  },
};
</script>

<style scoped>
.ant-card-bordered {
  border: none !important;
}
.cards {
  width: 100px;
  height: 90px !important;
  text-align: center;
  /* margin-left: 10px;
  margin-top: 10px; */
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.card-img {
  margin: 0px auto;
  /* margin-left: -35px;
  margin-top: -30px; */
}
.crud-title {
  text-align: center;
  width: 60px;
  margin-left: -5px;
  margin-top: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.crud-title p {
  color: black;
  font-size: small;
}
</style>
