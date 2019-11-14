import Vue from 'vue';
import App from './App.vue';
import router from "./routes";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ImageUploader from 'vue-image-upload-resize';
import Moment from 'moment';

Vue.use(ImageUploader);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.filter('formatDate', function(value) {
  if (value) {
    return Moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
