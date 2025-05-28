<template>
    <div class="dashboard-root">
      <SideBar/>
      <div class="main-content">
        <TopNavbar />
        <div class="content-area">
          <router-view />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import SideBar from '@/components/dashboard/SideBar.vue';
  import TopNavbar from '@/components/dashboard/TopNavbar.vue';
  </script>
  
  <style scoped>
  .dashboard-root {
    display: flex;
    font-family: sans-serif;
    background-color: #f4f4f4;
    min-height: 100vh;
  }
  
  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .content-area {
    padding: 20px;
    flex-grow: 1;
  }
  
  /* Responsive Layout */
  @media (max-width: 768px) {
    .dashboard-root {
      flex-direction: column;
    }
  }
  </style>