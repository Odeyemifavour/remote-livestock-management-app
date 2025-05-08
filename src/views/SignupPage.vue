<template>
    <div class="root">
        <!-- Left Column-->
        <div class="left-col">
            <div class="logo">
                <img src="/cow-logo-design-inspiration-bull-and-buffalo-cow-animal-logo-design-free-vector.jpg" alt="">
            </div>
            <div class="form-container">
                container
            </div>
        </div>

        <!--Right column-->
        <div class="right-col">
           <CattleBackgroundd/>
        </div>
    </div>
</template>

<script setup>
import CattleBackgroundd from '@/components/CattleBackgroundd.vue';
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
  border: solid yellow;
  height: 700px;
}

.left-col,
.right-col {
  width: 50%;
  margin: auto;
  height: 700px;
}
.left-col{
   
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;

  img 
  {
    width: 100px;
    height:100px;
    border-radius: 50%;
  }
}
.right-col{
   
}
</style>