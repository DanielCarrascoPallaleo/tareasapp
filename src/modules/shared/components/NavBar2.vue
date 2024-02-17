<script setup>
import { useAuthStore } from '../../../stores/auth'
const authStore = useAuthStore();
</script>
<template>
    <nav class="navbar navbar-expand-lg shadow p-3 mb-5 bg-white rounded">
      <div class="container-fluid">
        <div style="background-color: #8E3CA9; color: white; border-radius: 15px; padding: 10px;">
          <h2 >Tuxpan</h2>
        </div>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav justify-content-center" v-if="authStore.user">
            <li class="nav-item">
              <RouterLink to="/tasks" class="nav-link">Tareas</RouterLink>
            </li>
            <li class="nav-item">
              <button @click="authStore.logout" class="btn">Salir</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
