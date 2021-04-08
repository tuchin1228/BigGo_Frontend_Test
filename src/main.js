import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import VueLazyload from 'vue-lazyload';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ErrorImage from '@/assets/img/error.png';
import LoadingImage from '@/assets/img/loading.png';
import store from './store';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
// Vue.use(VueLazyload);
library.add(faTimesCircle, faSearch);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: ErrorImage,
  loading: LoadingImage,
  attempt: 1,
  listenEvents: ['scroll'],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
