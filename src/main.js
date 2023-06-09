import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from 'vue'

const app = createApp(App);
app.use(router).mount('#app');
app.config.globalProperties.$loggedUser = "";
//auth
app.config.globalProperties.$registerEndpoint = "http://localhost:8000/api/register";
app.config.globalProperties.$sendVerificationEmailEndpoint = "http://localhost:8000/api/sendVerificationEmail";
app.config.globalProperties.$verifyEmailEndpoint = "http://localhost:8000/api/verifyEmail";
app.config.globalProperties.$loginEndpoint = "http://localhost:8000/api/login";
app.config.globalProperties.$logoutEndpoint = "http://localhost:8000/api/logout";
app.config.globalProperties.$userDetailsEndpoint = "http://localhost:8000/api/auth/user";
app.config.globalProperties.$resetPasswordEndpoint = "http://localhost:8000/api/resetPassword";
app.config.globalProperties.$sendPasswordResetEmailEndpoint = "http://localhost:8000/api/sendPasswordResetMail";
//user
app.config.globalProperties.$checkUserEndpoint = "http://localhost:8000/api/user";