<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="welcome-container">
    <div class="title">Welcome to My first Vue Project</div>
    <v-btn @click="handleLogin">Login</v-btn>
  </div>
</template>

<style>
.welcome-container {
  display: flex;
  flex-direction: column;
  .title {
    color: rgb(0, 160, 112);
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: bold;
  }
}
</style>
