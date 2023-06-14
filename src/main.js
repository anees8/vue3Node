import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import  { BootstrapVueNext,BToastPlugin }  from "bootstrap-vue-next";
import router from "./router/index.js";


import axios from "axios";
import Swal from 'sweetalert2';
window.Swal=Swal;

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faAt,faEyeSlash,faRightToBracket,faUser,faPhone,faChevronLeft,faGauge,faChevronDown,faUsers,faTrashCan,faPen,faSort,faSortUp,faSortDown,faMagnifyingGlass,faFileExport,faCartShopping,faUserPen,faXmarkCircle,faPlus} from '@fortawesome/free-solid-svg-icons';


library.add(faAt,faEyeSlash,faRightToBracket,faUser,faPhone,faChevronLeft,faGauge,faChevronDown,faUsers,faTrashCan,faPen,faSort,faSortUp,faSortDown,faMagnifyingGlass,faFileExport,faCartShopping,faUserPen,faXmarkCircle,faPlus);

axios.defaults.baseURL = "http://192.168.5.17:3000/";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Content-Type"]="application/x-www-form-urlencoded";
axios.defaults.headers.common["Authorization"]="Bearer "+ localStorage.getItem("token");

axios.interceptors.response.use((response) => {

return response;
}, (error) => {
if (error.response && error.response.data) {

if (error.response.status === 403) {
router.push({ name: 'Logout' });
}
return Promise.reject(error);
}
return Promise.reject(error);
});

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(BootstrapVueNext);


app.mount('#app');
