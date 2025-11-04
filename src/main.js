import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'

import './style.css';
import App from './App.vue';

// ⚠️ import après build de Pinia
import { bindTokenGetter } from './services/http';
import { useAuthStore } from './stores/auth.store';
import  router from '@/router'

const app = createApp(App);
const pinia = createPinia();
pinia.use(createPersistedState()) // <— important
app.use(pinia);

// Lie le getter de token à l’http axios
const auth = useAuthStore(pinia);
bindTokenGetter(() => auth.token);
app.use(router)
app.mount('#app');

