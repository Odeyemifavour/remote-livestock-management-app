<template>
  <div>
    <p><strong>Animal ID:</strong> {{ animal.animalId }}</p>
    <p><strong>Breed:</strong> {{ animal.breed }}</p>
    <p><strong>Body Temperature:</strong> {{ animal.bodyTemperature }} °C</p>
    <p><strong>Respiratory Rate:</strong> {{ animal.respiratoryRate }} bpm</p>
    <p><strong>Milk Production:</strong> {{ animal.milkProduction }} L</p>
    <p><strong>Walking Capacity:</strong> {{ animal.walkingCapacity }}</p>
    <p><strong>Sleeping Duration:</strong> {{ animal.sleepingDuration }}</p>
    <p><strong>Body Condition Score:</strong> {{ animal.bodyConditionScore }}</p>
    <p><strong>Heart Rate:</strong> {{ animal.heartRate }} bpm</p>
    <p><strong>Eating Duration:</strong> {{ animal.eatingDuration }}</p>
    <p><strong>Lying Down Duration:</strong> {{ animal.lyingDownDuration }}</p>
    <p><strong>Ruminating:</strong> {{ animal.ruminating }}</p>
    <p><strong>Rumen Fill:</strong> {{ animal.rumenFill }}</p>
    <p><strong>Faecal Consistency:</strong> {{ animal.faecalConsistency }}</p>
  </div>
</template>

<script setup>
defineProps({
  animal: Object
})
</script>

<style scoped>
p {
  margin: 5px 0;
}
</style>
