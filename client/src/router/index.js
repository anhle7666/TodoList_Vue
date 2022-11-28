import { createWebHistory, createRouter } from "vue-router";
import TodoList from "@/views/TodoList.vue";
const routes = [
    {
        path: "/",
        name: "todolist",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/:idAccount/todoedit/:id",
        name: "todo.edit",
        component: (idAccount) => import("@/views/TodoEdit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/:idAccount/add",
        name: "todo.add",
        component: (idAccount) => import("@/views/TodoAdd.vue"),
        props: true,
    },

    {
        path: "/signin",
        name: "signin",
        component: () => import("@/views/SignIn.vue"),
    },

    {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/SignUp.vue"),
    },

    {
        path: "/home/:idAccount",
        name: "home",
        component: (idAccount, status) => TodoList,
        props: true,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
