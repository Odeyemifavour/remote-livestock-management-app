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
            <option value="No Health Risk Predicted">No Health Risk Predicted</option>
            <option value="Respiratory Diseases">Respiratory Diseases</option>
            <option value="Gastrointestinal Diseases">Gastrointestinal Diseases</option>
            <option value="Metabolic Disorders">Metabolic Disorders</option>
            <option value="Udder Health Issues">Udder Health Issues</option>
            <option value="Reproductive Diseases">Reproductive Diseases</option>
            <option value="Lameness and Musculoskeletal Issues">Lameness and Musculoskeletal Issues</option>
            <option value="Systemic Infections">Systemic Infections</option>
            <option value="General Illness/Morbidity/Health status">General Illness/Morbidity/Health status</option>
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
              <th>Predicted Illness</th>
              <th>Status</th>
              <th>Confidence Score</th>
              <th>Input Data Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prediction in filteredPredictions" :key="prediction.id">
              <td>{{ prediction.dateTime }}</td>
              <td>{{ prediction.animalId }}</td>
              <td>{{ prediction.outcome }}</td>
              <td :class="{ 'healthy': prediction.status === 'Healthy', 'unhealthy': prediction.status === 'Unhealthy' }">{{ prediction.status }}</td>
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
          <pre>{{ formatInputData(selectedInputData) }}</pre>
          <button @click="closeInputDialog">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Dummy Predictions Data - Replace with API call
  const predictionsData = ref([
    { id: 1, dateTime: '2025-05-08 09:30', animalId: 102, outcome: 'Respiratory Diseases', confidenceScore: 92, inputData: { body_temperature: 39.8, breed_type: 'Jersey', respiratory_rate: 35, milk_production: 18, walking_capacity: 1, sleeping_duration: 14, body_condition_score: 2, heart_rate: 75, eating_duration: 4, lying_down_duration: 16, ruminating: 6, rumen_fill: 2, faecal_consistency: 'Loose' }, status: 'Unhealthy' },
    { id: 2, dateTime: '2025-05-08 10:00', animalId: 101, outcome: 'No Health Risk Predicted', confidenceScore: 88, inputData: { body_temperature: 38.5, breed_type: 'Holstein', respiratory_rate: 25, milk_production: 25, walking_capacity: 4, sleeping_duration: 10, body_condition_score: 3, heart_rate: 60, eating_duration: 6, lying_down_duration: 12, ruminating: 8, rumen_fill: 4, faecal_consistency: 'Normal' }, status: 'Healthy' },
    { id: 3, dateTime: '2025-05-07 15:00', animalId: 103, outcome: 'Gastrointestinal Diseases', confidenceScore: 78, inputData: { body_temperature: 37.9, breed_type: 'Angus', respiratory_rate: 20, milk_production: null, walking_capacity: 5, sleeping_duration: 11, body_condition_score: 4, heart_rate: 52, eating_duration: 8, lying_down_duration: 10, ruminating: 9, rumen_fill: 5, faecal_consistency: 'Watery' }, status: 'Unhealthy' },
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
  
  const formatInputData = (data) => {
    let formattedString = '';
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        formattedString += `${key}: ${data[key]}\n`;
      }
    }
    return formattedString;
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