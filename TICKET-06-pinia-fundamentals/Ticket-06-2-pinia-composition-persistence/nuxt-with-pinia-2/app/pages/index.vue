<template>
  <div>
    <div v-if="!userLogIn.isLoggedIn">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="userName" placeholder="Enter Name ..">
      <p v-if="nameError" style="color: red;">{{ nameError }}</p>
      <button @click="handleLogin">
        L O G I N
      </button>
    </div>
    <div v-else>
      <p>Welcome back {{ userLogIn.name }} 🎉</p>
      <button @click="userLogIn.logout()">L O G O U T</button>
    </div>
    <div>
      <label for="item">New Item:</label>
      <input type="text" id="item" v-model="item" placeholder="Enter Item ..">
      <button @click="handleAddItem">Add item</button>
      <p v-if="itemError || cartWarning" style="color: red;">
        {{ itemError || cartWarning }}
      </p>
    </div>

    <p>isLoggedIn: {{ userLogIn.isLoggedIn ? "Yes" : "No" }}</p>
    <p>Items: {{ userCart.items }}</p>
    <button @click="userCart.clearCart()">Reset cart</button>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cartStore';
import { useUserStore } from '~/stores/userStore';

const item = ref('')
const userName = ref('')
const nameError = ref('')
const itemError = ref('')
const cartWarning = ref('')

const userLogIn = useUserStore()
const userCart = useCartStore()

const validateInput = (val: string, type: string): string => {
  if (!val || !val.trim()) return `${type} cannot be blank or empty spaces.`;
  if (!/^[A-Za-z\s]+$/.test(val)) return `${type} must contain only letters (A-Z).`;
  return '';
}

const handleLogin = () => {
  nameError.value = validateInput(userName.value, 'Name')

  if (!nameError.value) {
    userLogIn.login(userName.value)
  }
}
const handleAddItem = () => {
  itemError.value = validateInput(item.value, 'Item name')
  cartWarning.value = ''

  if (!itemError.value) {
    if (!userLogIn.isLoggedIn) {
      cartWarning.value = 'Please log in before adding items to your cart.'
      return
    }
    userCart.addItem(item.value)
    item.value = ''
  }
}

</script>
