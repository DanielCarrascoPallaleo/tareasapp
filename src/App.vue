<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from './modules/shared/components/NavBar2.vue'
const route = useRoute();
</script>

<template>

  <div class="container-fluid mt-3" style="width: 90vw; height: 90vh;">
    <NavBar v-if="route.name !== 'login' && route.name !== 'register'"></NavBar>
    <RouterView />
  </div>

</template>

<style scoped>
</style>
