<template>
  <div class="settings-help-container">
    <h2>Settings & Help</h2>

    <div class="settings-section">
      <h3>User Settings</h3>
      <div class="setting-item">
        <h4>Change Password</h4>
        <p>This feature will be implemented soon.</p>
      </div>
      <div class="setting-item">
        <h4>Notification Preferences</h4>
        <p>Manage how you receive alerts (in-app, email).</p>
      </div>
    </div>

    <div class="help-section">
      <h3>Help</h3>
      <div class="help-item">
        <h4>FAQ</h4>
        <ul>
          <li>
            <strong>How do I interpret the health status?</strong> <br />
            Healthy: Animal showing no signs of illness. At Risk: Animal with indicators suggesting potential health issues. Under Observation: Animal flagged for manual monitoring.
          </li>
          <li>
            <strong>What is the fever index?</strong> <br />
            A calculated metric based on temperature and other factors to assess fever severity.
          </li>
        </ul>
      </div>
      <div class="help-item">
        <h4>How to Use the Dashboard</h4>
        <p>
          Navigate through the sidebar to access different sections. The Overview provides a summary, while the Herd Dashboard shows details for all animals...
        </p>
      </div>
      <div class="help-item">
        <h4>Contact Support</h4>
        <p>
          For technical support, please contact support@cattle360.com or call <strong>09110210673</strong>.
        </p>
      </div>
    </div>

    <footer class="footer">
      <p>Contact: 09110210673</p>
      <p>© 2025 Odeyemi Favour Abosede | <a href="mailto:Odeyemifavour593@gmail.com">Odeyemifavour593@gmail.com</a></p>
    </footer>
  </div>
</template>

<script setup>
// Add your logic here if needed for settings/help functionality
</script>

<style scoped>
.settings-help-container {
  padding: 20px;
}

.settings-section,
.help-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.settings-section h3,
.help-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.setting-item,
.help-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.setting-item:last-child,
.help-item:last-child {
  border-bottom: none;
}

.setting-item h4 {
  color: #555;
  margin-top: 0;
  margin-bottom: 10px;
}

.help-item ul {
  padding-left: 20px;
  list-style-type: disc;
}

.help-item strong {
  font-weight: bold;
}

.footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  text-align: center;
  color: #555;
  font-size: 0.9rem;
}

.footer a {
  color: #5a3e1b;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
