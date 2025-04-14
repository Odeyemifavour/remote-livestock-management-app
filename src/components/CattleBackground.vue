<template>
    <div>
      <img class="cattle-style" :src="cattleImageUrl" :alt="cattleImageAlttext" :width="cattleWidth" :height="cattleHeight">
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Reactive variables
  const cattleImageUrl = ref('/pexels-photo-3656870.jpeg'); 
  const cattleImageAlttext = ref('Cattle background image');
  const cattleWidth = ref(500);
  const cattleHeight = ref(600);
  </script>
  
  <style scoped>
  .cattle-style
  {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  </style>