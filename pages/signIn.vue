<template>
  <div>
    <v-row class="login">
      <v-col class="login__img-side" cols="12" md="6">
        <img src="/images/login-img-1.png" />
        <img class="login__img-side-2" src="/images/login-img-2.png" />
      </v-col>
      <v-col class="login__form-side" cols="12" md="4">
        <h1 class="login__heading primary-text pb-8">Welcome</h1>

        <h2 class="login__sub-heading tertiary-text pb-12">
          Enter your email and password to sign in
        </h2>

        <form class="login-form" @submit.prevent>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.email" label="Email"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.password"
                type="password"
                label="Password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="justify-space-between align-center">
            <v-checkbox class="pt-4" label="Remember me"></v-checkbox>
            <h3>
              <nuxt-link
                class="tertiary-text login-form__forgot-password-text"
                to="#"
              >
                Forgot Password ?</nuxt-link
              >
            </h3>
          </v-row>

          <v-row>
            <button
              type="button"
              class="btn btn--primary w-full"
              id="login_btn"
              @click.prevent="login"
            >
              Sign In
            </button>
          </v-row>
          <v-row class="pt-4">
            <p>To Sign Up for Login Details , kindly send a mail to <a class="login-form__forgot-password-text" href="mailto:customerexperience@guineainsurance.com">customerexperience@guineainsurance.com</a> </p>
            <p>or drop a message on our whatsapp no - <a class="number" href="https://wa.me/2347078669362">07078669362</a></p>
          </v-row>
        </form>
        
      </v-col>
      
    </v-row>
  </div>
</template>
<script>
definePageMeta({
  layout: "login",
});
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const { notify } = useNotification();
    const router = useRouter();
    const user = ref({
      email: "",
      password: "",
    });
    const authUser = ref([]);

    const login = async () => {
      if (user.value.email == "" || user.value.password == "") {
        notify({
          title: "Error",
          text: "All fields are required",
          type: "error",
        });
        return;
      }
      const login_btn = document.getElementById("login_btn");
      const login_btn_selector = document.querySelector("#login_btn");
      login_btn.disabled = true;
      login_btn_selector.innerHTML = "Loging in......";
      try {
        const authUser = await authStore.authenticateUser(user.value);
        console.log(authUser);
        if (authStore.authenticated) {
          notify({
            title: "Success",
            text: "Login Successfull",
            type: "success",
          });
          // get user profile
          router.push("/");
        } else {
          login_btn.disabled = false;
          login_btn_selector.innerHTML = "Sign In";
          const error = authUser?.value?.data?.message || "Failed to login";
          //   console.log(authUser.value.data.message);
          notify({
            title: "Error",
            text: error,
            type: "error",
          });
        }
      } catch (error) {
        notify({
          title: "Error",
          text: "An error occurred",
          type: "error",
        });
        login_btn.disabled = false;
        login_btn_selector.innerHTML = "Sign In";
        console.log(error);
      }
    };

    return { authStore, user, login, router, authUser, notify };
  },
});
</script>
<style lang="scss" scoped>
.login {
  &__img-side {
    position: relative;
  }
  &__img-side-2 {
    position: absolute;
    top: 10%;
    right: 30%;
  }

  &__form-side {
    padding-top: 10rem;
  }
}

.login-form {
  &__forgot-password-text {
    color: #a6ce39;
    display: block;
  }
}
.btn {
  padding: 1rem 1.875rem 1rem 1.875rem;
  border-radius: 5px;
  border: 1px solid #bcbcbc;
  background-color: #ffffff;
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  &--primary {
    border: none;
    background-color: #a6ce39;
    color: #ffffff;
  }
}

.number{
  color: #a6ce39;
}
</style>
