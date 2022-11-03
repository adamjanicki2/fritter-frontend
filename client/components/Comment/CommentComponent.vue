<template>
  <article class="br2 bg-off-white ma2 pa2 ba b--near-black">
    <span>
      <router-link class="no-underline" :to="`/user?username=${comment.author}`"
        ><span class="ma0 pa0 f3 fw4 black i dim underline-hover"
          >@{{ comment.author }}</span
        ></router-link
      >: {{ comment.content }}</span
    >
    <p class="">
      {{ comment.dateCreated }}
    </p>
    <div v-if="$store.state.username === comment.author" class="actions mb3">
      <button @click="() => deleteCommentCallback(comment._id)">Delete</button>
    </div>
    <section>
      <div class="flex flex-row items-center">
        <img
          @click="like"
          src="../../public/heart.svg"
          width="32px"
          height="32px"
          class="pointer dim"
        />
        <span class="ml1 mr3 f3 fw4">{{ comment.likes }}</span>
        <img
          @click="flag"
          src="../../public/flag.svg"
          width="32px"
          height="32px"
          class="pointer dim"
        />
        <span class="ml1 f3 fw4">{{ comment.flags }}</span>
      </div>
    </section>
  </article>
</template>

<script>
import util from "../../util.ts";

export default {
  name: "CommentComponent",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    deleteCommentCallback: { type: Function, required: true },
  },
  methods: {
    like() {
      util
        .post("/api/likes", {
          body: JSON.stringify({
            parentId: this.comment._id,
            parentType: "comment",
          }),
        })
        .then((res) => {
          if (res) {
            this.comment.likes += res.increment;
            this.$store.commit("alert", {
              message: `You ${
                res.increment > 0 ? "liked" : "unliked"
              } this comment.`,
              status: "success",
            });
          } else {
            this.$store.commit("alert", {
              message: "There was an error liking this comment.",
              status: "error",
            });
          }
        });
    },
    flag() {
      util
        .post("/api/flags", {
          body: JSON.stringify({
            parentId: this.comment._id,
            parentType: "comment",
          }),
        })
        .then((res) => {
          if (res) {
            this.comment.flags += res.increment;
            this.$store.commit("alert", {
              message: `You ${
                res.increment > 0 ? "flagged" : "unflagged"
              } this comment.`,
              status: "success",
            });
          } else {
            this.$store.commit("alert", {
              message: "There was an error flagging this comment.",
              status: "error",
            });
          }
        });
    },
  },
};
</script>
