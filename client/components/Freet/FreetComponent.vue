<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article class="freet ma2 br3 bg-off-white">
    <header>
      <router-link class="no-underline" :to="`/user?username=${freet.author}`"
        ><h3 class="f3 fw5 black i dim underline-hover">
          @{{ freet.author }}
        </h3></router-link
      >
    </header>
    <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    />
    <p v-else class="content">
      {{ freet.content }}
    </p>
    <p class="info">
      {{ freet.dateModified }}
      <i v-if="freet.edited">(edited)</i>
    </p>
    <div
      v-if="$store.state.username === freet.author && showLinkToFreet"
      class="actions mb2"
    >
      <button v-if="editing" @click="submitEdit">Save changes</button>
      <button v-if="editing" @click="stopEditing" class="mh2">
        Discard changes
      </button>
      <button v-if="!editing" @click="startEditing" class="mr2">Edit</button>
      <button @click="deleteFreet">Delete</button>
    </div>
    <router-link
      class="mv5 no-underline underline-hover i black"
      v-if="showLinkToFreet"
      :to="`/freet?id=${freet._id}`"
      >View comments</router-link
    >
    <section>
      <div class="flex flex-row items-center">
        <img
          @click="like"
          src="../../public/heart.svg"
          width="32px"
          height="32px"
          class="pointer dim"
        />
        <span class="ml1 mr3 f3 fw4">{{ freet.likes }}</span>
        <img
          @click="flag"
          src="../../public/flag.svg"
          width="32px"
          height="32px"
          class="pointer dim"
        />
        <span class="ml1 mr3 f3 fw4">{{ freet.flags }}</span>
        <img src="../../public/comment.svg" />
        <span class="f3 fw4">{{ freet.comments }}</span>
      </div>
    </section>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
import util from "../../util.ts";

export default {
  name: "FreetComponent",
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true,
    },
    showLinkToFreet: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draft: this.freet.content, // Potentially-new content for this freet
      alerts: {}, // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draft = this.freet.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freet.
       */
      this.editing = false;
      this.draft = this.freet.content;
    },
    like() {
      util
        .post("/api/likes", {
          body: JSON.stringify({
            parentId: this.freet._id,
            parentType: "freet",
          }),
        })
        .then((res) => {
          if (res) {
            this.freet.likes += res.increment;
            this.$store.commit("alert", {
              message: `You ${
                res.increment > 0 ? "liked" : "unliked"
              } this freet.`,
              status: "success",
            });
          } else {
            this.$store.commit("alert", {
              message: "There was an error liking this freet.",
              status: "error",
            });
          }
        });
    },
    flag() {
      util
        .post("/api/flags", {
          body: JSON.stringify({
            parentId: this.freet._id,
            parentType: "freet",
          }),
        })
        .then((res) => {
          if (res) {
            this.freet.flags += res.increment;
            this.$store.commit("alert", {
              message: `You ${
                res.increment > 0 ? "flagged" : "unflagged"
              } this freet.`,
              status: "success",
            });
          } else {
            this.$store.commit("alert", {
              message: "There was an error flagging this freet.",
              status: "error",
            });
          }
        });
    },
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: "DELETE",
        callback: () => {
          this.$store.commit("alert", {
            message: "Successfully deleted freet!",
            status: "success",
          });
        },
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates freet to have the submitted draft content.
       */
      if (this.freet.content === this.draft) {
        const error =
          "Error: Edited freet content should be different than current freet content.";
        this.$set(this.alerts, error, "error"); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: "PATCH",
        message: "Successfully edited freet!",
        body: JSON.stringify({ content: this.draft }),
        callback: () => {
          this.$set(this.alerts, params.message, "success");
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        },
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method,
        headers: { "Content-Type": "application/json" },
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit("refreshFreets");

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
};
</script>

<style scoped>
.freet {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
}
</style>
