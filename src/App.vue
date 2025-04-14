<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <!-- Header content (if any) -->
  </header>

  <!-- Transition Wrapper -->
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style scoped>
/* Smooth Transition Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>