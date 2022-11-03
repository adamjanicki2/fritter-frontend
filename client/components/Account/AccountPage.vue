<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h1 class="tc">Hi, @{{ $store.state.username }}!</h1>
      </header>
      <h2>Good Sport Score</h2>
      <p>
        Your good sport score determines how positive your contributions to the
        community are. The more above zero it is, the better you are!
      </p>
      <div
        v-if="goodSportScore"
        :class="`w-fc br2 f-subheadline fw5 ma2 pa2 bg-off-black ${
          goodSportScore >= 0 ? 'green' : 'dark-red'
        }`"
      >
        {{ Number.parseFloat(this.goodSportScore).toFixed(1) }}
      </div>
      <section v-if="followingInfo">
        <h2>Following Info</h2>
        <div class="flex flex-row items-center">
          <h3 class="mr3">Followers: {{ this.followingInfo.followers }}</h3>
          <h3 class="">Following: {{ this.followingInfo.following }}</h3>
        </div>
      </section>
    </section>
    <section>
      <header>
        <h2>Account settings</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from "@/components/Account/ChangeUsernameForm.vue";
import ChangePasswordForm from "@/components/Account/ChangePasswordForm.vue";
import DeleteAccountForm from "@/components/Account/DeleteAccountForm.vue";
import LogoutForm from "@/components/Account/LogoutForm.vue";
import util from "../../util.ts";

export default {
  name: "AccountPage",
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
  },
  data() {
    return {
      goodSportScore: 0,
      followingInfo: null,
    };
  },
  mounted() {
    util.get(`/api/goodSportScores`).then((res) => {
      this.goodSportScore = res?.score ?? 0;
    });
    util
      .get(`/api/followers/followingStats?userId=${this.$store.state.userId}`)
      .then((res) => {
        this.followingInfo = res ?? null;
      });
  },
};
</script>
