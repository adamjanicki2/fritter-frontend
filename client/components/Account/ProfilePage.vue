<template>
  <main>
    <section>
      <header v-if="user">
        <h1>@{{ this.user.username }}'s Profile Page</h1>
      </header>
      <h2 class="tc" v-if="user === null">
        User with username '{{ this.$route.query.username }}' does not exist.
      </h2>
      <section v-if="followingInfo">
        <div class="flex flex-row items-center">
          <h3 class="mr3">Followers: {{ this.followingInfo.followers }}</h3>
          <h3 class="">Following: {{ this.followingInfo.following }}</h3>
        </div>
        <button v-if="isFollowing !== undefined" @click="followCallback">
          {{ this.isFollowing ? "Unfollow" : "Follow" }}
        </button>
      </section>
      <hr v-if="user" />
      <h2 v-if="user">Freets by @{{ user.username }}</h2>
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
    if (username === this.$store.state.username) {
      this.$router.push("/account");
      return;
    }
    util.get(`/api/users?username=${username}`).then((res) => {
      if (res) {
        this.user = res.user;
        util.get(`/api/freets?author=${username}`).then((res) => {
          this.freets = res;
        });
        util
          .get(`/api/followers/followingStats?userId=${res.user._id}`)
          .then((res) => {
            this.followingInfo = res;
          });
        util
          .get(`/api/followers/isFollowing?userId=${res.user._id}`)
          .then((res) => {
            if (res) {
              this.isFollowing = res.isFollowing;
            }
          });
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    followCallback() {
      if (this.isFollowing) {
        // unfollow
        util.del(`/api/followers/${this.user._id}`).then((res) => {
          if (res) {
            this.isFollowing = false;
            this.followingInfo.followers--;
          } else {
            this.$store.commit("alert", {
              message: "There was an error unfollowing this user.",
              status: "error",
            });
          }
        });
      } else {
        // follow
        util
          .post(`/api/followers/`, {
            body: JSON.stringify({ followee: this.user._id }),
          })
          .then((res) => {
            if (res) {
              this.isFollowing = true;
              this.followingInfo.followers++;
            } else {
              this.$store.commit("alert", {
                message: "There was an error following this user.",
                status: "error",
              });
            }
          });
      }
    },
  },
  data() {
    return {
      user: undefined,
      freets: undefined,
      followingInfo: undefined,
      isFollowing: undefined,
    };
  },
};
</script>
