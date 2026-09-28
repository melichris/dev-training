<template>
  <div class="app-layout">
    <div class="app-card">
      <h1 class="app-title">Shopping Portal</h1>

      <!-- Login Form Section -->
      <div v-if="!userLogIn.isLoggedIn" class="section-block">
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" v-model="userName" placeholder="Enter Name .." class="form-input"
            :class="{ 'input-error': nameError }">
          <p v-if="nameError" class="error-message">{{ nameError }}</p>
        </div>
        <button @click="handleLogin" class="btn btn-primary btn-full">
          L O G I N
        </button>
      </div>

      <!-- Logged In Section -->
      <div v-else class="section-block user-welcome-box">
        <p class="welcome-text">Welcome back, <span class="user-highlight">{{ userLogIn.name }}</span> 🎉</p>
        <button @click="userLogIn.logout()" class="btn btn-danger btn-full">L O G O U T</button>
      </div>

      <!-- Cart Inputs Section -->
      <div class="section-block border-top">
        <div class="form-group">
          <label for="item" class="form-label">New Item</label>
          <div class="input-group">
            <input type="text" id="item" v-model="item" placeholder="Enter Item .." class="form-input"
              :class="{ 'input-error': itemError || cartWarning }">
            <button @click="handleAddItem" class="btn btn-success">Add item</button>
          </div>
          <p v-if="itemError || cartWarning" class="error-message">
            {{ itemError || cartWarning }}
          </p>
        </div>
      </div>

      <!-- Inventory Metrics Panel -->
      <div class="section-block status-panel">
        <div class="status-row">
          <span class="status-label">Authentication Status:</span>
          <span :class="['badge', userLogIn.isLoggedIn ? 'badge-success' : 'badge-secondary']">
            {{ userLogIn.isLoggedIn ? "Active" : "Logged Out" }}
          </span>
        </div>

        <div class="inventory-box">
          <span class="status-label">Cart Inventory:</span>
          <div v-if="userCart.items && userCart.items.length" class="tag-container">
            <span v-for="(cartItem, idx) in userCart.items" :key="idx" class="item-tag">
              {{ cartItem }}
            </span>
          </div>
          <p v-else class="empty-text">No items inside the cart.</p>
        </div>

        <button @click="userCart.clearCart()" class="btn btn-outline btn-full">Reset cart</button>
      </div>

    </div>
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

<style scoped>
/* Page Layout Wrapper */
.app-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: system-ui, -apple-system, sans-serif;
  padding: 1.5rem;
  box-sizing: border-box;
}

/* Base Centralized Container Card */
.app-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

/* Logical Structural Containers */
.section-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.border-top {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.25rem;
}

.user-welcome-box {
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.welcome-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: #334155;
  margin: 0;
  text-align: center;
}

.user-highlight {
  color: #4f46e5;
}

/* Form Controls & Labels */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  color: #334155;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

.input-error {
  border-color: #ef4444 !important;
}

.error-message {
  font-size: 0.8rem;
  color: #ef4444;
  font-weight: 500;
  margin: 0.15rem 0 0 0;
}

/* Connected Input + Button Block */
.input-group {
  display: flex;
  width: 100%;
}

.input-group .form-input {
  border-radius: 8px 0 0 8px;
  border-right: none;
}

.input-group .btn {
  border-radius: 0 8px 8px 0;
  white-space: nowrap;
}

/* Solid Action Button Foundations */
.btn {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.btn:active {
  transform: scale(0.98);
}

.btn-full {
  width: 100%;
}

.btn-primary {
  background-color: #4f46e5;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-success {
  background-color: #10b981;
  color: #ffffff;
}

.btn-success:hover {
  background-color: #059669;
}

.btn-outline {
  background-color: transparent;
  color: #64748b;
  border: 1px solid #cbd5e1;
}

.btn-outline:hover {
  background-color: #f8fafc;
  color: #334155;
}

/* Status Panel Metrics */
.status-panel {
  background-color: #f8fafc;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-top: 0.5rem;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
}

.status-label {
  font-weight: 600;
  color: #64748b;
}

.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.badge-success {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-secondary {
  background-color: #f1f5f9;
  color: #475569;
}

/* Dynamic Cart Items Grid Layout */
.inventory-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  max-height: 120px;
  overflow-y: auto;
  padding: 0.2rem 0;
}

.item-tag {
  background-color: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.empty-text {
  font-size: 0.85rem;
  color: #94a3b8;
  font-style: italic;
  margin: 0;
}
</style>
