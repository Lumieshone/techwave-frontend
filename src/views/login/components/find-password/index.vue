<template>
  <v-card
    ><v-card-title>找回密码 - Find Password</v-card-title>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="handleFindPassword">
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
            name="Old Password"
            rules="required|min:8|max:20"
          >
            <v-text-field
              :append-icon="show_password1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password1 ? 'text' : 'password'"
              @click:append="show_password1 = !show_password1"
              v-model="old_password"
              :error-messages="errors"
              label="Old Password"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="New Password"
            vid="new_password"
            rules="required|min:8|max:20|"
          >
            <v-text-field
              :append-icon="show_password2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password2 ? 'text' : 'password'"
              @click:append="show_password2 = !show_password2"
              v-model="new_password"
              :error-messages="errors"
              label="New Password"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Repeat Password"
            rules="required|confirmed:new_password"
          >
            <v-text-field
              :append-icon="show_password3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password3 ? 'text' : 'password'"
              @click:append="show_password3 = !show_password3"
              v-model="repeat_password"
              :error-messages="errors"
              label="Repeat Password"
              required
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close_find_password_dialog"
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" type="submit" :disabled="invalid" text>
              Save
            </v-btn>
          </validation-provider>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { find_password } from "@/api/user";

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
      mail: "1@qq.com",
      old_password: "12345678",
      new_password: "123456789",
      repeat_password: "123456789",

      show_password1: true,
      show_password2: true,
      show_password3: true,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    close_find_password_dialog() {
      this.$emit("close_find_password_dialog");
    },

    handleFindPassword() {
      this.$refs.observer
        .validate()
        .then(() => {
          find_password({
            mail: this.mail,
            old_password: this.old_password,
            new_password: this.new_password,
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
