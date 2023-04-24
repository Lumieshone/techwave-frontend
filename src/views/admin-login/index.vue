<template style="display: flex; justify-content: center">
  <v-card width="50%">
    <v-card-title>adminLogin - 管理员登录</v-card-title>
    <v-card-subtitle>
      <router-link to="/login">登录</router-link>
    </v-card-subtitle>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="handleLogin" class="pa-4">
          <validation-provider v-slot="{ errors }" name="Name" rules="required">
            <v-text-field
              v-model="username"
              :error-messages="errors"
              label="Name"
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
              label="Password"
              :type="showPwd ? 'text' : 'password'"
              required
              append-icon="mdi-eye"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
          </validation-provider>
          <div class="d-flex justify-center flex-wrap">
            <v-btn class="mt-2" type="submit" :disabled="invalid">登录</v-btn>
            <v-btn class="mt-2" @click="clear">清空</v-btn>
          </div>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
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
</style>
