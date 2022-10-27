<template>
  <main>
    <section>
      <header>
        <h1>Single Freet Page</h1>
      </header>
      <h3 class="tc" v-if="freet === null">
        A freet with ID: '{{ this.$route.query.id }}' does not exist.
      </h3>
      <section v-if="freet">
        <FreetComponent key="freet" :freet="freet" :showLinkToFreet="false" />
      </section>
      <section>
        <h3 v-for="comment in comments">{{ JSON.stringify(comments) }}</h3>
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
    const { id } = this.$route.query;
    util.get(`/api/freets?freetId=${id}`).then((res) => {
      this.freet = res ?? null;
      res &&
        util.get(`/api/comments?parentId=${id}`).then((res) => {
          this.comments = res;
        });
    });
  },
  data() {
    return { freet: undefined, comments: null };
  },
};
</script>
