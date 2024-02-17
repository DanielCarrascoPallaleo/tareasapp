<template>
    <div class="container mt-5">
      <div class="row mt-3">
        <div class="col-md-8 offset-md-2">
          <h3>Listado de tareas</h3>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-8 offset-md-2">
          <div class="card border border-white text-center" v-if="!load">
          </div>
          <div class="table-responsive" v-else>
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Titulo</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="task, i in tasks" :key="task.id">
                  <td>{{ i + 1 }}</td>
                  <td>{{ task.title }}</td>
                  <td>
                    <router-link :to="{ path: '/' + task.id }" class="btn btn-success">
                      Ver
                    </router-link>
                  </td>
                  <td>
                    <router-link :to="{ path: 'edit/' + task.id }" class="btn btn-warning" style="color: white">
                      Editar
                    </router-link>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="deleteTask(task.id)">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <router-link
              :to="{ path: 'create' }"
              class="btn"
              style="color: white;background-color: #8E3CA9"
            >
              Agregar
            </router-link>
          </div>
        </div>
      </div>
  
      <div class="row mt-3">
        <div class="col-md-8 offset-md-2">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="loadPage(currentPage - 1)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="loadPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="loadPage(currentPage + 1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
  
      <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
          <label for="perPage">Tareas por página:</label>
          <select id="perPage" v-model="perPage" @change="updateItemsPerPage">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from '../../../stores/auth';
  const authStore = useAuthStore();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
  
  onMounted(() => { 
    getTasks(1);
  });

  const tasks = ref([]);
  const perPage = ref(3);
  const currentPage = ref(1);
  const totalPages = ref(2);
  const load = ref(false);
  const searchId = ref('');
  const searchName = ref('');
  
  const getTasks = async (page, type) => {
    const userId = authStore.user.data.id;
    const params = {
      user_id: userId,
      page: page,
      per_page: perPage.value,
      id: searchId.value,
      name: searchName.value,
    };
    
    const response = await axios.get('http://127.0.0.1:8000/api/tasks', { params });
    const responseData = response.data;
  
    tasks.value = responseData.data;
    currentPage.value = responseData.current_page;
    totalPages.value = responseData.last_page;
    load.value = true;
  };
  
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/api/tasks/' + id);
      const resultado = response.data;
      load.value = true;
      // Comprobar si se eliminó correctamente
      const index = tasks.value.findIndex((task) => task.id === id);
      if (index !== -1) {
        tasks.value.splice(index, 1);
      }
      if (resultado.success) {
        console.log('Tarea con ID ' + id + ' eliminada con éxito.');
      } else {
        console.log('No se pudo eliminar la tarea con ID ' + id + '.');
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const loadPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      getTasks(page);
    }
  };
  
  const updateItemsPerPage = () => {
    if (perPage.value < 1) {
      perPage.value = 1;
    }
    getTasks(1);
  };
  </script>
