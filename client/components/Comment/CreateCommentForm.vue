<script>
import BlockForm from "@/components/common/BlockForm.vue";

export default {
  name: "CreateCommentForm",
  mixins: [BlockForm],
  props: {
    freetId: {
      type: String,
      required: true,
    },
    newCommentCallback: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      url: "/api/comments",
      method: "POST",
      hasBody: true,
      defaultBody: { parentId: this.freetId, parentType: "freet" },
      fields: [{ id: "content", label: "Content", value: "" }],
      title: "Create a comment",
      callback: (comment) => {
        this.newCommentCallback(comment.comment);
        const message = "Successfully created a comment!";
        this.$set(this.alerts, message, "success");
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      },
    };
  },
};
</script>
