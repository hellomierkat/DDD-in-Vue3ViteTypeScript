import { createApp } from 'vue'
import App from './App.vue'


// console.log(import.meta.env.VITE_PROXY_TARGET_URL)


// routers
import router from '@/routes/index'

router.beforeEach((to, from, next) => {

    // if (from.name == 'orderDetail' && to.name == 'home-orders')
    //     to.meta.keepAlive = true;
    // else
    //     to.meta.keepAlive = false;

    document.title = to.meta.title ? to.meta.title as string : 'IT 故障申报';

    next();
})

// vant4
import vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App);

// 文本内容超过一行多余部分变为...指令
app.directive('textOverflow', {
    mounted(el, binding) {
        el.style.overflow = 'hidden';
        el.style.display = '-webkit-box';
        el.style['word-break'] = 'break-all'; // english and number
        el.style['-webkit-line-clamp'] = binding.value <= 0 ? 1 : binding.value; // line count
        el.style['-webkit-box-orient'] = 'vertical';
    }
})

// 防抖指令
// to use: <button v-debounce="{ fn: handler-function, event: 'click', delay: 300}"> click</button>
app.directive("debounce", {
    mounted(el, binding) {
        if (typeof binding.value.fn !== "function" || !binding.value.event) return;
        let delay = 400; // default delay time
        el.timer = null;
        el.handler = function () {
            if (el.timer) {
                clearTimeout(el.timer);
            }
            el.timer = setTimeout(() => {
                binding.value.fn.apply(this, arguments);
            }, binding.value.delay || delay);
        };
        el.addEventListener(binding.value.event, el.handler);
    },
    // clear timer beforeUnmount
    beforeUnmount(el, binding) {
        if (el.timer) {
            el.timer = null;
            clearTimeout(el.timer);
        }
        el.removeEventListener(binding.value.event, el.handler);
    },
});

app.use(router);
app.use(vant);

app.mount('#app')
