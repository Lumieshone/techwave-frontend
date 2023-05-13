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
        <v-card width="60%" class="mx-auto mt-8" shaped elevation="4">
          <v-card-title class="text-h5 text-center">adminLogin - 管理员登录</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <router-link to="/login">普通用户登录</router-link>
          </v-card-subtitle>
          <v-card-text>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="handleLogin">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field
                    v-model="username"
                    :error-messages="errors"
                    label="用户名"
                    color="#7d73be"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <v-text-field
                    v-model="password"
                    :counter="10"
                    :error-messages="errors"
                    label="密码"
                    :type="showPwd ? 'text' : 'password'"
                    required
                    append-icon="mdi-eye"
                    @click:append="showPwd = !showPwd"
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
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("max", {
  ...max,
  message: "{field} 不能超过 {length} 个字符",
});

extend("required", {
  ...required,
  message: "{field} 不能为空",
});

export default {
  name: "AdminLogin",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: "admin",
      password: "admin",
      showPwd: false,

      slides: [
        "发现最新的电子产品资讯",
        "TechWave，欢迎你的到来",
        "与科技同行，畅游数码世界",
        "拓展科技视野，获取前沿资讯",
      ],
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("user/adminLogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/admin-dashboard");
        });
    },
    clear() {
      this.username = "";
      this.password = "";
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
