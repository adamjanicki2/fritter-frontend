<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Already joined Fritter?</h2>
      </header>
      <LoginForm />
      <h3 class="tc">
        New to Fritter?
        <router-link to="/create">Create your account</router-link>.
      </h3>
    </section>
  </main>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>
