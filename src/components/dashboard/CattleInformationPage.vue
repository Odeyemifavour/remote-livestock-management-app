<template>
    <div class="cattle-info-container">
      <h2>Cattle Information - Animal ID: {{ cattle.animalId }}</h2>
  
      <div class="profile-section" v-if="cattle">
        <h3>Animal Profile</h3>
        <p><strong>Animal ID:</strong> {{ cattle.animalId }}</p>
        <p><strong>Breed:</strong> {{ cattle.breed || 'N/A' }}</p>
        <p><strong>Age:</strong> {{ cattle.age || 'N/A' }}</p>
        <p><strong>Current Health Prediction:</strong> <span :class="{ 'healthy': cattle.healthStatus === 'Healthy', 'unhealthy': cattle.healthStatus === 'Unhealthy', 'observation': cattle.healthStatus === 'Observation' }">{{ cattle.healthStatus }}</span></p>
      </div>
      <div v-else>Loading animal information...</div>
  
      <div class="metrics-charts" v-if="cattle">
        <h3>Historical Health Metrics</h3>
        <div class="chart-row">
          <div class="chart-container">
            <h4>Body Temperature</h4>
            <canvas id="tempChart"></canvas>
          </div>
          <div class="chart-container">
            <h4>Respiratory Rate</h4>
            <canvas id="respRateChart"></canvas>
          </div>
        </div>
        <div class="chart-row">
          <div class="chart-container">
            <h4>Milk Production</h4>
            <canvas id="milkChart"></canvas>
          </div>
          <div class="chart-container">
            <h4>Walking Capacity</h4>
            <canvas id="walkingChart"></canvas>
          </div>
        </div>
        </div>
      <div v-else>Loading charts...</div>
  
      <div class="prediction-history" v-if="cattle">
        <h3>Prediction History</h3>
        <table v-if="cattle.predictions && cattle.predictions.length > 0">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Outcome</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pred in cattle.predictions" :key="pred.id">
              <td>{{ pred.dateTime }}</td>
              <td :class="{ 'healthy': pred.outcome === 'Healthy', 'unhealthy': pred.outcome === 'Unhealthy' }">{{ pred.outcome }}</td>
              <td>{{ pred.confidence }}%</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No prediction history available for this animal.</p>
      </div>
      <div v-else>Loading prediction history...</div>
  
      <div class="alert-history" v-if="cattle">
        <h3>Alert History</h3>
        <table v-if="cattle.alerts && cattle.alerts.length > 0">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in cattle.alerts" :key="alert.id">
              <td>{{ alert.dateTime }}</td>
              <td>{{ alert.type }}</td>
              <td>{{ alert.description }}</td>
              <td>{{ alert.status }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No alert history available for this animal.</p>
      </div>
      <div v-else>Loading alert history...</div>
  
      <div class="notes-section" v-if="cattle">
        <h3>Notes</h3>
        <textarea v-model="notes" placeholder="Add notes about this animal"></textarea>
        <button>Save Notes</button>
      </div>
      <div v-else>Loading notes...</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Chart from 'chart.js/auto';
  
  const route = useRoute();
  const animalId = ref(route.params.id);
  const cattle = ref(null);
  const notes = ref('');
  
  onMounted(() => {
    // Dummy Cattle Data - Replace with API call based on animalId.value
    const dummyCattle = {
      animalId: parseInt(animalId.value),
      breed: 'Holstein',
      age: '3 years',
      healthStatus: 'Unhealthy',
      latestTemperature: 39.8,
      latestRespiratoryRate: 35,
      predictions: [
        { id: 1, dateTime: '2025-05-08 09:30', outcome: 'Unhealthy', confidence: 92 },
        { id: 2, dateTime: '2025-05-07 18:00', outcome: 'Healthy', confidence: 75 },
      ],
      alerts: [
        { id: 1, dateTime: '2025-05-08 09:30', type: 'High Fever', description: 'Temperature above normal', status: 'New' },
      ],
      healthMetrics: {
        temperature: [38.5, 39.0, 39.5, 39.8],
        respiratoryRate: [24, 28, 32, 35],
        milkProduction: [25, 24, 22, 18],
        walkingCapacity: [4, 3, 2, 1], // Example scale 1-5
      },
    };
    cattle.value = dummyCattle;
    notes.value = 'Initial observation of lethargy.';
  
    if (cattle.value && cattle.value.healthMetrics) {
      const renderLineChart = (canvasId, data) => {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'], // Example labels
            datasets: [{
              label: canvasId.replace('Chart', ''),
              data: data,
              borderColor: '#481f01',
              fill: false,
              tension: 0.1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      };
  
      renderLineChart('tempChart', cattle.value.healthMetrics.temperature);
      renderLineChart('respRateChart', cattle.value.healthMetrics.respiratoryRate);
      renderLineChart('milkChart', cattle.value.healthMetrics.milkProduction);
      renderLineChart('walkingChart', cattle.value.healthMetrics.walkingCapacity);
      // Render other charts similarly
    }
  });
  </script>
  
  <style scoped>
  .cattle-info-container {
    padding: 20px;
  }
  
  .profile-section, .metrics-charts, .prediction-history, .alert-history, .notes-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .profile-section h3, .metrics-charts h3, .prediction-history h3, .alert-history h3, .notes-section h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
  }
  
  .chart-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .chart-container {
    flex-grow: 1;
  }
  
  .chart-container h4 {
    text-align: center;
    color: #555;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .prediction-history table, .alert-history table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .prediction-history th, .prediction-history td, .alert-history th, .alert-history td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  .prediction-history th, .alert-history th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .prediction-history tbody tr:last-child td, .alert-history tbody tr:last-child td {
    border-bottom: none;
  }
  
  .prediction-history tbody td.healthy {
    color: #8bc34a;
  }
  
  .prediction-history tbody td.unhealthy {
    color: #f44336;
  }
  
  .notes-section textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .notes-section button {
    background-color: #481f01;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .notes-section button:hover {
    background-color: #332200;
  }
  
  /* Responsive adjustments for chart layout */
  @media (max-width: 768px) {
    .chart-row {
      flex-direction: column;
    }
    .chart-container {
      width: 100%;
    }
  }
  </style>