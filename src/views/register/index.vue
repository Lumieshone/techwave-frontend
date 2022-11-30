<template>
  <v-card>
    <v-card-title>Register - 注册</v-card-title>
    <v-card-subtitle>
      <router-link to="/home">首页</router-link>
      <span style="margin: 10px">|</span>
      <router-link to="/login">登录</router-link>
    </v-card-subtitle>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="handleRegister">
          <validation-provider
            v-slot="{ errors }"
            name="Mail"
            rules="required|email"
          >
            <v-text-field
              v-model="mail"
              :error-messages="errors"
              label="Mail"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Mail"
            rules="required|min:1|max:20"
          >
            <v-text-field
              v-model="username"
              :error-messages="errors"
              label="Username"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Password"
            rules="required|min:8|max:20"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Password"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Repeat Password"
            rules="required|samepassword"
          >
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Repeat Password"
              required
            ></v-text-field>
          </validation-provider>

          <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { register } from "@/api/user";

import { required, max, min, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{_field_} may not be fewer than {length} characters",
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("email", {
  ...email,
  message: "{_field_} must be a valid email address",
});
extend("samepassword", {
  validate(value) {
    return value != this.password;
  },
  message: "{_field_} must be same as the password above",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      // info
      mail: "1@qq.com",
      username: "opopop",
      password: "12345678",
      repeat_password: "12345678",

      // loading logo
      loading: false,

      // 重定向
      redirect: undefined,
    };
  },
  methods: {
    handleRegister() {
      this.loading = true;
      register({
        mail: this.mail,
        password: this.password,
        username: this.username,
      })
        .then(() => {
          this.loading = false;
          this.$router.push({ path: "/login" });
          this.$message.success("注册成功！已为你跳转到登录页面");
        })
        .catch(() => {
          this.loading = false;
          console.log("register fail");
          this.$message.error("注册出现了一点问题..");
        });
    },
    clear() {
      this.mail = "";
      this.username = "";
      this.password = "";
      this.repeat_password = "";
      this.$refs.observer.reset();
    },
  },
};
</script>

<style scoped>
a {
  color: #6d6d6d;
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>
