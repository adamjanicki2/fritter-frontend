<template>
  <main>
    <section>
      <header>
        <h1>Profile Page</h1>
      </header>
      <h3 class="tc">
        {{ JSON.stringify(this.$route.query.id) }}
      </h3>
    </section>
  </main>
</template>

<script>
import util from "../../util.ts";

export default {
  name: "ProfilePage",
  components: {},
  mounted() {
    console.log(this.$route);
  },
};
</script>
