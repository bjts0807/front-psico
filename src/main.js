import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";


import store from "./store";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.mount("#app");
appInstance.use(Loading);
//appInstance.mixin(momentjsMixin);

appInstance.mixin({
    methods: {
        LoaderSpinnerShow: function() {
            this.$options.loader = this.$loading.show({ color: '#0055ff', container: null });
        },
        LoaderSpinnerHide: function() {

            this.$options.loader.hide();
        }
    }
});