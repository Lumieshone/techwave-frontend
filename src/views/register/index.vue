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
              v-model="email"
              :error-messages="errors"
              label="Mail"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Username"
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
            vid="password"
            name="Password"
            rules="required|min:8|max:20"
          >
            <v-text-field
              :append-icon="show_password1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password1 ? 'text' : 'password'"
              @click:append="show_password1 = !show_password1"
              v-model="password"
              :error-messages="errors"
              label="Password"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Repeat Password"
            rules="required|confirmed:password"
          >
            <v-text-field
              :append-icon="show_password2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password2 ? 'text' : 'password'"
              @click:append="show_password2 = !show_password2"
              v-model="repeatPassword"
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

import { required, max, min, email, confirmed } from "vee-validate/dist/rules";
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
extend("confirmed", {
  ...confirmed,
  message: "{_field_} must be the same as the password above",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      // info
      email: "1@qq.com",
      username: "opopop",
      password: "12345678",
      repeatPassword: "12345678",

      // loading logo
      loading: false,

      // show password
      show_password1: true,
      show_password2: true,
    };
  },
  methods: {
    handleRegister() {
      this.loading = true;
      register({
        email: this.email,
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
      this.email = "";
      this.username = "";
      this.password = "";
      this.repeatPassword = "";
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
