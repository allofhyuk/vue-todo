import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// global component
import Toast from "@/components/Module/Toast.vue"
import Alert from "@/components/Module/Alert.vue"
import EmptyBox from "@/components/Module/EmptyBox.vue"
import Modal from "@/components/Module/Modal.vue";

const app = createApp(App)

app.component('Toast', Toast);
app.component('Alert', Alert);
app.component('EmptyBox', EmptyBox);
app.component('Modal', Modal);

app.use(router);
app.use(store);

app.mount('#app')
// custom directive: v-focus
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
})
