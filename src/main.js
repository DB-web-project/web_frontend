import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";


Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
Vue.component("mavon-editor", mavonEditor);
Vue.http.headers['Cache-Control'] = 'no-cache';
