<template>
    <div>
      <img :src="imageSrc" :alt="imageAlt" class="responsive-image" />
    </div>
  </template>

<script setup>
import { ref } from 'vue';

// Reactive variables for image source and alt text
const imageSrc = ref('/pexels-photo-3656870.jpeg'); // Corrected path with proper quotes
const imageAlt = ref('Cattle image'); // Alt text for accessibility
</script>

<style scoped>

.responsive-image
{
    height: 700px;
    width:100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>