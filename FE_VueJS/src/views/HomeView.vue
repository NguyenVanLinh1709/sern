<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleLogin() {
  router.push('/login')
}
</script>

<template>
  <div>Hello Kieu</div>
  <button @click="handleLogin">Login</button>
</template>
