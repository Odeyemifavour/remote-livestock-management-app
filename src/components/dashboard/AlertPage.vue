<template>
    <div class="alerts-container">
      <h2>Alerts & Notifications</h2>
      <div class="controls">
        <div class="filter">
          <label for="status-filter">Filter by Status:</label>
          <select id="status-filter" v-model="alertStatusFilter">
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Viewed">Viewed</option>
            <option value="Action Taken">Action Taken</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div class="filter">
          <label for="severity-filter">Filter by Severity:</label>
          <select id="severity-filter" v-model="alertSeverityFilter">
            <option value="">All</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Information">Information</option>
          </select>
        </div>
      </div>
  
      <div class="alerts-list">
        <table v-if="filteredAlerts.length > 0">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Animal ID</th>
              <th>Alert Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alert in filteredAlerts" :key="alert.id">
              <td>{{ alert.dateTime }}</td>
              <td>{{ alert.animalId }}</td>
              <td>{{ alert.type }}</td>
              <td>{{ alert.description }}</td>
              <td>
                <select v-model="alert.status">
                  <option value="New">New</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Action Taken">Action Taken</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td>
                <router-link :to="`/dashboard/cattle/${alert.animalId}`">View Animal</router-link>
                <button @click="markAsResolved(alert.id)" v-if="alert.status !== 'Resolved'">Mark as Resolved</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No alerts available or matching your criteria.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Dummy Alerts Data - Replace with API call
  const alertsData = ref([
    { id: 1, dateTime: '2025-05-08 09:30', animalId: 102, type: 'High Risk Prediction', description: 'Predicted Unhealthy - Fever Index: 4.5', status: 'New', severity: 'Critical' },
    { id: 2, dateTime: '2025-05-08 08:45', animalId: 115, type: 'Elevated Respiratory Rate', description: 'Respiratory Rate: 32 bpm', status: 'Viewed', severity: 'Warning' },
    { id: 3, dateTime: '2025-05-07 20:00', animalId: 103, type: 'Low Milk Production', description: 'Milk Production significantly decreased', status: 'Action Taken', severity: 'Warning' },
    { id: 4, dateTime: '2025-05-06 12:00', animalId: 101, type: 'System Update', description: 'Health prediction model updated', status: 'Resolved', severity: 'Information' },
    // Add more alerts
  ]);
  
  const alertStatusFilter = ref('');
  const alertSeverityFilter = ref('');
  
  const filteredAlerts = computed(() => {
    return alertsData.value.filter(alert => {
      const statusMatch = !alertStatusFilter.value || alert.status === alertStatusFilter.value;
      const severityMatch = !alertSeverityFilter.value || alert.severity === alertSeverityFilter.value;
      return statusMatch && severityMatch;
    });
  });
  
  const markAsResolved = (alertId) => {
    const alert = alertsData.value.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'Resolved';
      // In a real application, you would likely send an API request to update the status
    }
  };
  </script>
  
  <style scoped>
  .alerts-container {
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
  
  .alerts-list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
  }
  
  .alerts-list table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .alerts-list th, .alerts-list td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  .alerts-list th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .alerts-list tbody tr:last-child td {
    border-bottom: none;
  }
  
  .alerts-list a {
    color: #007bff;
    text-decoration: none;
    margin-right: 10px;
  }
  
  .alerts-list a:hover {
    text-decoration: underline;
  }
  
  .alerts-list button {
    background-color: #481f01;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 10px;
  }
  
  .alerts-list button:hover {
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