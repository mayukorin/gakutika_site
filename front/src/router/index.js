import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Home1 from "../views/Home1.vue";
import SignUp from "@/components/templates/SignUpView";
import SignIn from "@/components/templates/SignInView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ho",
    name: "Ho1",
    component: Home1,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
