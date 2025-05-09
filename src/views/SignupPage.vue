<template>
  <div class="root">
    <div class="left-col">
      <CattleBackground />
    </div>

    <div class="right-col">
      <div class="logo">
        <img src="/cow-logo-design-inspiration-bull-and-buffalo-cow-animal-logo-design-free-vector.jpg" alt="">
      </div>
      <div class="form-container">
        <div class="form-header">
          <h2>Create Account</h2>
          <p>Please fill out the form below to create your Cattle.360 account</p>
        </div>
        <form action="" @submit.prevent="handleSignup">
          <section class="input-section">
            <label for="name">Full Name</label>
            <div class="input-group">
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                v-model="name"
                required
              />
            </div>
          </section>

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

          <section class="password-section">
            <label for="confirm-password">Confirm Password</label>
            <div class="input-group">
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                v-model="confirmPassword"
                required
              />
            </div>
          </section>

          <section class="btn">
            <button type="submit">Create Account</button>
          </section>

          <section class="goTo-login">
            <p>
              Already have a Cattle.360 account?
              <span @click="goToLogin"><a href="#">Login <i class="fa-solid fa-arrow-right"></i></a></span>
            </p>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import CattleBackground from '@/components/CattleBackground.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form fields
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Toggle Password Visibility
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Signup logic
const handleSignup = () => {
  if (password.value === confirmPassword.value) {
    alert('Account created successfully!');
    router.push('/dashboard'); // Redirect to dashboard after signup
  } else {
    alert('Passwords do not match.');
  }
};

// Navigation to login
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
/* Reusing styles from the LoginPage */
.root {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  /* height: 600px; */ /* Remove the fixed height */
  width: 80%;
  margin: auto;
  background-color: #f9f6ee;
  min-height: 600px; /* Or a reasonable minimum height */
  align-items: flex-start; /* Align items to the top to prevent stretching */
}

.left-col,
.right-col {
  width: 50%;
  margin: auto;
}

.right-col {
  display: flex;
  flex-direction: column;
  .right-col {
  /* ... other styles ... */
  overflow-y: auto; /* Add scroll if content overflows in the right column */
  max-height: 100vh; /* Optionally set a max height */
}
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}

.form-container {
  padding: 20px;
}

.form-header {
  text-align: center;
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

input[type="text"],
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

.goTo-login {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.goTo-login span a {
  color: #481f01;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.goTo-login span a:hover {
  color: #332200; /* Darker color on hover */
}

/* New section for general input fields (Name) */
.input-section {
  margin-bottom: 15px;
}
</style>