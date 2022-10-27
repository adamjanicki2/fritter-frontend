<template>
  <main>
    <section>
      <header>
        <h1>Single Freet Page</h1>
      </header>
      <h3 class="tc">
        {{ JSON.stringify(this.$route.query.id) }}
      </h3>
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
    console.log(this.$route);
  },
};
</script>
