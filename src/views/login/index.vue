<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="6" offset="1">
        <v-card shaped class="mt-10">
          <v-carousel>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-row class="fill-height" align="center" justify="center">
                <div
                  class="carousel"
                  :style="`backgroundImage:url(${require(`@/assets/homepage_bg/pic${
                    i + 1
                  }.jpg`)})`"
                >
                  <div
                    class="text-h4 carousel__title"
                    style="text-stroke: black"
                  >
                    {{ slide }}
                  </div>
                </div>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="5" class="d-flex flex-column justify-center align-center">
        <h1 class="text-h3 text-center mb-4">TechWave论坛</h1>
        <v-card width="50%" class="mx-auto mt-8" shaped elevation="4">
          <v-card-title class="text-h5 text-center">Login - 登录</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle class="text-center">
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
                  label="邮箱或账号"
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
                    label="密码"
                    required
                  ></v-text-field>
                </validation-provider>
                <div class="d-flex justify-space-around">
                  <v-btn class="mr-4" type="submit" :disabled="invalid">
                    <v-icon left>mdi-login</v-icon>
                    登录
                  </v-btn>
                  <v-btn @click="clear">
                    <v-icon left>mdi-refresh</v-icon>
                    清空
                  </v-btn>
                </div>
              </form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
      items: [
        {
          src: "https://picsum.photos/600/400/?random",
        },
        {
          src: "https://picsum.photos/600/400/?random",
        },
        {
          src: "https://picsum.photos/600/400/?random",
        },
      ],

      slides: [
        "发现最新的电子产品资讯",
        "TechWave，欢迎你的到来",
        "与科技同行，畅游数码世界",
        "拓展科技视野，获取前沿资讯",
      ],

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

.carousel {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel__title {
  margin: 0;
  padding: 0;
  color: #fff;
}
</style>
