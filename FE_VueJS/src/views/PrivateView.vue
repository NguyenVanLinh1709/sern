<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref<User[]>([])
const dialog = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

onBeforeMount(() => {
  const arrRes = document.cookie.split('token=')
  if (!arrRes[1]) {
    router.push('/')
  } else {
    getUsers()
  }
})

const getUsers = async () => {
  users.value = await fetch('http://localhost:3308/users', {
    method: 'GET'
  })
    .then(async (res) => {
      const result = await res.json()
      return result
    })
    .catch((err) => {
      alert(err)
    })
}

const handleLogout = () => {
  document.cookie = 'token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  router.push('/')
}

const handleSubmit = () => {
  fetch('http://localhost:3308/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    })
  })
    .then((res) => {
      dialog.value = false
      getUsers()
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<template>
  <v-dialog v-model="dialog" width="400px">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"> Create </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field v-model="firstName" label="First name"></v-text-field>
          <v-text-field v-model="lastName" label="Last name"></v-text-field>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-table style="margin: 20px 0">
    <thead>
      <tr>
        <th class="text-left">First Name</th>
        <th class="text-left">Last Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>
          <span style="margin-right: 16px; cursor: pointer">Edit</span
          ><span style="cursor: pointer">Delete</span>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-btn @click="handleLogout">logout</v-btn>
</template>
