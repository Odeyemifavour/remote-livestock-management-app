<template>
  <div class="alert-page">
    <h2>System Alerts</h2>
    <ul>
      <li v-for="alert in alerts" :key="alert.animalId" class="alert-item">
        <div>
          <strong>Animal ID:</strong> {{ alert.animalId }} — {{ alert.message }}
        </div>
        <router-link :to="`/dashboard/prediction-log/${alert.animalId}`" class="view-prediction">
          View Prediction Log
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alerts: [
        { animalId: '101', message: 'High body temperature detected!' },
        { animalId: '102', message: 'Low walking capacity detected!' },
        { animalId: '103', message: 'Abnormal faecal consistency detected!' }
      ]
    }
  }
}
</script>

<style>
.alert-page {
  max-width: 700px;
  margin: 1.5rem auto;
  font-family: Arial, sans-serif;
  background-color: #fff9f0;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #d9c9b1;
  color: #5a3d1b;
}
.alert-item {
  margin-bottom: 1rem;
  padding: 10px;
  border-bottom: 1px solid #d9c9b1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.view-prediction {
  color: #7a5a29;
  text-decoration: underline;
  cursor: pointer;
}
</style>
