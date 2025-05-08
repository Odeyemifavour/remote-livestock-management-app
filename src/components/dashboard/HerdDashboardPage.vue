<template>
    <div class="herd-dashboard-container">
      <h2>Herd Dashboard</h2>
      <div class="controls">
        <div class="filter">
          <label for="health-status-filter">Filter by Health Status:</label>
          <select id="health-status-filter" v-model="healthStatusFilter">
            <option value="">All</option>
            <option value="Healthy">Healthy</option>
            <option value="Unhealthy">Unhealthy</option>
            <option value="Observation">Under Observation</option>
          </select>
        </div>
        <div class="search">
          <label for="animal-id-search">Search by Animal ID:</label>
          <input type="text" id="animal-id-search" v-model="searchQuery" placeholder="Enter Animal ID">
        </div>
        <div class="sort">
          <label for="sort-by">Sort By:</label>
          <select id="sort-by" v-model="sortBy">
            <option value="animalId">Animal ID</option>
            <option value="healthStatus">Health Status</option>
            <option value="riskScore">Risk Score</option>
            </select>
          <select v-model="sortDirection">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
  
      <div class="livestock-table">
        <table v-if="filteredAndSortedLivestock.length > 0">
          <thead>
            <tr>
              <th>Animal ID</th>
              <th>Breed</th>
              <th>Current Health Prediction</th>
              <th>Risk Score</th>
              <th>Last Prediction</th>
              <th>Latest Temp</th>
              <th>Latest Resp. Rate</th>
              <th>Latest Milk</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="animal in filteredAndSortedLivestock" :key="animal.animalId">
              <td>{{ animal.animalId }}</td>
              <td>{{ animal.breed || 'N/A' }}</td>
              <td :class="{ 'healthy': animal.healthStatus === 'Healthy', 'unhealthy': animal.healthStatus === 'Unhealthy', 'observation': animal.healthStatus === 'Observation' }">
                {{ animal.healthStatus }}
              </td>
              <td>{{ animal.riskScore !== null ? animal.riskScore + '%' : 'N/A' }}</td>
              <td>{{ animal.lastPrediction || 'N/A' }}</td>
              <td>{{ animal.latestTemperature !== null ? animal.latestTemperature + '°C' : 'N/A' }}</td>
              <td>{{ animal.latestRespiratoryRate !== null ? animal.latestRespiratoryRate + ' bpm' : 'N/A' }}</td>
              <td>{{ animal.latestMilkProduction !== null ? animal.latestMilkProduction + ' L' : 'N/A' }}</td>
              <td>
                <router-link :to="`/dashboard/cattle/${animal.animalId}`">View Details</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No livestock data available or matching your criteria.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Dummy Livestock Data - Replace with API call
  const livestockData = ref([
    { animalId: 101, breed: 'Holstein', healthStatus: 'Healthy', riskScore: 15, lastPrediction: '2025-05-08 10:00', latestTemperature: 38.5, latestRespiratoryRate: 25, latestMilkProduction: 25 },
    { animalId: 102, breed: 'Jersey', healthStatus: 'Unhealthy', riskScore: 85, lastPrediction: '2025-05-08 09:30', latestTemperature: 39.8, latestRespiratoryRate: 35, latestMilkProduction: 18 },
    { animalId: 103, breed: 'Angus', healthStatus: 'Healthy', riskScore: 10, lastPrediction: '2025-05-08 10:15', latestTemperature: 38.2, latestRespiratoryRate: 22, latestMilkProduction: null },
    { animalId: 104, breed: 'Holstein', healthStatus: 'Observation', riskScore: 50, lastPrediction: '2025-05-07 18:00', latestTemperature: 39.0, latestRespiratoryRate: 28, latestMilkProduction: 22 },
    // Add more livestock data
  ]);
  
  const healthStatusFilter = ref('');
  const searchQuery = ref('');
  const sortBy = ref('animalId');
  const sortDirection = ref('asc');
  
  const filteredLivestock = computed(() => {
    return livestockData.value.filter(animal => {
      const healthMatch = !healthStatusFilter.value || animal.healthStatus === healthStatusFilter.value || (healthStatusFilter.value === 'Observation' && animal.healthStatus === 'Under Observation');
      const searchMatch = !searchQuery.value || animal.animalId.toString().includes(searchQuery.value);
      return healthMatch && searchMatch;
    });
  });
  
  const filteredAndSortedLivestock = computed(() => {
    const sorted = [...filteredLivestock.value];
    sorted.sort((a, b) => {
      const propA = a[sortBy.value];
      const propB = b[sortBy.value];
  
      let comparison = 0;
      if (propA < propB) {
        comparison = -1;
      } else if (propA > propB) {
        comparison = 1;
      }
      return sortDirection.value === 'asc' ? comparison : comparison * -1;
    });
    return sorted;
  });
  </script>
  
  <style scoped>
  .herd-dashboard-container {
    padding: 20px;
  }
  
  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .filter, .search, .sort {
    display: flex;
    align-items: center;
  }
  
  .filter label, .search label, .sort label {
    margin-right: 10px;
    color: #555;
  }
  
  .livestock-table {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
  }
  
  .livestock-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .livestock-table th, .livestock-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  .livestock-table th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .livestock-table tbody tr:last-child td {
    border-bottom: none;
  }
  
  .livestock-table tbody td.healthy {
    color: #8bc34a;
  }
  
  .livestock-table tbody td.unhealthy {
    color: #f44336;
  }
  
  .livestock-table tbody td.observation {
    color: #ff9800;
  }
  
  .livestock-table a {
    color: #007bff;
    text-decoration: none;
  }
  
  .livestock-table a:hover {
    text-decoration: underline;
  }
  
  /* Responsive adjustments for the controls */
  @media (max-width: 600px) {
    .controls > div {
      width: 100%;
      margin-bottom: 10px;
    }
    .filter, .search, .sort {
      flex-direction: column;
      align-items: flex-start;
    }
    .filter label, .search label, .sort label {
      margin-bottom: 5px;
    }
  }
  </style>