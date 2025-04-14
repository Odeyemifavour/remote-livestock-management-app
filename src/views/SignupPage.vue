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
                <h2>Sign up</h2>
            </div>
            <div class="form-body">
                <form action="">
                    <!-- First Name and Last Name -->
                <div class="names">
                    <section class="first-name">
                        <label for="firstname"> firstname</label>
                        <div class="input-group">
                            <input type="text" placeholder="enter your firstname">
                        </div>
                    </section>
                    <section class="last-name">
                        <label for="lastname"> firstname</label>
                        <div class="input-group">
                            <input type="text" placeholder="enter your lastname">
                        </div>
                    </section>
                </div>
                <!-- Email -->
                 <div class="email">
                    <label for="email">email</label>
                    <div class="input-group">
                        <span> <i class="fa-solid fa-envelope"></i></span>
                        <input type="email" placeholder="enter your email">
                    </div>
                 </div>

                 <!-- Telephone Number -->
                 <div class="telephone-number">
                    <label for="phone">Telephone Number</label>
                    <div class="input-group">
                        <span> <i class="fa-solid fa-phone"></i></span>
                        <input type="tel" placeholder="e.g., +234012345678">
                    </div>
                 </div>

                 <!-- Language -->
                 <div class="select-language">
                    <label for="language">Language:</label>
                    <select id="language" v-model="language" required>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="other">Other</option>
                    </select>
                 </div>

                 <!-- Country -->
                  <div class="country">
                    <label for="country">Country:</label>
                    <input type="text" id="country" v-model="country" required />
                  </div>

                  <!-- Password -->
                   <div class="password-section">
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
                   </div>

                   <!-- Confirm Password -->
                   <div class="password-section">
                    <label for="confirmPassword">Confirm Password:</label>
                        <div class="input-group">
                            <input
                            :type="isPasswordVisible ? 'text' : 'password'"
                            id="password"
                            placeholder="Enter your password"
                            v-model="confirmPassword"
                            required
                            />
                            <span class="icon" @click="togglePasswordVisibility">
                            <i :class="isPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                            </span>
                        </div>
                   </div>

                   <!-- Terms and Conditions -->
                   <div class="terms">
                    <input type="checkbox" id="terms" v-model="termsAccepted" required />
                    <label for="terms">I have read and agree to the terms and conditions.</label>
                  </div>

                  <button type="submit">Sign Up</button>
                </form>
                <!-- Links -->
                <div class="links">
                    <p>Already have an account? <a href="#" @click="goToLogin">Log in</a>.</p>
                    <p>
                    Already registered but haven't received confirmation mail yet?
                    <a href="#" @click="resendConfirmation">Resend confirmation email</a>.
                    </p>
                </div>
            </div>

        </div>
      </div>   
    </div>
</template>

<script setup>
    import CattleBackground from '@/components/CattleBackground.vue';

</script>

<style scoped>
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
  
}
.left-col{
    margin: auto;
}

</style>