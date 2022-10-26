<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h1>Your Feed</h1>
      </header>
      <CreateFreetForm />
    </section>
    <section v-else>
      <header>
        <h1 class="m-auto">Welcome to Fritter!</h1>
      </header>
      <div class="flex flex-column items-center">
        <h3 class="tc">
          <router-link to="/login">Sign in</router-link>
          to get started.
        </h3>
        <img
          src="../../public/donut.svg"
          width="400px"
          height="400px"
          class="m-auto ma4 spinning-donut"
        />
      </div>
    </section>
    <section v-if="$store.state.username">
      <header>
        <div class="left">
          <h2>
            Viewing all freets from your following
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get freets"
          />
        </div>
      </header>
      <section v-if="$store.state.feedFreets.length">
        <FreetComponent
          v-for="freet in $store.state.feedFreets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article v-else>
        <h3>
          No freets found. Try browsing the
          <router-link to="/explore"> explore </router-link> page or following
          some users!
        </h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CreateFreetForm from "@/components/Freet/CreateFreetForm.vue";
import GetFreetsForm from "@/components/Freet/GetFreetsForm.vue";

export default {
  name: "FreetPage",
  components: { FreetComponent, GetFreetsForm, CreateFreetForm },
  mounted() {
    this.$refs.getFreetsForm.submit();
  },
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

button {
  margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
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
