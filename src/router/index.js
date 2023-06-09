import { createRouter, createWebHistory } from 'vue-router'
import VerifyEmailView from '../views/VerifyEmailView'
import SignUpView from '../views/SignUpView'
import LoginView from '../views/LoginView'
import LogoutView from '../views/LogoutView'
import VerificatedView from '../views/VerificatedView'
import SendVerificationEmailView from "../views/SendVerificationEmailView"
import ResetPasswordView from "../views/ResetPasswordView"
import SendResetPasswordEmailView from "../views/SendResetPasswordEmailView"
import UserAdminView from "../views/UserAdminView";
import UserDetailsView from "../views/UserDetailsView";
import AddCarModelView from "../views/AddCarModelView";
import AddCarVersionView from "../views/AddCarVersionView";
import AddCarConfigurationView from "../views/AddCarConfigurationView";
import OrderTableView from "../views/OrderTableView";
import OrderCardView from "../views/OrderCardView";
import OrderDetailsView from "../views/OrderDetailsView";
import CarModelsView from "../views/CarModelsView";
import VersionDetailView from "../views/VersionDetailsView";

const routes = [
  {
    path: '/verifyEmail/:email',
    name: 'verifyEmail',
    component: VerifyEmailView
  },
  {
    path: '/register',
    name: 'register',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/verificated',
    name: 'verificated',
    component: VerificatedView
  },
  {
    path: '/sendVerificationEmail',
    name: 'sendVerificationEmail',
    component: SendVerificationEmailView
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPasswordView
  },
  {
    path: '/sendPasswordResetEmail',
    name: 'sendPasswordResetEmail',
    component: SendResetPasswordEmailView
  },
  {
    path: '/userAdmin/',
    name: 'userAdmin',
    component: UserAdminView
  },
  {
    path: '/userDetails/:userId',
    name: 'userDetails',
    component: UserDetailsView,
    props: true
  },
  {
    path: '/addCarModel',
    name: 'addCarModel',
    component: AddCarModelView
  },
  {
    path: '/addCarVersion',
    name: 'addCarVersion',
    component: AddCarVersionView
  },
  {
    path: '/addCarConfiguration',
    name: 'addCarConfiguration',
    component: AddCarConfigurationView
  },
  {
    path: '/orderTable',
    name: 'orderTable',
    component: OrderTableView
  },
  {
    path: '/orderCard',
    name: 'orderCard',
    component: OrderCardView
  },
  {
    path: '/orderDetails/:orderId',
    name: 'orderDetails',
    component: OrderDetailsView
  },
  {
    path: '/carModels',
    name: 'carModels',
    component: CarModelsView
  },
  {
    path: '/versionDetails/:modelId',
    name: 'versionDetails',
    component: VersionDetailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
