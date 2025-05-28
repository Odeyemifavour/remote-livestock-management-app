<template>
  <div class="cattle-info-container">
    <button class="back-button" @click="goBack" aria-label="Back to Herd Dashboard">
      ← Back to Herd Dashboard
    </button>

    <h2 v-if="id">Cattle Information - Animal ID: {{ id }}</h2>
    <h2 v-else>All Cattle Information</h2>

    <!-- Single animal view -->
    <div v-if="id">
      <div v-if="animal">
        <AnimalDetail :animal="animal" />
      </div>
      <p v-else>No data available for this animal.</p>
    </div>

    <!-- All cattle list view -->
    <div v-else>
      <div v-for="a in livestockData" :key="a.animalId" class="animal-summary">
        <AnimalDetail :animal="a" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AnimalDetail from '@/components/AnimalDetail.vue'

const route = useRoute()
const router = useRouter()

const id = route.params.id

const livestockData = [
  {
    animalId: '101',
    breed: 'Holstein',
    bodyTemperature: 38.5,
    respiratoryRate: 25,
    milkProduction: 25,
    walkingCapacity: 'Good',
    sleepingDuration: '8 hours',
    bodyConditionScore: 3.5,
    heartRate: 70,
    eatingDuration: '4 hours',
    lyingDownDuration: '10 hours',
    ruminating: 'Yes',
    rumenFill: 'Normal',
    faecalConsistency: 'Normal',
  },
  {
    animalId: '102',
    breed: 'Jersey',
    bodyTemperature: 39.8,
    respiratoryRate: 35,
    milkProduction: 18,
    walkingCapacity: 'Poor',
    sleepingDuration: '6 hours',
    bodyConditionScore: 2.5,
    heartRate: 90,
    eatingDuration: '3 hours',
    lyingDownDuration: '12 hours',
    ruminating: 'No',
    rumenFill: 'Low',
    faecalConsistency: 'Loose',
  },
  // Add more animals here
]

const animal = computed(() => livestockData.find(a => a.animalId === id))

function goBack() {
  router.push('/dashboard/herd-dashboard')
}
</script>

<style scoped>
.cattle-info-container {
  padding: 20px;
}

.back-button {
  background-color: transparent;
  border: none;
  color: #481f01; /* Your primary color */
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.back-button:hover {
  text-decoration: underline;
}

.animal-summary {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>
