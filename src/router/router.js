import {createRouter, createWebHistory} from 'vue-router'
import InputForm from "./InputForm.vue";
import BodyPage from "../components/BodyPage";
const routes = [
    {
        path: '/add',
        component: InputForm
    },
    {
        path: '/',
        component: BodyPage
    }
]
const router = createRouter({
        history: createWebHistory(),
        routes
    }
)

export default router;