import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { storage } from "@/assets/helper/storage"

let currentUser = JSON.parse(localStorage.getItem("currentUser") as string)

let routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/testLogin.vue'),
        meta: {
            title: "测试登陆",
            keepAlive: false,
            tabbar: false
        }
    },
    {
        path: '/accountEntLogin',
        name: 'accountEntLogin',
        component: () => import('@/views/login/accountEntLogin.vue'),
        meta: {
            title: "用户登陆",
            keepAlive: false,
            tabbar: false
        }
    },
    {
        path: '/orderCreate',
        name: 'orderCreate',
        component: () => import('@/views/order/orderCreate.vue'),
        meta: {
            title: "故障申报",
            keepAlive: false,
            tabbar: true,
            icon: 'warn-o'
        }
    },
    // {
    //     path: '/home-handling',
    //     name: 'home-handling',
    //     component: () => import('@/views/home/home-handling.vue'),
    //     meta: {
    //         title: "当前工单",
    //         keepAlive: false,
    //         tabbar : true,
    //         icon: 'todo-list-o'
    //     }
    // },
    {
        path: '/home-orders',
        name: 'home-orders',
        component: () => import('@/views/home/home-orders.vue'),
        meta: {
            title: currentUser && currentUser.role == 'user' ? "我的申报" : "我的故障单",
            keepAlive: false,
            tabbar : true,
            icon: 'todo-list-o'
        }
    },
    // {
    //     path: '/home-finish',
    //     name: 'home-finish',
    //     component: () => import('@/views/home/home-finish.vue'),
    //     meta: {
    //         title: "历史工单",
    //         keepAlive: false,
    //         tabbar : true,
    //         icon: 'column'
    //     }
    // },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/order/orderDetail.vue'),
        meta: {
            title: "故障详情",
            keepAlive: false,
            tabbar: false
        }
    },
    {
        path: '/orderSuccess',
        name: 'orderSuccess',
        component: () => import('@/views/order/orderSuccess.vue'),
        meta: {
            title: "报障系统",
            keepAlive: false,
            tabbar: false
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
            title: "404",
            keepAlive: false,
            tabbar: false
        }
    },
    {
        // vue3 use this to redirect page
        path: '/:pathMatch(.*)', 
        redirect: '/home-orders'
    }
    
]

// 开启历史模式
let base = import.meta.env.BASE_URL;

const router = createRouter({
    history: createWebHistory(base),
    routes
})

export default router;