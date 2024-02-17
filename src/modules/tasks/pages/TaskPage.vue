<script setup>
import {ref,onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../../stores/auth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer '+authStore.authToken;
const form = ref({ id:'', title:'', description: '', username: '',user_id: authStore.user.data.id });
const id = ref(route.params.id);
onMounted( () => { getTask()});
const getTask = () =>{
  axios.get('http://127.0.0.1:8000/api/tasks/'+id.value).then(
    response => (
        form.value.id = response.data.id,
        form.value.title = response.data.title,
        form.value.description = response.data.description,
        form.value.done = response.data.done,
        form.value.username = response.data.name,
        form.value.user_id = response.data.user_id
      )
  );
}

const volver = () => {
    router.go(-1);
}
</script>
<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card border">
            <div class="card-header  border" style="background-color: #8E3CA9; color: white"></div>
            <div class="card-body">
                <div class="mb-3">
                  <label for="title" class="form-label">Tarea</label>
                  <input
                    autofocus
                    type="text"
                    id="title"
                    v-model="form.title"
                    class="form-control"
                    placeholder="Tarea"
                    disabled
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
                    disabled
                  >
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="done" class="form-label">Realizada</label>
                    <input v-if="form.done == 0" class="form-control" disabled type="text" value="no">
                    <input v-else type="text" class="form-control" disabled value="si">
                  </div>
                  <div class="col-md-6">
                    <label for="user" class="form-label">Usuario</label>
                    <input
                      autofocus
                      type="text"
                      id="user"
                      v-model="form.username"
                      class="form-control"
                      placeholder="nombre"
                      disabled
                    >
                  </div>
                </div>
                <div class="d-grid col-10 mx-auto">
                  <button class="btn" style="background-color: #8E3CA9; color: white" @click="volver">Volver</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  