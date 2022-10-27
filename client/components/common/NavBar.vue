<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav class="bg-off-black">
    <router-link to="/" class="no-underline light-blue dim pointer">
      <div class="left">
        <img src="../../public/donut.svg" />
        <h1 class="title i">Fritter</h1>
      </div>
    </router-link>
    <div class="right">
      <router-link
        v-if="$store.state.username"
        to="/feed"
        class="no-underline light-blue pointer dim"
      >
        My Feed
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/explore"
        class="no-underline light-blue pointer dim"
      >
        Explore
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/memories"
        class="no-underline light-blue pointer dim"
      >
        Memories
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
        class="no-underline light-blue pointer dim"
      >
        {{ $store.state.username }}
      </router-link>
      <router-link
        v-if="!$store.state.username"
        to="/create"
        class="no-underline light-blue pointer dim"
      >
        Create Account
      </router-link>
      <router-link
        v-if="!$store.state.username"
        to="/login"
        class="no-underline light-blue pointer dim"
      >
        Login
      </router-link>
      <button v-if="$store.state.username" @click="logout">Logout</button>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<script>
import util from "../../util.ts";
export default {
  name: "NavBar",
  methods: {
    logout() {
      util.del("/api/users/session").then(() => {
        this.$store.commit("setUsername", null);
        this.$store.commit("alert", {
          message: "You are now signed out!",
          status: "success",
        });
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>

<style scoped>
nav {
  padding: 1vw 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.title {
  font-size: 32px;
  margin: 0 5px;
}

img {
  height: 32px;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  font-size: 20px;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  align-items: center;
}

.right a {
  margin-left: 5px;
}

.alerts {
  width: 25%;
}
</style>
