<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref<User[]>([])
const dialog = ref(false)
const userId = ref(null)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const successAlert = ref(false)
const confirmDelete = ref(false)
const deleteSuccessAlert = ref(false)
const isEdit = ref(false)

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
  if (isEdit.value) {
    fetch(`http://localhost:3308/user?id=${userId.value}`, {
      method: 'PUT',
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
      .then(() => {
        dialog.value = false
        getUsers()
        successAlert.value = true
        isEdit.value = false
        setTimeout(() => {
          successAlert.value = false
        }, 5000)
      })
      .catch((err) => {
        console.log('err', err)
      })
  } else {
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
      .then(() => {
        dialog.value = false
        getUsers()
        successAlert.value = true
        setTimeout(() => {
          successAlert.value = false
        }, 5000)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
}

const onCloseDialog = () => {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  password.value = ''
  dialog.value = false
}

const showConfirmDelete = (user: any) => {
  confirmDelete.value = true
  userId.value = user.id
  firstName.value = user.firstName
  lastName.value = user.lastName
  email.value = user.email
}

const showEditUser = (user: any) => {
  isEdit.value = true
  dialog.value = true
  userId.value = user.id
  firstName.value = user.firstName
  lastName.value = user.lastName
  email.value = user.email
}

const handleDelete = () => {
  fetch(`http://localhost:3308/user/${userId.value}`, {
    method: 'DELETE'
  })
    .then(() => {
      confirmDelete.value = false
      getUsers()
      deleteSuccessAlert.value = true
      setTimeout(() => {
        deleteSuccessAlert.value = false
      }, 5000)
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<template>
  <v-alert
    style="margin-bottom: 20px"
    v-model="successAlert"
    type="success"
    closable
    title="Successfully"
  >
    Create user successfully
  </v-alert>

  <v-alert
    style="margin-bottom: 20px"
    v-model="deleteSuccessAlert"
    type="success"
    closable
    title="Successfully"
  >
    Delete user successfully
  </v-alert>

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
        <v-btn block @click="() => onCloseDialog()">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="confirmDelete" width="400px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirm delete</span>
      </v-card-title>
      <v-card-text>
        <b>Are you sure you want to delete this one?</b>
        <div>First name: {{ firstName }}</div>
        <div>Last name: {{ lastName }}</div>
        <div>Email: {{ email }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" @click="confirmDelete = false">Close</v-btn>
        <v-btn variant="tonal" @click="handleDelete">Delete</v-btn>
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
          <span
            style="margin-right: 16px; cursor: pointer; color: orange"
            @click="() => showEditUser(user)"
            >Edit</span
          >
          <span style="cursor: pointer; color: red" @click="() => showConfirmDelete(user)"
            >Delete</span
          >
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-btn @click="handleLogout">logout</v-btn>
</template>
