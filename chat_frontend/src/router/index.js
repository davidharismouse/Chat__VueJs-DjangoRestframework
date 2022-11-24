import Vue from "vue"
import VueRouter from "vue-router";
import Login from "../components/LoginPage.vue";
import DashBoard from "../components/DashboardPage.vue";
import InputPassword from "@/components/InputPassword.vue";

Vue.use(VueRouter);

const routes =[
    {
        path: "/",
        name: "chat",
        component: InputPassword,
        children: [
            {
                path:''
            }
        ]
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,

    },
    {
        path:'/test',
        name:'test',
        component: DashBoard
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, _, next) => {
    console.log('to=?', to);
    console.log('-=?', _);
    console.log(next);
    const trueLogin = localStorage.getItem('chat_Token');
    console.log("dkdkdk=?", trueLogin);
    console.log("username=>", localStorage.getItem('chat_username'))
    if(!trueLogin && to.name !== "Login"){
        console.log("ddd=",trueLogin,"ssss=>", to);
        return next({ name: "Login"});
    }
    console.log(next());
    return next();
})

export default router;