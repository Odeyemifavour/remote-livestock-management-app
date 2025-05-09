<template>
    <div class="cattle-info-container">
      <h2>Cattle Information - Animal ID: {{ cattle?.animalId }}</h2>
  
      <div class="profile-section" v-if="cattle">
        <h3>Animal Profile</h3>
        <p><strong>Animal ID:</strong> {{ cattle.animalId }}</p>
        <p><strong>Breed:</strong> {{ cattle.breed || 'N/A' }}</p>
        <p><strong>Body Temperature:</strong> {{ cattle.latestTemperature }}</p>
        <p><strong>Respiratory Rate:</strong> {{ cattle.latestRespiratoryRate }}</p>
        <p><strong>Milk Production:</strong> {{ cattle.latestMilkProduction || 'N/A' }}</p>
        <p><strong>Walking Capacity:</strong> {{ cattle.walking_capacity || 'N/A' }}</p>
        <p><strong>Sleeping Duration:</strong> {{ cattle.sleeping_duration || 'N/A' }}</p>
        <p><strong>Body Condition Score:</strong> {{ cattle.body_condition_score || 'N/A' }}</p>
        <p><strong>Heart Rate:</strong> {{ cattle.heart_rate || 'N/A' }}</p>
        <p><strong>Eating Duration:</strong> {{ cattle.eating_duration || 'N/A' }}</p>
        <p><strong>Lying Down Duration:</strong> {{ cattle.lying_down_duration || 'N/A' }}</p>
        <p><strong>Ruminating:</strong> {{ cattle.ruminating || 'N/A' }}</p>
        <p><strong>Rumen Fill:</strong> {{ cattle.rumen_fill || 'N/A' }}</p>
        <p><strong>Faecal Consistency:</strong> {{ cattle.faecal_consistency || 'N/A' }}</p>
        <p><strong>Health Status:</strong> {{ cattle.healthStatus }}</p>
        <p><strong>Current Prediction:</strong> {{ cattle.prediction }}</p>
      </div>
  
      <div class="metrics-charts" v-if="cattle">
        <h3>Historical Health Metrics (Example - Adapt as needed)</h3>
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
      </div>
  
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
  
      <div class="notes-section" v-if="cattle">
        <h3>Notes</h3>
        <textarea v-model="notes" placeholder="Add notes about this animal"></textarea>
        <button>Save Notes</button>
      </div>
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
  
  const possiblePredictions = [
    'Respiratory Diseases',
    'Gastrointestinal Diseases',
    'Metabolic Disorders',
    'Udder Health Issues',
    'Reproductive Diseases',
    'Lameness and Musculoskeletal Issues',
    'Systemic Infections',
    'General Illness/Morbidity/Health status',
  ];
  
  cattle.value = {
    animalId: parseInt(route.params.id),
    breed: "Holstein",
    latestTemperature: 38.6,
    latestRespiratoryRate: 24,
    latestMilkProduction: 26.5,
    walking_capacity: 5,
    sleeping_duration: 9.5,
    body_condition_score: 3.5,
    heart_rate: 58,
    eating_duration: 7,
    lying_down_duration: 13,
    ruminating: 8.5,
    rumen_fill: 4,
    faecal_consistency: "Normal",
    healthStatus: "Healthy",
    prediction: possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)],
    predictions: [
      { id: 1, dateTime: "2025-05-09 08:00", outcome: possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)], confidence: 88 },
      { id: 2, dateTime: "2025-05-08 19:30", outcome: possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)], confidence: 75 },
    ],
    alerts: [
      { id: 1, dateTime: "2025-05-09 07:15", type: "System Check", description: "Daily system check completed", status: "Resolved" },
    ],
    healthMetrics: {
      temperature: [38.5],
      respiratoryRate: [23],
    },
  };
  
  onMounted(() => {
    if (cattle.value && cattle.value.healthMetrics) {
      const renderLineChart = (canvasId, data) => {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Current'],
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