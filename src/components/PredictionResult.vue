<template>
  <div class="prediction-result">
    <h3>🩺 Monitoring Results</h3>
    <p><strong>Animal ID:</strong> {{ data.animalId }}</p>
    <p><strong>Health Status:</strong> {{ data.healthStatus }}</p>
    <p><strong>Confidence:</strong> {{ data.confidence }}%</p>
    <p><strong>Risk Level:</strong> {{ data.riskLevel }}</p>

    <h4>Specific Disease Detected:</h4>
    <ul>
      <li v-for="disease in data.diseases" :key="disease">{{ disease }}</li>
    </ul>

    <h4>Alerts:</h4>
    <ul>
      <li v-for="alert in data.alerts" :key="alert">{{ alert }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.prediction-result {
  background-color: #fff;
  border: 1px solid #d9c9b1;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
