import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router/router.js';

const app = createApp(App);
app.use(router);
app.use(Antd).mount('#app');
