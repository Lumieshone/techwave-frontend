<template>
  <v-card shaped width="50%" class="mx-auto"
    ><v-card-title>找回密码 - Find Password</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="handleFindPassword">
          <v-row justify="center" align="center">
            <v-col cols="9">
              <validation-provider
                v-slot="{ errors }"
                name="Mail"
                rules="required|email"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="邮箱"
                  color="#7d73be"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="3">
              <v-btn @click="sendEmailCode()" text>
                <v-icon left>mdi-email</v-icon>
                发送验证码
              </v-btn>
            </v-col>
          </v-row>

          <validation-provider
            v-slot="{ errors }"
            name="VerifyCode"
            rules="required"
          >
            <v-text-field
              v-model="verify_code"
              :error-messages="errors"
              label="验证码"
              required
              color="#7d73be"
            ></v-text-field>
          </validation-provider>

          <!-- <validation-provider
            v-slot="{ errors }"
            name="Old Password"
            rules="required|min:8|max:20"
          >
            <v-text-field
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword1 ? 'text' : 'password'"
              @click:append="showPassword1 = !showPassword1"
              v-model="old_password"
              :error-messages="errors"
              label="Old Password"
              color="#7d73be"
              required
            ></v-text-field>
          </validation-provider> -->

          <validation-provider
            v-slot="{ errors }"
            name="New Password"
            vid="new_password"
            rules="required|min:8|max:20|"
          >
            <v-text-field
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="showPassword1 = !showPassword1"
              v-model="new_password"
              :error-messages="errors"
              label="新密码"
              color="#7d73be"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Repeat Password"
            rules="required|confirmed:new_password"
          >
            <v-text-field
              :append-icon="show_password2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password2 ? 'text' : 'password'"
              @click:append="show_password2 = !show_password2"
              v-model="repeat_password"
              :error-messages="errors"
              label="再次输入密码"
              color="#7d73be"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
              <v-btn @click="closeFindPasswordDialog" class="mr-4">
                <v-icon>mdi-close</v-icon>
                取消
              </v-btn>
              <v-btn type="submit" :disabled="invalid" text>
                <v-icon>mdi-content-save</v-icon>
                保存
              </v-btn>
            </div>
          </validation-provider>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { sendEmailCode, verifyAndModifyPassword } from "@/api/user";
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
  name: "FindPassword",
  data() {
    return {
      email: "",
      verify_code: undefined,
      new_password: "",
      repeat_password: "",

      showPassword1: false,
      show_password2: false,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    closeFindPasswordDialog() {
      this.$emit("closeFindPasswordDialog");
    },

    sendEmailCode() {
      if (!this.email) {
        this.$message("请输入邮箱！");
        return;
      }
      sendEmailCode(this.email)
        .then(() => {
          this.$message("发送成功！");
        })
        .error(() => {
          this.$message("额，好像哪里出现了问题..");
        });
    },

    handleFindPassword() {
      this.$refs.observer
        .validate()
        .then(() => {
          verifyAndModifyPassword({
            email: this.email,
            verifyCode: this.verify_code,
            newPassword: this.new_password,
          }).then(() => {
            this.$message.success("修改密码成功！");
          });
        })
        .catch(() => {
          this.$message.error("找回密码信息有误！");
        });
    },
  },
};
</script>
