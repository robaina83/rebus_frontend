<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <div >
     <div >
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>

/* 📌 Evitar que el contenido quede debajo del Navbar */
main {
  padding: 0px;  /* 🔥 Ajustar para que no quede debajo del Navbar */
  min-height: calc(100vh - 90px);
  margin-left: 0;
  margin-top: 0;

}
/* 📌 🔥 Responsive Design */
@media (max-width: 768px) {
  main {
    margin-left: 20px;
    margin-top: 20px;

  }
}
</style>
