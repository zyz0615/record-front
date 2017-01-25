import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import './assets/style.css'
import './assets/transition.css'
import App from './App.vue'
import vueResource from 'vue-resource'
import vueRouter from 'vue-router'
import routerConfig from './router.js'
import moment from 'moment'

Vue.use(MintUI)
Vue.use(vueResource)
Vue.use(vueRouter)

Vue.filter('localTime', (value) => {
    if (!value || !moment(value)) {
        return 'Unknown time'
    }
    return moment(value).format('YYYY-MM-DD HH:mm')
})

const router = new vueRouter({ routes: routerConfig, mode: 'hash' })
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})