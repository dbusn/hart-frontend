import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Button from "primevue/button";

import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import TabMenu from "primevue/tabmenu";
import {router} from "@/router/router";

const app = createApp(App)

app.use(PrimeVue, {ripple: true});
app.use(router);

app.component('Button', Button);
app.component('TabMenu', TabMenu);

app.mount('#app')
