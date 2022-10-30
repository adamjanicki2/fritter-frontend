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
        <h2>Comments</h2>
        <CreateCommentForm
          v-if="freet"
          :freetId="freet._id"
          :newCommentCallback="
            (comment) => {
              comments.unshift(comment);
            }
          "
        />
        <CommentComponent
          v-for="comment in comments"
          :key="comment._id"
          :comment="comment"
          :deleteCommentCallback="deleteCommentCallback"
        />
        <h3 v-if="!comments?.length">No comments yet.</h3>
      </section>
    </section>
  </main>
</template>

<script>
import FreetComponent from "@/components/Freet/FreetComponent.vue";
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateCommentForm from "@/components/Comment/CreateCommentForm.vue";

import util from "../../util.ts";

export default {
  name: "SingleFreetPage",
  components: {
    FreetComponent,
    CreateCommentForm,
    CommentComponent,
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
  methods: {
    deleteCommentCallback(commentId) {
      util.del(`/api/comments/${commentId}`).then((res) => {
        if (res) {
          this.comments = this.comments.filter((c) => c._id !== commentId);
        }
      });
    },
  },
};
</script>
