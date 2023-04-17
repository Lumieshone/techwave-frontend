<template>
  <v-container>
    <v-card width="50%">
      <v-card-title>Login - 登录</v-card-title>
      <v-card-subtitle>
        <router-link to="/register">注册</router-link>
        <span style="margin: 10px">|</span>
        <router-link to="/admin-login">管理员登录</router-link>
        <span style="margin: 10px">|</span>
        <v-dialog
          v-model="showFindPasswordDialog"
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">找回密码</span>
          </template>
          <find-password
            @closeFindPasswordDialog="showFindPasswordDialog = false"
          />
        </v-dialog>
      </v-card-subtitle>
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="handleLogin">
            <v-text-field
              v-model="account"
              :error-messages="errors"
              label="Mail"
              color="#7d73be"
              required
            ></v-text-field>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                color="#7d73be"
                :error-messages="errors"
                label="Password"
                required
              ></v-text-field>
            </validation-provider>
            <v-btn class="mr-4" type="submit" :disabled="invalid">
              登录
            </v-btn>
            <v-btn @click="clear"> 清空 </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FindPassword from "@/views/login/components/find-password/index";

import { required, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("max", {
  ...max,
  message: "{field} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{field} may not be fewer than {length} characters",
});
extend("required", {
  ...required,
  message: "{field} can not be empty",
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
      account: "user",
      password: "12345678",
      loading: false,
      redirect: undefined,
      showFindPasswordDialog: false,
      showPassword: false,
    };
  },
  watch: {
    route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store
        .dispatch("user/login", {
          account: this.account,
          password: this.password,
        })

        .then(() => {
          this.loading = false;
          this.$message.success("登录成功！已为你自动跳转");
          this.$router.push({ path: this.redirect || "/home" });
        })
        .catch(() => {
          this.loading = false;
          console.log("login fail");
        });
    },
    clear() {
      this.account = "";
      this.password = "";
      this.$refs.observer.reset();
    },
    closeFindPasswordDialog() {
      this.showFindPasswordDialog = false;
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
