<template>
  <main>
    <section>
      <header>
        <h2>New to Fritter?</h2>
      </header>
      <RegisterForm />
      <h3 class="tc">
        Already joined Fritter?
        <router-link to="/login">Sign in</router-link>.
      </h3>
    </section>
  </main>
</template>

<script>
import RegisterForm from "@/components/Login/RegisterForm.vue";

export default {
  name: "CreateAccount",
  components: {
    RegisterForm,
  },
};
</script>
