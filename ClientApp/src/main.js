import 'bootstrap/dist/css/bootstrap.css'
//import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vue from 'vue'
import moment from 'moment'

Vue.use(require('vue-moment'));
Vue.filter("formatNumber", function (value) {
    return new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 2 }).format(value);
});
Vue.filter("formatHour", function (value) {
    var hour = Math.floor(value);
    var minute = ("0" + Math.floor((value - hour) * 60).toString(10)).substr(-2);
    return `${hour}:${minute}`;
});
Vue.filter("formatDate", function (value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});
//createApp(App).use(router).mount('#app')
new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
