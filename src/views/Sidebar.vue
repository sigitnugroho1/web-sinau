<template>
  <div class="container" :class="{'show': showSidebar   }">
    <div class="control">
      <i class="fas fa-angle-double-right" @click="showNav"></i>
    </div>
    <div class="navigation-icons">
      <i class="fas fa-home"></i>
      <i class="fas fa-camera-retro"></i>
      <i class="fas fa-user-circle"></i>
      <i class="fas fa-comment-dots"></i>
    </div>
    <div class="navigation-links">
      <transition-group name="fade">
        <div v-show="showLink" key="1">Dashboard</div>
        <div v-show="showLink" key="2">Participant</div>
        <div v-show="showLink" key="3">Schedule</div>
        <div v-show="showLink" key="4">Participant pass</div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from "vue-property-decorator";
// import axios from "axios";

// import Participant from "../entity/Participant";
// import User from "../entity/User";

export default {
  data: () => {
    return {
      showSidebar: false,
      showLink: false
    };
  },
  methods: {
    showNav() {
      if (this.showSidebar) {
        this.showLink = false;
        setTimeout(() => {
          this.showSidebar = false;
        }, 500);
      } else {
        this.showLink = true;
        setTimeout(() => {
          this.showSidebar = true;
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  padding: 10px;
  min-height: calc(100vh-20px);
  background-color: white;
  border: solid;
  z-index: 999;
  transition: all 0.5s ease-in-out;

  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-bottom: 10px;

    i {
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    }
  }

  &.show {
    width: 180px;

    .control {
      color: white;
      transform: rotate(-180deg);
    }

    .naavigation-icons {
      color: #fff;
    }
  }

  .navigation-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50px;
    float: left;

    i {
      font-size: 2rem;
      padding: 10px 0;
      cursor: pointer;
      transition: all 5s ease-in-out;

      &:hover {
        color: #fff;
      }
    }
  }

  .navigation-links {
    padding-top: 14px;
    float: left;

    div {
      font-size: 1.35rem;
      padding-left: 10px;
      margin-bottom: 18px;
      cursor: pointer;

      &:hover {
        color: #df205b;
      }
    }
  }
}

@mixin nav-childs($values...) {
  @each $var in $values {
    &:nth-child(#{$var}) {
      transition: transform linear calc(0.1s * #{$var}), display 0.5s;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  @include nav-childs(1, 2, 3, 4, 5);
}
.fade-enter,
.fade-leave-to {
  transform: scale(0);
}
</style>
