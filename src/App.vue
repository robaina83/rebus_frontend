<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

</script>

<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 📌 Contenedor principal */
.layout {
  display: flex;
  height: 100vh;
}

/* 📌 Contenido principal */
.main-content {
  flex-grow: 1;
  margin-left: 0px; /* 🔥 Ajustar al ancho de la Sidebar */
  width: calc(100% ); /* 🔥 Ocupar el espacio restante */
  overflow-x: hidden;
}

/* 📌 Evitar que el contenido quede debajo del Navbar */
main {
  padding: 70px 20px; /* 🔥 Ajustar para que no quede debajo del Navbar */
  min-height: calc(100vh - 70px);
}
</style>
