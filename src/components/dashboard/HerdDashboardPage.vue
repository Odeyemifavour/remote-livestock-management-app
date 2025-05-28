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
        <input
          type="text"
          id="animal-id-search"
          v-model="searchQuery"
          placeholder="Enter Animal ID"
        />
      </div>

      <div class="sort">
        <label for="sort-by">Sort By:</label>
        <select id="sort-by" v-model="sortBy">
          <option value="animalId">Animal ID</option>
          <option value="healthStatus">Health Status</option>
          <option value="riskLevel">Risk Level</option>
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
            <th>Current Health Status</th>
            <th>Risk Level</th>
            <th>Cattle Info</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="animal in filteredAndSortedLivestock" :key="animal.animalId">
            <td>{{ animal.animalId }}</td>
            <td>{{ animal.breed || 'N/A' }}</td>
            <td :class="healthClass(animal.healthStatus)">
              {{ animal.healthStatus }}
            </td>
            <td>{{ animal.riskLevel }}</td>
            <td>
              <router-link :to="`/dashboard/cattle/${animal.animalId}`">Cattle Info</router-link>
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

const livestockData = ref([
  { animalId: 101, breed: 'Holstein', healthStatus: 'Healthy', riskLevel: 'Low', lastPrediction: '2025-05-08 10:00', latestTemperature: 38.5, latestRespiratoryRate: 25, latestMilkProduction: 25 },
  { animalId: 102, breed: 'Jersey', healthStatus: 'Unhealthy', riskLevel: 'High', lastPrediction: '2025-05-08 09:30', latestTemperature: 39.8, latestRespiratoryRate: 35, latestMilkProduction: 18 },
  { animalId: 103, breed: 'Angus', healthStatus: 'Healthy', riskLevel: 'Low', lastPrediction: '2025-05-08 10:15', latestTemperature: 38.2, latestRespiratoryRate: 22, latestMilkProduction: null },
  { animalId: 104, breed: 'Holstein', healthStatus: 'Observation', riskLevel: 'Medium', lastPrediction: '2025-05-07 18:00', latestTemperature: 39.0, latestRespiratoryRate: 28, latestMilkProduction: 22 },
  // Add more data as needed
]);

const healthStatusFilter = ref('');
const searchQuery = ref('');
const sortBy = ref('animalId');
const sortDirection = ref('asc');

const filteredLivestock = computed(() => {
  return livestockData.value.filter(animal => {
    const healthMatch =
      !healthStatusFilter.value ||
      animal.healthStatus === healthStatusFilter.value ||
      (healthStatusFilter.value === 'Observation' && animal.healthStatus === 'Under Observation');
    const searchMatch = !searchQuery.value || animal.animalId.toString().includes(searchQuery.value);
    return healthMatch && searchMatch;
  });
});

const filteredAndSortedLivestock = computed(() => {
  const sorted = [...filteredLivestock.value];
  sorted.sort((a, b) => {
    let propA = a[sortBy.value];
    let propB = b[sortBy.value];

    // For riskLevel, define custom order (Low < Medium < High)
    if (sortBy.value === 'riskLevel') {
      const levels = { Low: 1, Medium: 2, High: 3 };
      propA = levels[propA] || 0;
      propB = levels[propB] || 0;
    }

    let comparison = 0;
    if (propA < propB) comparison = -1;
    else if (propA > propB) comparison = 1;

    return sortDirection.value === 'asc' ? comparison : comparison * -1;
  });
  return sorted;
});

function healthClass(status) {
  if (status === 'Healthy') return 'healthy';
  if (status === 'Unhealthy') return 'unhealthy';
  if (status === 'Observation') return 'observation';
  return '';
}
</script>

<style scoped>
.herd-dashboard-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter,
.search,
.sort {
  display: flex;
  align-items: center;
}

.filter label,
.search label,
.sort label {
  margin-right: 10px;
  color: #555;
  font-weight: 600;
}

.livestock-table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.livestock-table table {
  width: 100%;
  border-collapse: collapse;
}

.livestock-table th,
.livestock-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 14px;
}

.livestock-table th {
  background-color: #f5f5f5;
  font-weight: 700;
}

.livestock-table tbody tr:last-child td {
  border-bottom: none;
}

.livestock-table tbody td.healthy {
  color: #4caf50;
  font-weight: 600;
}

.livestock-table tbody td.unhealthy {
  color: #e53935;
  font-weight: 600;
}

.livestock-table tbody td.observation {
  color: #ff9800;
  font-weight: 600;
}

.livestock-table a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
}

.livestock-table a:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .controls > div {
    width: 100%;
    margin-bottom: 10px;
  }
  .filter,
  .search,
  .sort {
    flex-direction: column;
    align-items: flex-start;
  }
  .filter label,
  .search label,
  .sort label {
    margin-bottom: 5px;
  }
}
</style>
