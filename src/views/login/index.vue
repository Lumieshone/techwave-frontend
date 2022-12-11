<template>
  <v-container>
    <v-card>
      <v-card-title>Login - 登录</v-card-title>
      <v-card-subtitle>
        <router-link to="/register">注册</router-link>
        <span style="margin: 10px">|</span>
        <v-dialog
          v-model="show_find_password_dialog"
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">找回密码</span>
          </template>
          <FindPassword
            @close_find_password_dialog="show_find_password_dialog = false"
          />
        </v-dialog>
      </v-card-subtitle>
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="handleLogin">
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
              name="Password"
              rules="required"
            >
              <v-text-field
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password ? 'text' : 'password'"
                @click:append="show_password = !show_password"
                v-model="password"
                :error-messages="errors"
                label="Password"
                required
              ></v-text-field>
            </validation-provider>
            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FindPassword from "@/views/login/components/find-password/index";

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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
    FindPassword,
  },
  data() {
    return {
      // info
      email: "user_mail@qq.com",
      password: "111111",

      // loading logo
      loading: false,

      // 重定向
      redirect: undefined,

      // find password
      show_find_password_dialog: false,

      // show password
      show_password: true,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store
        .dispatch("user/login", { email: this.email, password: this.password })
        .then(() => {
          this.loading = false;
          this.$message.success("登录成功！已为你自动跳转");
          this.$router.push({ path: this.redirect || "/home" });
        })
        .catch(() => {
          this.loading = false;
          this.$message.error("登录出现了一点问题..");
          console.log("login fail");
        });
    },
    clear() {
      this.email = "";
      this.password = "";
      this.$refs.observer.reset();
    },
    close_find_password_dialog() {
      this.find_password_dialog = false;
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
