import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

const app = createApp(App)

app.use(store).use(router).mount('#app')
