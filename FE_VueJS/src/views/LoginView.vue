<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const text = ref('')
const password = ref('')
let token = ''
const router = useRouter()

const login = () => {
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
        token = res.token
        document.cookie = 'token' + '=' + res.token
        // change route here
        router.push('/private-page')
      }
      return res
    })
    .catch((error) => {
      console.log(error)
    })
}

const callPrivateApi = () => {
  const url = 'http://localhost:3308/private'
  const data = {
    email: text.value,
    password: password.value
  }

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: token
    },
    credentials: 'same-origin'
  }).then(async (response) => {
    const res = await response.json()
    console.log('===>  file: LoginView.vue:26  res:', res)
    return res
  })
}
</script>

<template>
  <div class="about">
    <input v-model="text" placeholder="email" />
    <input type="password" v-model="password" placeholder="password" />
    <button @click="login">Login</button>
    <button @click="callPrivateApi">Call a private API</button>
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
