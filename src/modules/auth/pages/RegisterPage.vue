<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../../stores/auth';
const authStore = useAuthStore();
const form = ref({ email:'', password:'', password_confirmation:'' });
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <img src="../../shared/images/tuxpanlogo.jpg" alt="Imagen" class="img-fluid">
      </div>
      <div class="col-md-6">
        <!-- Formulario -->
        <div class="card border">
          <div class="card-header border text-white" style="background-color: #8E3CA9;">Registrarse</div>
          <div class="card-body">
            <form @submit.prevent="authStore.register(form)">
              <div class="mb-3">
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa-solid fa-user"></i>
                    </span>
                    <input
                      autofocus
                      type="text"
                      v-model="form.name"
                      placeholder="Nombre"
                      class="form-control"
                    >
                  </div>
                </div>
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fa-solid fa-at"></i>
                  </span>
                  <input
                    autofocus
                    type="email"
                    v-model="form.email"
                    placeholder="Email"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="password"
                    v-model="form.password"
                    placeholder="Password"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fa-solid fa-key"></i>
                  </span>
                  <input
                    type="password"
                    v-model="form.password_confirmation"
                    placeholder="Confirmar contraseña"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="d-grid col-10 mx-auto">
                <button class="btn" style="background-color: #8E3CA9; color: white">Registrarse</button>
              </div>
              <div class="text-center mt-3">
                <router-link :to="{ path: 'login' }">Login</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
