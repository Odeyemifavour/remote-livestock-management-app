<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="/cow-logo-design-inspiration-bull-and-buffalo-cow-animal-logo-design-free-vector.jpg" alt="Cattle.360 Logo" class="logo" />
      <h3>Remote Livestock Health Manager</h3>
    </div>
    <ul class="sidebar-menu">
      <li>
        <router-link to="/dashboard" active-class="active" exact>
          <font-awesome-icon icon="gauge" /> Overview/Home
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/herd-dashboard" active-class="active">
          <font-awesome-icon icon="cow" /> Herd Dashboard
        </router-link>
      </li>
      <li>
        <!-- Modified to go to ALL cattle info page with NO ID -->
        <router-link to="/dashboard/cattle" active-class="active">
          <font-awesome-icon icon="cow" /> Cattle Information
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/system-alert" active-class="active">
          <font-awesome-icon icon="bell" /> Alerts & Notifications
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/prediction-log" active-class="active">
          <font-awesome-icon icon="chart-line" /> Predictions Log
        </router-link>
      </li>
      
      <li>
        <router-link to="/dashboard/reports" active-class="active">
          <font-awesome-icon icon="file-pdf" /> Reports
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/settings-and-help" active-class="active">
          <font-awesome-icon icon="gear" /> Settings/Help
        </router-link>
      </li>
      <li>
        <a href="/" class="logout-link">
          <font-awesome-icon icon="sign-out" /> Logout
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const farmName = 'My Awesome Farm'
</script>

<style scoped>
/* Your existing CSS here, unchanged */
.sidebar {
  width: 250px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar-header .logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.sidebar-header h3 {
  margin: 0;
  font-weight: bold;
  text-align: center;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar-menu li {
  margin-bottom: 5px;
}

.sidebar-menu li a,
.sidebar-menu li .logout-link {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #ddd;
  transition: background-color 0.3s ease;
  border-radius: 6px;
}

.sidebar-menu li a:hover,
.sidebar-menu li a.active,
.sidebar-menu li .logout-link:hover {
  background-color: #481f01; /* Using the login page's primary color */
  color: #fff;
}

.sidebar-menu li a i,
.sidebar-menu li .logout-link i {
  margin-right: 10px;
}

.logout-link {
  cursor: pointer;
}

/* Responsive Layout */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .sidebar-header {
    width: 100%;
    margin-bottom: 10px;
  }
  .sidebar-menu {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  .sidebar-menu li {
    margin-bottom: 0;
  }
  .sidebar-menu li a,
  .sidebar-menu li .logout-link {
    padding: 8px 10px;
    font-size: 0.9em;
  }
}
</style>
