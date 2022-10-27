<!-- Home page -->

<template>
  <main>
    <section>
      <header>
        <h1 class="m-auto">Welcome to Fritter!</h1>
      </header>
      <div class="flex flex-column items-center">
        <h3 class="tc" v-if="!$store.state.username">
          <router-link to="/login">Sign in</router-link>
          or
          <router-link to="/create">create an account</router-link>
          to get started.
        </h3>
        <h4>
          Fritter is a platform to share everything you want. Start Sharing
          today!
        </h4>
        <img
          src="../../public/donut.svg"
          width="400px"
          height="400px"
          class="m-auto ma4 spinning-donut"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header,
header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Donut animation (used CSS from React sandbox) */

@media (prefers-reduced-motion: no-preference) {
  .spinning-donut {
    animation: logo-spin infinite 30s linear;
  }
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
