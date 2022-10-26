import Vue from "vue";
import VueRouter from "vue-router";
import FreetsPage from "./components/Freet/FreetsPage.vue";
import ExplorePage from "./components/Freet/ExplorePage.vue";
import AccountPage from "./components/Account/AccountPage.vue";
import MemoryPage from "./components/Freet/MemoryPage.vue";
import LoginPage from "./components/Login/LoginPage.vue";
import NotFound from "./NotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: FreetsPage },
  { path: "/account", name: "Account", component: AccountPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/explore", name: "Explore", component: ExplorePage },
  { path: "/memories", name: "Memories", component: MemoryPage },
  { path: "*", name: "Not Found", component: NotFound },
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (
      to.name !== "Login" &&
      to.name !== "Home" &&
      !router.app.$store.state.username
    ) {
      return next({ name: "Login" });
    }
    if (to.name === "Login" && router.app.$store.state.username) {
      return next({ name: "Account" });
    }
  }

  next();
});

export default router;
