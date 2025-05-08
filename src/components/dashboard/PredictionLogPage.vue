<template>
    <div class="predictions-log-container">
      <h2>Predictions Log</h2>
      <div class="controls">
        <div class="filter">
          <label for="animal-filter">Filter by Animal ID:</label>
          <input type="text" id="animal-filter" v-model="animalIdFilter" placeholder="Enter Animal ID">
        </div>
        <div class="filter">
          <label for="outcome-filter">Filter by Outcome:</label>
          <select id="outcome-filter" v-model="predictionOutcomeFilter">
            <option value="">All</option>
            <option value="Healthy">Healthy</option>
            <option value="Unhealthy">Unhealthy</option>
          </select>
        </div>
        <div class="filter">
          <label for="date-range-start">Start Date:</label>
          <input type="date" id="date-range-start" v-model="startDateFilter">
        </div>
        <div class="filter">
          <label for="date-range-end">End Date:</label>
          <input type="date" id="date-range-end" v-model="endDateFilter">
        </div>
      </div>
  
      <div class="predictions-table">
        <table v-if="filteredPredictions.length > 0">
          <thead>
            <tr>
              <th>Date/Time of Prediction</th>
              <th>Animal ID</th>
              <th>Prediction Outcome</th>
              <th>Confidence Score</th>
              <th>Input Data Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prediction in filteredPredictions" :key="prediction.id">
              <td>{{ prediction.dateTime }}</td>
              <td>{{ prediction.animalId }}</td>
              <td :class="{ 'healthy': prediction.outcome === 'Healthy', 'unhealthy': prediction.outcome === 'Unhealthy' }">
                {{ prediction.outcome }}
              </td>
              <td>{{ prediction.confidenceScore !== null ? prediction.confidenceScore + '%' : 'N/A' }}</td>
              <td>
                <button @click="showInputDialog(prediction.inputData)">View Data</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No prediction logs available or matching your criteria.</p>
      </div>
  
      <div v-if="showInputDataDialog" class="modal-overlay">
        <div class="modal">
          <span class="close-icon" @click="closeInputDialog">×</span>
          <h3>Input Data Summary</h3>
          <pre>{{ JSON.stringify(selectedInputData, null, 2) }}</pre>
          <button @click="closeInputDialog">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Dummy Predictions Data - Replace with API call
  const predictionsData = ref([
    { id: 1, dateTime: '2025-05-08 09:30', animalId: 102, outcome: 'Unhealthy', confidenceScore: 92, inputData: { feverIndex: 4.5, respiratoryRate: 35 /* ... other features */ } },
    { id: 2, dateTime: '2025-05-08 10:00', animalId: 101, outcome: 'Healthy', confidenceScore: 88, inputData: { feverIndex: 2.1, respiratoryRate: 25 /* ... other features */ } },
    // Add more prediction logs
  ]);
  
  const animalIdFilter = ref('');
  const predictionOutcomeFilter = ref('');
  const startDateFilter = ref('');
  const endDateFilter = ref('');
  
  const filteredPredictions = computed(() => {
    return predictionsData.value.filter(prediction => {
      const animalMatch = !animalIdFilter.value || prediction.animalId.toString().includes(animalIdFilter.value);
      const outcomeMatch = !predictionOutcomeFilter.value || prediction.outcome === predictionOutcomeFilter.value;
  
      const predictionDate = new Date(prediction.dateTime).toISOString().split('T')[0];
      const startDate = startDateFilter.value || '0000-00-00';
      const endDate = endDateFilter.value || '9999-99-99';
      const dateMatch = predictionDate >= startDate && predictionDate <= endDate;
  
      return animalMatch && outcomeMatch && dateMatch;
    });
  });
  
  const showInputDataDialog = ref(false);
  const selectedInputData = ref(null);
  
  const showInputDialog = (data) => {
    selectedInputData.value = data;
    showInputDataDialog.value = true;
  };
  
  const closeInputDialog = () => {
    showInputDataDialog.value = false;
    selectedInputData.value = null;
  };
  </script>
  
  <style scoped>
  .predictions-log-container {
    padding: 20px;
  }
  
  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .filter {
    display: flex;
    align-items: center;
  }
  
  .filter label {
    margin-right: 10px;
    color: #555;
  }
  
  .predictions-table {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
  }
  
  .predictions-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .predictions-table th, .predictions-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  .predictions-table th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .predictions-table tbody tr:last-child td {
    border-bottom: none;
  }
  
  .predictions-table tbody td.healthy {
    color: #8bc34a;
  }
  
  .predictions-table tbody td.unhealthy {
    color: #f44336;
  }
  
  .predictions-table button {
    background-color: #481f01;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .predictions-table button:hover {
    background-color: #332200;
  }
  
  /* Responsive adjustments for the controls */
  @media (max-width: 600px) {
    .controls > div {
      width: 100%;
      margin-bottom: 10px;
    }
    .filter {
      flex-direction: column;
      align-items: flex-start;
    }
    .filter label {
      margin-bottom: 5px;
    }
  }
  </style>