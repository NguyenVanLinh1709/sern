<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const text = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const url = 'http://localhost:3308/login'
  const data = {
    email: text.value,
    password: password.value
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(async (response) => {
      const res = await response.json()
      if (res.errCode) {
        alert(res.errMessage)
      } else {
        document.cookie = 'token' + '=' + res.token
        router.push('/private-page')
      }
      return res
    })
    .catch((error) => {
      alert(error)
    })
}
</script>

<template>
  <div class="about">
    <input v-model="text" placeholder="email" />
    <input type="password" v-model="password" placeholder="password" />
    <v-btn @click="login">Login</v-btn>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
