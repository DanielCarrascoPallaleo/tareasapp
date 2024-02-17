<script setup>
import {ref,onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
const form = ref({ id:'', title:'', description: '',done: 0, stock: '', user_id: authStore.user.data.id });
const usuarios =  authStore.user.data.users;
const id = ref(route.params.id);
onMounted( () => { getTask()});
const getTask = () =>{
    axios.get('http://127.0.0.1:8000/api/tasks/'+id.value).then(
        response => (
            form.value.id = response.data.id,
            form.value.title = response.data.title,
            form.value.description = response.data.description,
            form.value.done = response.data.done,
            // form.value.name = response.data.name,
            form.value.user_id = response.data.user_id
          )
    );
}

const save = async () => {
    try {
        const response = await axios.put('http://127.0.0.1:8000/api/tasks/'+ id.value, form.value);
        const task = response.data;
        
        router.go(-1);
        console.log('Tarea editada con éxito:', task);
    } catch (error) {
        console.error('Error al editar la tarea:', error);
    }
}
</script>
<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card border border">
            <div class="card-header border" style="background-color: #8E3CA9; color: white"></div>
            <div class="card-body">
              <form @submit.prevent="save">
                <div class="mb-3">
                  <label for="title" class="form-label">Titulo de la tarea</label>
                  <input
                    autofocus
                    type="text"
                    id="title"
                    v-model="form.title"
                    class="form-control"
                    placeholder="Tarea"
                    required
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
                  >
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="done" class="form-label">Done</label>
                    <input
                      autofocus
                      type="number"
                      id="done"
                      v-model="form.done"
                      class="form-control"
                      placeholder="Done"
                      required
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <label for="user_id" class="form-label">Usuario asignado</label>
                  <select v-model="form.user_id" class="form-control">
                    <option v-for="user in usuarios" :key="user.id" :value="user.id">{{ user.name }}</option>
                  </select>
                </div>
                <div class="d-grid col-10 mx-auto">
                  <button class="btn" style="background-color: #8E3CA9; color: white">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
