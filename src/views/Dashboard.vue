<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <Navbar />
      <h1>Bienvenido al Dashboard</h1>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
.dashboard {
  display: flex;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
