<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="logout-wrapper">
      <button @click="doLogout">Logout</button>
    </div>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

@Component({ name: "home", components: { HelloWorld } })
export default class Home extends Vue {
  public doLogout() {
    // set data session
    //@ts-ignore
    this.$doCookieOperation("session", null);

    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
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

// versi js
// export default {
//   name: "home",
//   components: {
//     HelloWorld
//   }
// };
