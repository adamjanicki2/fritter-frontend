<template>
  <main>
    <section>
      <header>
        <h1>Explore</h1>
      </header>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Explore Freets
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
            <span v-else>from unknown users</span>
          </h2>
        </div>
      </header>
      <section v-if="$store.state.exploreFreets.length">
        <FreetComponent
          v-for="freet in $store.state.exploreFreets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article v-else>
        <h3>
          No freets found. Try browsing
          <router-link to="/"> your feed </router-link>!
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
  name: "ExplorePage",
  components: { FreetComponent, GetFreetsForm, CreateFreetForm },
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
</style>
