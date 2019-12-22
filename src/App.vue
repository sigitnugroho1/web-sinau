<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <a href>
          <img class="logo-text" src="@/assets/Logo.svg" alt="logo" />
        </a>
      </div>
      <ul class="nav">
        <li class="nav-item">
          <a href class="nav-link">Find Training</a>
        </li>
        <li class="nav-item">
          <a href class="nav-link">Community</a>
        </li>
        <li class="nav-item">
          <!-- <router-link class="nav-link" v-if="$route.path !== '/note'" to="/note">Note</router-link> -->
          <a href class="nav-link">About Us</a>
        </li>
        <li class="nav-item" v-if="$isLogin">
          <!-- <router-link class="nav-link" v-if="$route.path !== '/note'" to="/note">Note</router-link> -->
          <a href class="nav-link" @click="doLogout">Log Out</a>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <notifications group="default" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "App" })
export default class App extends Vue {
  public doLogout() {
    // set data session
    //@ts-ignore
    this.$doCookieOperation("session", null);

    this.$router.push("/");
  }
}
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";

// #nav
//   text-align: center;
//   padding: 30px;

.login-page {
  background-color: #edf1f8;

  #nav {
    background: white;
    height: 66px;

    * {
      color: #01111c;
    }

    .logo {
      float: left;
      height: inherit;
      margin-left: 2em;
    }

    img {
      height: 50%;
    }

    .logo-text {
      margin: 30px;
      margin-top: 17px;
    }

    ul {
      float: left;
      margin: 0;
      padding: 0;
      list-style: none;
      height: inherit;

      li {
        float: left;
        position: relative;
        height: inherit;

        a {
          display: block;
          padding: 21px;
          font-size: 1.1em;
          text-decoration: none;
          height: inherit;
          margin: 0 20px;
          line-height: 27px;
        }

        a:hover {
          background: #df205b;
          transition: 0.5s;
          color: #edf1f8;
        }
      }
    }
  }
}
</style>
