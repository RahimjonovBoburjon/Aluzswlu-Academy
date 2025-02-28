import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from '../views/404.vue';
import { getUserState } from "../firebase/authGuard";

const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login, meta: { requiresGuest: true } },
    { path: "/signup", component: SignUp, meta: { requiresGuest: true } },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const user = await getUserState();

    if (to.meta.requiresAuth && !user) {
        next("/login");
    } else if (to.meta.requiresGuest && user) {
        next("/dashboard");
    } else {
        next();
    }
});

export default router;
