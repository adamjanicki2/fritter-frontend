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
      <p>
        Good Sport Score:
        <mark class="b">{{ $store.state.goodSportScore }}</mark>
      </p>
      <h2>Following Info: {{ JSON.stringify($store.state.followingInfo) }}</h2>
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

export default {
  name: "AccountPage",
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
  },
};
</script>
