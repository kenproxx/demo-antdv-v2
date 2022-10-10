import {createRouter, createWebHistory} from 'vue-router'
import InputForm from "./InputForm.vue";

const routes = [
    {
        path: '/add',
        component: InputForm
    }
]
const router = createRouter({
        history: createWebHistory(),
        routes
    }
)

export default router;