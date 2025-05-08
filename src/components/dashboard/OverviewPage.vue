<template>
    <div class="overview-container">
      <h2>Overview/Home</h2>
      <div class="health-status">
        <div class="status-card">
          <h3>Healthy</h3>
          <span class="count">{{ herdHealth.healthy }}</span>
          <span class="percentage">({{ herdHealth.healthyPercentage }}%)</span>
        </div>
        <div class="status-card at-risk">
          <h3>At Risk</h3>
          <span class="count">{{ herdHealth.atRisk }}</span>
          <span class="percentage">({{ herdHealth.atRiskPercentage }}%)</span>
        </div>
        <div class="status-card observation">
          <h3>Under Observation</h3>
          <span class="count">{{ herdHealth.underObservation }}</span>
          <span class="percentage">({{ herdHealth.underObservationPercentage }}%)</span>
        </div>
      </div>
  
      <div class="recent-alerts">
        <h3>Recent Critical Alerts</h3>
        <ul v-if="recentAlerts.length > 0">
          <li v-for="alert in recentAlerts" :key="alert.id">
            <router-link :to="`/dashboard/cattle/${alert.animalId}`">
              {{ alert.message }}
            </router-link>
          </li>
        </ul>
        <p v-else>No recent critical alerts.</p>
        <button @click="$router.push('/dashboard/alerts')">View All Alerts</button>
      </div>
  
      <div class="metric-trends">
        <h3>Key Metric Trends (Last 7 Days)</h3>
        <div class="trend-chart">
          <h4>Overall Herd Risk Level</h4>
          <canvas id="riskLevelChart"></canvas>
        </div>
        <div class="trend-chart">
          <h4>Average Fever Index</h4>
          <canvas id="feverIndexChart"></canvas>
        </div>
        <div class="trend-chart">
          <h4>Average Productivity Score</h4>
          <canvas id="productivityScoreChart"></canvas>
        </div>
      </div>
  
      <div class="quick-actions">
        <button @click="openAddAnimalModal">Add New Animal</button>
        <button @click="$router.push('/dashboard/herd')">View Herd Dashboard</button>
      </div>
  
      <div v-if="showAddAnimalModal" class="modal-overlay">
        <div class="modal">
          <span class="close-icon" @click="closeAddAnimalModal">×</span>
          <h3>Add New Animal</h3>
          <p>This feature will be implemented in the next stage.</p>
          <button @click="closeAddAnimalModal">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  // Dummy Data - Replace with API calls
  const herdHealth = ref({
    healthy: 135,
    atRisk: 15,
    underObservation: 5,
    get healthyPercentage() { return ((this.healthy / (this.healthy + this.atRisk + this.underObservation)) * 100).toFixed(2); },
    get atRiskPercentage() { return ((this.atRisk / (this.healthy + this.atRisk + this.underObservation)) * 100).toFixed(2); },
    get underObservationPercentage() { return ((this.underObservation / (this.healthy + this.atRisk + this.underObservation)) * 100).toFixed(2); },
  });
  
  const recentAlerts = ref([
    { id: 1, animalId: 102, message: 'Cow #102: High Fever Index - Unhealthy Prediction' },
    { id: 2, animalId: 115, message: 'Cow #115: Slightly elevated respiratory rate' },
    // Add more alerts
  ]);
  
  const showAddAnimalModal = ref(false);
  const openAddAnimalModal = () => {
    showAddAnimalModal.value = true;
  };
  const closeAddAnimalModal = () => {
    showAddAnimalModal.value = false;
  };
  
  onMounted(() => {
    // Dummy Trend Data
    const trendData = {
      riskLevel: [10, 15, 12, 18, 16, 20, 17],
      feverIndex: [2.1, 2.3, 2.2, 2.5, 2.4, 2.6, 2.5],
      productivityScore: [85, 88, 86, 90, 89, 92, 91],
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    };
  
    const renderLineChart = (canvasId, data) => {
      const ctx = document.getElementById(canvasId).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: trendData.labels,
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
  
    renderLineChart('riskLevelChart', trendData.riskLevel);
    renderLineChart('feverIndexChart', trendData.feverIndex);
    renderLineChart('productivityScoreChart', trendData.productivityScore);
  });
  </script>
  
  <style scoped>
  .overview-container {
    padding: 20px;
  }
  
  .health-status {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .status-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    flex-grow: 1;
  }
  
  .status-card h3 {
    margin-top: 0;
    margin-bottom: 5px;
    color: #333;
  }
  
  .status-card .count {
    font-size: 1.5em;
    font-weight: bold;
    color: #481f01;
  }
  
  .status-card .percentage {
    display: block;
    font-size: 0.9em;
    color: #777;
  }
  
  .status-card.at-risk .count {
    color: #f44336;
  }
  
  .status-card.observation .count {
    color: #ff9800;
  }
  
  .recent-alerts {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .recent-alerts h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
  }
  
  .recent-alerts ul {
    list-style: none;
    padding-left: 0;
  }
  
  .recent-alerts ul li a {
    color: #007bff;
    text-decoration: none;
  }
  
  .recent-alerts ul li a:hover {
    text-decoration: underline;
  }
  
  .recent-alerts button {
    background-color: #481f01;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  }
  
  .recent-alerts button:hover {
    background-color: #332200;
  }
  
  .metric-trends {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .trend-chart {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .trend-chart h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
    font-size: 1.1em;
    text-align: center;
  }
  
  .quick-actions {
    display: flex;
    gap: 10px;
  }
  
  .quick-actions button {
    background-color: #481f01;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .quick-actions button:hover {
    background-color: #332200;
  }
  
  /* Modal Styling (Example) */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    position: relative;
  }
  
  .modal .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5em;
    cursor: pointer;
    color: #777;
  }
  </style>