import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import store from "./store";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const vm = new Vue({
	el: "#app",
	render: (h) => h(App),
	store,
});
