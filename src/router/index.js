import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'

import OverviewPage from '@/components/dashboard/OverviewPage.vue'
import HerdDashboardPage from '@/components/dashboard/HerdDashboardPage.vue'
import AlertPage from '@/components/dashboard/AlertPage.vue'
import PredictionLogPage from '@/components/dashboard/PredictionLogPage.vue'
import CattleInformationPage from '@/components/dashboard/CattleInformationPage.vue'
import ReportPage from '@/components/dashboard/ReportPage.vue'
import SettingsAndHelpPage from '@/components/dashboard/SettingsAndHelpPage.vue'

const routes = [
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/', redirect: '/login' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    children: [
      { path: '', name: 'Overview', component: OverviewPage },
      { path: 'herd-dashboard', name: 'HerdDashboard', component: HerdDashboardPage },
      { path: 'system-alert', name: 'Alerts', component: AlertPage },

      // All prediction logs (no animalId)
      {
        path: 'prediction-log',
        name: 'PredictionLogAll',
        component: PredictionLogPage
      },

      // Prediction log for specific animal
      {
        path: 'prediction-log/:animalId',
        name: 'PredictionLog',
        component: PredictionLogPage,
        props: true
      },

      // Cattle information for all or one (optional param)
      {
        path: 'cattle/:id?',
        name: 'CattleInformation',
        component: CattleInformationPage,
        props: true
      },

      { path: 'reports', name: 'Reports', component: ReportPage },
      { path: 'settings-and-help', name: 'SettingsAndHelp', component: SettingsAndHelpPage }
    ]
  },

  // Fallback for undefined routes
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
