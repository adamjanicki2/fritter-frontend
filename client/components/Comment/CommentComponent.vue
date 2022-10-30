<template>
  <article class="br2 bg-off-white ma2 pa2 ba b--near-black">
    <span>
      <router-link :to="`/user?username=${comment.author}`"
        ><span class="ma0 pa0 f3 fw4">@{{ comment.author }}</span></router-link
      >: {{ comment.content }}</span
    >
    <p class="">
      {{ comment.dateCreated }}
    </p>
    <div v-if="$store.state.username === comment.author" class="actions">
      <button @click="() => deleteCommentCallback(comment._id)">Delete</button>
    </div>
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
};
</script>
