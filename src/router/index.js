import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Login",
        component: ()=>import('../components/Login.vue'),
        meta: {
            requireAuth: false,    
          
        },
        
    }, {
        path: "/register",
        name: "Register",
        component: ()=>import('../components/Register.vue'),
        meta: {
            requireAuth: false,    
          
        },
        
    },{
        path: "/dashboard",
        name: "Dashboard",
        component: ()=>import('../components/Dashboard.vue'),
        meta: {
            requireAuth: true,    
          
        },
        
        
    }, {
        path: "/users",
        name: "Users",
        component: ()=>import('../components/Users.vue'),
        meta: {
            requireAuth: true,    
          
        },
        
        
    },{
        path: "/unautharize",
        name: "NotAuthorize",
        component: ()=>import('../components/NotAuthorize.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: ()=>import('../components/NotFound.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: "/logout",
        name: "Logout",
        component: ()=>import('../components/Logout.vue'),
        meta: {
            requireAuth: true,
        },
    },

];

const router = createRouter({
scrollBehavior(to, from, savedPosition) {
// always scroll to top
return { top: 0 };
},
history: createWebHistory(),
routes: routes
});


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requireAuth && token === null) {   
        next({ name: "Login" });
    } else if ((to.name === "Login" ||to.name === "Register") && !to.meta.requireAuth && token !== null) {       
        next({ name: "Dashboard" });
    } else {
        next();
    }

  });




export default router;