<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h1>Your Feed</h1>
      </header>
      <CreateFreetForm />
    </section>
    <section v-if="$store.state.username">
      <header>
        <div class="left">
          <h2>
            Viewing all freets
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
            <span v-else>from your following</span>
          </h2>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="Search by author"
            button="Get freets"
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
</style>
