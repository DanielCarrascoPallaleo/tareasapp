<script setup>
import {ref,nextTick} from 'vue';
import { useRouter } from 'vue-router';
//import {ref} from 'vue';
// import { sendRequest } from '../../functions';
import { useAuthStore } from '../../../stores/auth';
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;

const nameInput = ref('');
const descriptionInput = ref('');
const usuarios =  authStore.user.data.users;
const form = ref({ title:'', description: '', done: 0, user_id: usuarios.length > 0 ? usuarios[0].id : null});
const router = useRouter();
const save = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/tasks', form.value);
    const task = response.data;
    router.go(-1);
    console.log('Tarea guardada con éxito:', task);
  } catch (error) {
      console.error('Error al guardar la tarea:', error);
  }
}
</script>
<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card border">
            <div class="card-header" style="background-color: #8E3CA9"></div>
            <div class="card-body">
              <form @submit.prevent="save">
                <div class="mb-3">
                  <label for="title" class="form-label">Nombre</label>
                  <input
                    autofocus
                    type="text"
                    id="title"
                    v-model="form.title"
                    class="form-control"
                    placeholder="Titulo de la tarea"
                    required
                    ref="nameInput"
                  >
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Descripción</label>
                  <input
                    autofocus
                    type="text"
                    id="description"
                    v-model="form.description"
                    class="form-control"
                    placeholder="Descripción"
                    required
                    ref="descriptionInput"
                  >
                </div>
                <div class="mb-3">
                  <label for="user_id" class="form-label">Usuario asignado</label>
                  <select v-model="form.user_id" class="form-control">
                    <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.name }}</option>
                  </select>
                </div>
                <div class="d-grid col-10 mx-auto">
                  <button class="btn" style="background-color: #8E3CA9; color: white">
                    <i class="fa-solid fa-save"></i> Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
