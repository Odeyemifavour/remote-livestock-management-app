<template>
    <div class="root">

        <div class="left-col">
            <CattleBackground/>
        </div>
        <div class="right-col">
            <div class="logo">
                 <h1>Cattle.<sup>360</sup></h1>
            </div>
            <div class="form-container">
                <div class="form-header">
                    <h2>Welcome Back!</h2>
                    <p>Please Login to your Cattle.360 account</p>
                </div>
                <form action="">
                <!-- Email Section -->
                <section class="email-section">
                    <label for="email">Email</label>
                    <div class="input-group">
                    <input type="email" id="email" placeholder="Enter your email">
                    </div>
                </section>

                <!-- Password Section -->
                <section class="password-section">
                    <label for="password">Password</label>
                    <div class="input-group">
                    <input type="password" id="password" placeholder="Enter your password">
                    <span class="icon"><i class="fa-solid fa-eye-slash"></i></span>
                    </div>
                </section>

                <!-- Forgot Password Section -->
                <section class="forgot-password-question">
                    <p><a href="#">Forgot password?</a></p>
                </section>

                <!-- Stay Signed In Section -->
                <section class="stay-signed-in">
                    <input type="checkbox" id="stay-signed-in">
                    <label for="stay-signed-in">Stay signed in to the account.</label>
                </section>

                <!-- Login Button Section -->
                <section class="btn">
                    <button type="submit">Login to your account</button>
                </section>

                <!-- Go To Create Account Section -->
                <section class="goTo-create-account">
                    <p>Don't have a Cattle.360 account? 
                    <span><a href="#">create account <i class="fa-solid fa-arrow-right"></i></a></span>
                    </p>
                </section>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import CattleBackground from '@/components/CattleBackground.vue';

</script>

<style scoped>
.root
{
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    height: 600px;
    width:80%;
    margin: auto;
    background-color: #F9F6EE;
     
    .right-col,.left-col
    {
        width: 50%;
        margin: auto;
    }

}
.right-col
{
    display: flex;
    flex-direction: column;
}
.logo
{
    display: flex;
    justify-content: center;
}
.logo h1
{
    color: #481F01;
}
.form-container
{
    
}
.form-header
{
   text-align: center; 
   color: #333;
}
.form-body
{

}
/* General Form Styling */
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

/* Label Styling */
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

/* Input Group Styling */
.input-group {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 15px;
}

/* Icon Styling */
.icon {
  position: absolute;
  color: #666;
  pointer-events: none; /* Prevents clicking on the icon */
}

.email-section .icon {
  left: 10px;
}

.password-section .icon {
  right: 10px;
  left: auto;
  cursor: pointer; /* Make it clickable for password toggle */
}

/* Input Field Styling */
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px 10px 10px 40px; /* Add padding to make space for the icon */
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #481F01; /* Highlight on focus */
}

/* Forgot Password Section */
.forgot-password-question {
  margin-top: 10px;
  text-align: right;
}

.forgot-password-question a {
  color: #481F01;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password-question a:hover {
  text-decoration: underline;
}

/* Stay Signed In Section */
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
  margin: 0;
}

/* Login Button Section */
.btn {
  margin-top: 20px;
}

.btn button {
  width: 100%;
  padding: 10px;
  background-color: #481F01;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn button:hover {
  background-color: #481F01; /* Darker shade on hover */
}

/* Go To Create Account Section */
.goTo-create-account {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.goTo-create-account span a {
  color: #481F01;
  cursor: pointer;
}

.goTo-create-account span:hover {
  text-decoration: underline;
}
</style>