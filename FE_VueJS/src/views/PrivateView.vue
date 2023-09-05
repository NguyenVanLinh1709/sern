<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  const arrRes = document.cookie.split('token=')
  if (!arrRes[1]) {
    router.push('/')
  } else {
    console.log('hi')
  }
})

const handleLogout = () => {
  document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  router.push('/')
}
</script>

<template>
  <main>Private View</main>
  <table>
    <tr>
      <th></th>
    </tr>
  </table>
  <button @click="handleLogout">logout</button>
</template>
