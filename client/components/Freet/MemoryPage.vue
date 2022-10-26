<template>
  <main>
    <section>
      <header>
        <h1>Memories</h1>
      </header>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>Your memories</h2>
        </div>
      </header>
      <section v-if="$store.state.memories.length">
        <FreetComponent
          v-for="freet in $store.state.memories"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article v-else>
        <h3>
          You don't have any memories from
          <span class="i b">
            {{
              new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                .toString()
                .split(" ")
                .slice(1, 4)
                .join(" ")
            }}
          </span>
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
  name: "MemoryPage",
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
