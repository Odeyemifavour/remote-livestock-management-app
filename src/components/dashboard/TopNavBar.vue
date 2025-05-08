<template>
    <header class="top-navbar">
      <div class="logo-name">
        <img src="/cow-logo-design-inspiration-bull-and-buffalo-cow-animal-logo-design-free-vector.jpg" alt="Cattle.360 Logo" class="logo">
        <h1>Remote Livestock Health Manager</h1>
      </div>
      <div class="farm-info">
        <font-awesome-icon icon="cow" /> <span>{{ farmName }}</span>
      </div>
      <div class="user-info">
        <font-awesome-icon icon="user-circle" />
        <span>Welcome, User</span>
        </div>
      <div class="date-time">
        <span>{{ currentTime }}</span>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const farmName = ref('My Awesome Farm'); // Replace with dynamic data if needed
  const currentTime = ref('');
  
  const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  };
  
  onMounted(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Update every second
  
    // Clean up the interval when the component is unmounted
    onUnmounted(() => clearInterval(intervalId));
  });
  </script>
  
  <style scoped>
  .top-navbar {
    background-color: #fff;
    color: #333;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }
  
  .logo-name {
    display: flex;
    align-items: center;
  }
  
  .logo-name .logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .logo-name h1 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .farm-info,
  .user-info,
  .date-time {
    display: flex;
    align-items: center;
  }
  
  .farm-info i,
  .user-info i {
    margin-right: 5px;
  }
  
  .user-info {
    margin-left: 20px;
  }
  
  .date-time {
    margin-left: 20px;
    font-size: 0.9em;
    color: #555;
  }
  
  /* Responsive Layout */
  @media (max-width: 768px) {
    .top-navbar {
      flex-direction: column;
      align-items: flex-start;
    }
    .logo-name {
      margin-bottom: 10px;
    }
    .farm-info,
    .user-info,
    .date-time {
      margin: 5px 0;
    }
  }
  </style>