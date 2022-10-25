<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav class="bg-off-black">
    <router-link to="/" class="no-underline light-blue dim pointer">
      <div class="left">
        <img src="../../public/donut.svg" />
        <h1 class="title">Fritter</h1>
      </div>
    </router-link>
    <div class="right">
      <router-link
        v-if="$store.state.username"
        to="/account"
        class="no-underline light-blue pointer dim"
      >
        Account
      </router-link>
      <router-link
        v-else
        to="/login"
        class="no-underline light-blue pointer dim"
      >
        Login
      </router-link>
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
