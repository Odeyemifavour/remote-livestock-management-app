<template>
  <div class="prediction-log">
    <h2 v-if="animalId">Prediction Log for Animal ID: {{ animalId }}</h2>
    <h2 v-else>Prediction Log for All Animals</h2>

    <div v-if="animalId">
      <PredictionResult :data="getPredictionByAnimalId(animalId)" />
    </div>
    <div v-else>
      <PredictionResult
        v-for="prediction in allPredictions"
        :key="prediction.animalId"
        :data="prediction"
      />
    </div>

    <router-link v-if="animalId" to="/dashboard/system-alert" class="back-link">
      ← Back to Alerts
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PredictionResult from '../PredictionResult.vue'

const route = useRoute()
const animalId = route.params.animalId

const allPredictions = [
  {
    animalId: '101',
    healthStatus: 'Unhealthy',
    confidence: 85.0,
    riskLevel: 'High',
    diseases: ['Respiratory Disease', 'Gastrointestinal Disease', 'Lameness'],
    alerts: ['High body temperature', 'Black faeces', 'High respiratory rate']
  },
  {
    animalId: '102',
    healthStatus: 'Unhealthy',
    confidence: 78.0,
    riskLevel: 'Medium',
    diseases: ['Metabolic Disorder'],
    alerts: ['Low energy', 'Dehydration symptoms']
  }
]

const getPredictionByAnimalId = (id) => {
  return allPredictions.find(p => p.animalId === id)
}
</script>

<style scoped>
.prediction-log {
  max-width: 700px;
  margin: 1.5rem auto;
  font-family: Arial, sans-serif;
  background-color: #fef8f0;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #d8cfc1;
  color: #3b2f2f;
}
.back-link {
  display: inline-block;
  margin-top: 15px;
  color: #7a5a29;
  text-decoration: underline;
  cursor: pointer;
}
</style>
