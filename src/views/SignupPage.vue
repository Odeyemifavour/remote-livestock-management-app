<template>
    <div class="root">
      <!-- Main Container -->
      <div class="main-container">
        <!-- Logo -->
        <div class="logo">
          <h1>Cattle.<sup>360</sup></h1>
        </div>
  
        <!-- Resend Confirmation Link -->
        <div v-if="resendConfirmationMessage" class="resend-link">
          {{ resendConfirmationMessage }}
        </div>
  
        <!-- Form Container -->
        <div class="form-container">
          <!-- Success Message -->
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
  
          <div class="form-header">
            <h2>Sign Up</h2>
          </div>
          <div class="form-body">
            <form @submit.prevent="handleSignUp">
              <!-- First Name and Last Name -->
              <div class="names">
                <section class="first-name">
                  <label for="firstname">First Name</label>
                  <div class="input-group">
                    <input
                      type="text"
                      id="firstname"
                      v-model="firstName"
                      placeholder="Enter your first name"
                      required
                    />
                    <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
                  </div>
                </section>
                <section class="last-name">
                  <label for="lastname">Last Name</label>
                  <div class="input-group">
                    <input
                      type="text"
                      id="lastname"
                      v-model="lastName"
                      placeholder="Enter your last name"
                      required
                    />
                    <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
                  </div>
                </section>
              </div>
  
              <!-- Email -->
              <div class="email">
                <label for="email">Email</label>
                <div class="input-group">
                  <span><i class="fa-solid fa-envelope"></i></span>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Enter your email"
                    required
                  />
                  <span v-if="errors.email" class="error">{{ errors.email }}</span>
                </div>
              </div>
  
              <!-- Telephone Number -->
              <div class="telephone-number">
                <label for="phone">Telephone Number</label>
                <div class="input-group">
                  <span><i class="fa-solid fa-phone"></i></span>
                  <input
                    type="tel"
                    id="phone"
                    v-model="phone"
                    placeholder="e.g., +234012345678"
                    required
                  />
                  <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                </div>
              </div>
  
              <!-- Password -->
              <div class="password-section">
                <label for="password">Password</label>
                <div class="input-group">
                  <input
                    :type="isPasswordVisible ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    placeholder="Enter your password"
                    required
                  />
                  <span class="icon" @click="togglePasswordVisibility">
                    <i :class="isPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                  </span>
                </div>
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
              </div>
  
              <!-- Confirm Password -->
              <div class="password-section">
                <label for="confirmPassword">Confirm Password:</label>
                <div class="input-group">
                  <input
                    :type="isPasswordVisible ? 'text' : 'password'"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    placeholder="Confirm your password"
                    required
                  />
                  <span class="icon" @click="togglePasswordVisibility">
                    <i :class="isPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                  </span>
                </div>
                <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
              </div>
  
              <!-- Terms and Conditions -->
              <div class="terms">
                <input type="checkbox" id="terms" v-model="termsAccepted" required />
                <label for="terms">I have read and agree to the terms and conditions.</label>
                <span v-if="errors.termsAccepted" class="error">{{ errors.termsAccepted }}</span>
              </div>
  
              <!-- Submit Button -->
              <button type="submit">Sign Up</button>
            </form>
  
            <!-- Links -->
            <div class="links">
              <p>Already have an account? <a href="#" @click="goToLogin">Log in</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive Variables
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const termsAccepted = ref(false);
const isPasswordVisible = ref(false);
const successMessage = ref('');
const resendConfirmationMessage = ref('');
const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAccepted: '',
});

// Password Strength Validation
const validatePassword = () => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
  if (!passwordRegex.test(password.value)) {
    errors.value.password =
      'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
  } else {
    errors.value.password = '';
  }
};

// Validate Form Fields
const validateForm = () => {
  errors.value.firstName = firstName.value ? '' : 'First name is required.';
  errors.value.lastName = lastName.value ? '' : 'Last name is required.';
  errors.value.email = email.value ? '' : 'Email is required.';
  errors.value.phone = phone.value ? '' : 'Phone number is required.';
  errors.value.termsAccepted = termsAccepted.value ? '' : 'You must agree to the terms and conditions.';
  validatePassword();
  if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match.';
  } else {
    errors.value.confirmPassword = '';
  }
};

// Handle Sign Up
const handleSignUp = () => {
  validateForm();
  if (
    !errors.value.firstName &&
    !errors.value.lastName &&
    !errors.value.email &&
    !errors.value.phone &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.termsAccepted
  ) {
    successMessage.value = 'Sign-up successful! Redirecting to login page...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }
};

// Toggle Password Visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Navigation Functions
const goToLogin = () => {
  router.push('/login');
};

// Resend Confirmation Email
const resendConfirmation = () => {
  resendConfirmationMessage.value = 'Confirmation email resent!';
  setTimeout(() => {
    resendConfirmationMessage.value = ''; // Clear message after 3 seconds
  }, 3000);
};
</script>

<style scoped>
    /* General Layout */
.root {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: 100vh; /* Full viewport height */
  background-color: #f9f6ee; /* Background color for the entire container */
}

.main-container {
  width: 100%;
  max-width: 500px; /* Adjusted width for better responsiveness */
  padding: 40px;
  background-color: white; /* Ensure the form has a white background */
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  position: relative; /* Needed for absolute positioning of elements */
}

/* Logo Styling */
.logo h1 {
  color: #481f01;
  font-size: 36px; /* Larger logo size */
  text-align: center;
  margin-bottom: 30px;
}

.logo sup {
  font-size: 16px; /* Larger superscript */
  vertical-align: super;
}

/* Resend Confirmation Link */
.resend-link {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  color: #481f01;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.resend-link:hover {
  color: #332200;
  text-decoration: underline;
}

/* Success Message */
.success-message {
  color: green;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

/* Error Messages */
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

/* Input Fields */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"] {
  width: 100%;
  padding: 14px; /* Increased padding for better spacing */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 20px; /* Increased spacing between fields */
}

input:focus {
  border-color: #481f01;
  box-shadow: 0 0 5px rgba(72, 31, 1, 0.3);
}

/* Icons for Email and Phone */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-group span {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  font-size: 16px; /* Reduced icon size */
  line-height: 1; /* Ensures proper vertical alignment */
}

.input-group input {
  padding-left: 40px; /* Space for the icon */
  font-size: 16px; /* Match input text size with icons */
  height: 44px; /* Fixed height for consistent alignment */
  line-height: 22px; /* Vertically centers text */
}

/* Password Visibility Toggle */
.password-section .icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  font-size: 16px; /* Reduced icon size */
  transition: color 0.3s ease;
}

.password-section .icon:hover {
  color: #333;
}

/* Submit Button */
button {
  width: 100%;
  padding: 14px; /* Increased padding for better sizing */
  background-color: #481f01;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px; /* Larger font size for button */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px; /* Increased spacing */
}

button:hover {
  background-color: #332200;
  transform: scale(1.02);
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(72, 31, 1, 0.5);
}

/* Links */
.links {
  margin-top: 20px;
  text-align: center;
}

.links p {
  font-size: 16px; /* Larger font size for links */
  color: #333;
  margin-top: 10px;
}

.links a {
  color: #481f01; /* Primary color for links */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #332200; /* Darker shade on hover */
  text-decoration: underline;
}

/* Terms and Conditions */
.terms {
  margin-top: 15px;
  text-align: left;
}

.terms input[type="checkbox"] {
  margin-right: 10px;
}

.terms label {
  font-size: 16px; /* Larger font size for terms text */
  color: #333;
}

/* Placeholder Text Styling */
input::placeholder {
  font-size: 14px; /* Smaller placeholder text */
  color: #999; /* Light gray for placeholders */
}
</style>