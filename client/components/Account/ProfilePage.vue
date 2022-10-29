<template>
  <main>
    <section>
      <header>
        <h1>Profile Page</h1>
      </header>
      <h3 class="tc" v-if="user === null">
        User with username '{{ this.$route.query.username }}' does not exist.
      </h3>
      <section v-if="user">
        <h3>{{ JSON.stringify(user) }}</h3>
      </section>
      <hr />
      <section v-if="freets">
        <FreetComponent
          v-for="freet in freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
    </section>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import util from "../../util.ts";

export default {
  name: "SingleFreetPage",
  components: {
    FreetComponent,
  },
  mounted() {
    const { username } = this.$route.query;
    util.get(`/api/users?username=${username}`).then((res) => {
      if (res) {
        this.user = res.user;
        util.get(`/api/freets?author=${username}`).then((res) => {
          this.freets = res;
        });
      }
    });
  },
  data() {
    return { user: undefined, freets: undefined };
  },
};
</script>
