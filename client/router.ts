import Vue from "vue";
import VueRouter from "vue-router";
import FreetsPage from "./components/Freet/FreetsPage.vue";
import HomePage from "./components/Home/HomePage.vue";
import ExplorePage from "./components/Freet/ExplorePage.vue";
import AccountPage from "./components/Account/AccountPage.vue";
import MemoryPage from "./components/Freet/MemoryPage.vue";
import LoginPage from "./components/Login/LoginPage.vue";
import CreateAccount from "./components/Login/CreateAccount.vue";
import SingleFreetPage from "./components/Freet/SingleFreetPage.vue";
import ProfilePage from "./components/Account/ProfilePage.vue";
import NotFound from "./NotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/feed", name: "Feed", component: FreetsPage },
  { path: "/account", name: "Account", component: AccountPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/create", name: "Create", component: CreateAccount },
  { path: "/explore", name: "Explore", component: ExplorePage },
  { path: "/memories", name: "Memories", component: MemoryPage },
  { path: "/freet", name: "SingleFreet", component: SingleFreetPage },
  { path: "/user", name: "Profile", component: ProfilePage },
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
      to.name !== "Create" &&
      to.name !== "Home" &&
      !router.app.$store.state.username
    ) {
      return next({ name: "Login" });
    }
    if (
      (to.name === "Login" || to.name === "Create") &&
      router.app.$store.state.username
    ) {
      return next({ name: "Account" });
    }
  }

  next();
});

export default router;
