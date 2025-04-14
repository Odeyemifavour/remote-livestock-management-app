<template>
    <div class="root">
      <!-- Left Column -->
      <div class="left-col">
        <CattleBackground />
      </div>
  
      <!-- Right Column -->
      <div class="right-col">
        <div class="logo">
          <h1>Cattle.<sup>360</sup></h1>
        </div>
        <div class="form-container">
          <div class="form-header">
            <h2>Welcome Back!</h2>
            <p>Please Login to your Cattle.360 account</p>
          </div>
          <form action="" @submit.prevent="handleLogin">
            <!-- Email Section -->
            <section class="email-section">
              <label for="email">Email</label>
              <div class="input-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  v-model="email"
                  required
                />
              </div>
            </section>
  
            <!-- Password Section -->
            <section class="password-section">
              <label for="password">Password</label>
              <div class="input-group">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  id="password"
                  placeholder="Enter your password"
                  v-model="password"
                  required
                />
                <span class="icon" @click="togglePasswordVisibility">
                  <i :class="isPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                </span>
              </div>
            </section>
  
            <!-- Forgot Password Section -->
            <section class="forgot-password-question">
              <p><a href="#" @click.prevent="openForgotPasswordPopup">Forgot password?</a></p>
            </section>
  
            <!-- Stay Signed In Section -->
            <section class="stay-signed-in">
              <input type="checkbox" id="stay-signed-in" />
              <label for="stay-signed-in">Stay signed in to the account.</label>
            </section>
  
            <!-- Login Button Section -->
            <section class="btn">
              <button type="submit">Login to your account</button>
            </section>
  
            <!-- Go To Create Account Section -->
            <section class="goTo-create-account">
              <p>
                Don't have a Cattle.360 account?
                <span @click="goToSignup"><a href="#">create account <i class="fa-solid fa-arrow-right"></i></a></span>
              </p>
            </section>
          </form>
        </div>
      </div>
  
      <!-- Forgot Password Popup -->
      <div v-if="showForgotPasswordPopup" class="popup-overlay">
        <div class="popup">
          <span class="close-icon" @click="closeForgotPasswordPopup">×</span>
          <h3>Reset Password</h3>
          <p>Enter your email to receive a password reset link:</p>
          <input
            type="email"
            v-model="resetEmail"
            placeholder="Enter your email"
            required
          />
          <button class="popup-btn" @click="sendResetLink">Submit</button>
          <p>
            Can’t find the link?
            <a href="#" @click.prevent="openResendConfirmationPopup">Resend link</a>
          </p>
        </div>
      </div>
  
      <!-- Resend Confirmation Popup -->
      <div v-if="showResendConfirmationPopup" class="resend-popup">
        <div class="popup-small">
          <span class="close-icon" @click="closeResendConfirmationPopup">×</span>
          <p>Password reset link sent!</p>
        </div>
      </div>
    </div>
  </template>

<script setup>
import CattleBackground from '@/components/CattleBackground.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form fields using ref
const email = ref('');
const password = ref('');

// Toggle Password Visibility
const isPasswordVisible = ref(false); // Initially, password is hidden
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Forgot Password Popup State
const showForgotPasswordPopup = ref(false);
const resetEmail = ref('');

// Resend Confirmation Popup State
const showResendConfirmationPopup = ref(false);

// Login logic
const handleLogin = () => {
  if (email.value && password.value) {
    alert('Login successful!');
    router.push('/dashboard'); // Redirect to dashboard
  } else {
    alert('Invalid credentials');
  }
};

// Navigation to signup
const goToSignup = () => {
  router.push('/signup');
};

// Open Forgot Password Popup
const openForgotPasswordPopup = () => {
  showForgotPasswordPopup.value = true;
};

// Close Forgot Password Popup
const closeForgotPasswordPopup = () => {
  showForgotPasswordPopup.value = false;
};

// Send Reset Link Logic
const sendResetLink = () => {
  if (resetEmail.value) {
    alert(`Password reset link sent to ${resetEmail.value}`);
    closeForgotPasswordPopup();
  } else {
    alert('Please enter a valid email.');
  }
};

// Open Resend Confirmation Popup
const openResendConfirmationPopup = () => {
  showResendConfirmationPopup.value = true;
};

// Close Resend Confirmation Popup
const closeResendConfirmationPopup = () => {
  showResendConfirmationPopup.value = false;
};
</script>

<style scoped>
/* General Layout */
.root {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  height: 600px;
  width: 80%;
  margin: auto;
  background-color: #f9f6ee;
}

.left-col,
.right-col {
  width: 50%;
  margin: auto;
}

.right-col {
  display: flex;
  flex-direction: column;
}

.logo h1 {
  color: #481f01;
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}

.form-container {
  padding: 20px;
}

/* Form Styling */
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.input-group {
  position: relative;
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #481f01; /* Highlight on focus */
}

.password-section .input-group input {
  padding-right: 40px; /* Space for the eye icon */
}

.icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s ease;
}
/* Password Visibility Toggle */
.password-section .input-group {
  position: relative;
}
/* .password-section .input-group:focus
{
    border-color: #481f01;
} */
.password-section input[type="password"],
.password-section input[type="text"] {
  width: 100%;
  padding: 10px;
  padding-right: 40px; /* Space for the eye icon */
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.password-section input:focus {
  border-color: #481f01; /* Highlight on focus */
}

.password-section .icon {
  position: absolute;
  right: 10px; 
  top: 50%; 
  transform: translateY(-50%); 
  color: #666; 
  cursor: pointer; 
  font-size: 18px; 
  transition: color 0.3s ease; /* Smooth hover effect */
}

.password-section .icon:hover {
  color: #333; /* Darker color on hover */
}

.icon:hover {
  color: #333;
}

.forgot-password-question {
  margin-top: 10px;
  text-align: right;
}

.forgot-password-question a {
  color: #481f01;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.forgot-password-question a:hover {
  color: #332200; /* Darker color on hover */
}

.stay-signed-in {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stay-signed-in input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.stay-signed-in label {
  font-size: 14px;
  color: #333;
}

.btn button {
  width: 100%;
  padding: 12px;
  background-color: #481f01;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
  text-align: center;
}

.btn button:hover {
  background-color: #332200; /* Darker shade on hover */
}

.btn button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(72, 31, 1, 0.5); /* Add a subtle focus shadow */
}

.goTo-create-account {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.goTo-create-account span a {
  color: #481f01;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.goTo-create-account span a:hover {
  color: #332200; /* Darker color on hover */
}

/* Popup Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.close-icon:hover {
  color: #333;
}

/* Submit Button in Forgot Password Popup */
.popup-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #481f01;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 15px;
  text-align: center;
}

.popup-btn:hover {
  background-color: #332200; /* Darker shade on hover */
}

.popup-btn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(72, 31, 1, 0.5); /* Add a subtle focus shadow */
}

/* Resend Link Style */
.popup p a {
  color: #481f01;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.popup p a:hover {
  color: #332200; /* Darker color on hover */
}

/* Resend Confirmation Popup */
.resend-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.popup-small {
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 250px;
}

.popup-small p {
  font-size: 14px;
  color: #333;
  margin: 0;
}

.popup-small .close-icon {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}

.popup-small .close-icon:hover {
  color: #333;
}

</style>