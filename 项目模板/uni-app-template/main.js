import Vue from 'vue'
import App from './App'
import store from './store'
import { Ajax } from "./utils"

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$ajax = Ajax

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()



