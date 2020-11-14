<template>
  <div class="register">
    <div class="register-from">
      <div class="register-item">
        <a-card size="small" title="用户注册" style="width: 500px">
          <a-form-model
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <div class="from-item">
              <a-form-model-item label="创建用户名">
                <a-input class="ipt" v-model="form.usernet" />
              </a-form-model-item>
              <a-form-model-item label="创建账号">
                <a-input class="ipt" v-model="form.username" />
              </a-form-model-item>
              <a-form-model-item label="创建密码">
                <a-input-password class="ipt" v-model="form.userpass" />
              </a-form-model-item>  
              <a-form-model-item label="确认密码">
                <a-input-password class="ipt" v-model="pass1" />
              </a-form-model-item>
              <a-form-model-item label="请输入生日">
                <a-date-picker
                  class="ipt"
                  @change="onChange"
                  :locale="locale"
                />
              </a-form-model-item>
            </div>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="onSubmit">
                注册
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default {
  data() {
    return {
      locale,
      labelCol: { span: 4 },
      visible: true,
      wrapperCol: { span: 14 },
      form: {},
      pass1: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.userpass == this.pass1) {
        await this.$http.post("/auth/register", this.form);
        this.$emit("event", false);
      }
    },
    onChange(date, dateString) {
      this.form.userdate = dateString;
    },
  },
};
</script>
<style scoped>
.register {
  position: absolute;
  top: 240px;
  left: 520px;
}
.register-from {
  text-align: center;
}
.from-item {
  margin-left: 50px;
}
.ipt {
  margin-left: 20px;
}
</style>
