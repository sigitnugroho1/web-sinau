<template>
  <div class="wrapper">
    <!-- <div class="logo">
      <a href>
        <img class="logo-text" src="./img/Logo.svg" alt="logo" />
      </a>
    </div>-->
    <section class="wraper">
      <form class="form-login" @submit="doSave">
        <h2 class="form-login-heading">Login to Sinau Koding</h2>
        <p>Let We Know Your Participant</p>
        <input
          v-model="user.username"
          type="text"
          placeholder="Username"
          autofocus
          class="form-control"
          :class="{'is-invalid': hasSubmit && user.username.length === 0}"
        />
        <input
          v-model="user.password"
          type="password"
          placeholder="Password"
          class="form-control"
          :class="{'is-invalid': hasSubmit && user.password.length === 0}"
        />

        <button class="btn btn-lg btn-primary btn-block" type="submit">
          <template v-if="isLoading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
          </template>
          <template v-else>Login</template>
        </button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

import User from "../entity/User";

@Component({ name: "login" })
export default class Login extends Vue {
  public user: User = new User();

  public rememberMe: boolean = false;

  public hasSubmit: boolean = false;

  public isLoading: boolean = false;

  public get isValid(): boolean {
    return this.user.username !== "" && this.user.password !== "";
  }

  public mounted() {
    //@ts-ignore
    this.$root.toggleBodyClass("addClass", "login-page");
  }

  public beforeDestroy() {
    //@ts-ignore
    this.$root.toggleBodyClass("removeClass", "login-page");
  }

  public doSave(event: Event): void {
    event.preventDefault();

    this.hasSubmit = true;

    if (!this.isLoading && this.isValid) {
      this.isLoading = true;

      axios
        .post("http://192.168.0.152:9000/login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(response => {
          if (response.data.status == "200") {
            this.hasSubmit = false;

            this.user = new User();

            //@ts-ignore
            this.$doCookieOperation("session", response.data.data);

            this.$notify({
              group: "default",
              type: "success",
              title: "Login",
              text: "Hello user! This is a notification is success!"
            });

            this.$router.push("/participant");
          } else {
            this.$notify({
              group: "default",
              type: "warn",
              title: "Login",
              text: "Hello user! This is a notification is valid!"
            });
            // alert("Invalid Login");
          }
        })
        .catch(error => {
          this.$notify({
            group: "default",
            type: "error",
            title: "Login",
            text: error.toString()
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
</script>

<style scoped lang="scss">
// @import url("https://fonts.googleapis.com/css?family=Montserrat:500&display=swap");

.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;

  .login-page {
    height: 100vh;
    position: relative;
  }

  .form-login {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);

    .form-login-heading h2 {
      text-align: center;
      margin: 10px 0px;
      color: #01111c;
      margin-bottom: 2rem;
      width: 500px;
    }

    .form-login-heading,
    .checkbox {
      margin-bottom: 30px;
    }

    .checkbox {
      font-weight: normal;
    }

    .form-control {
      position: relative;
      font-size: 16px;
      height: auto;
      padding: 10px;

      &:focus {
        z-index: 2;
      }
    }

    input[type="text"] {
      margin-bottom: 15px;
    }

    input[type="password"] {
      margin-bottom: 20px;
    }
  }
}
</style>
