<script setup>
import { ref } from "vue";

const menuItems = ref([
  { title: "Inicio", icon: "🏠", link: "/dashboard" },
  {
    title: "Gestión", icon: "⚙️",
    submenu: [
      { title: "Usuarios", link: "/users" },
      { title: "Reportes", link: "/reports" }
    ]
  },
  { title: "Ajustes", icon: "🔧", link: "/settings" }
]);

const activeSubmenu = ref(null);

const toggleSubmenu = (index) => {
  activeSubmenu.value = activeSubmenu.value === index ? null : index;
};
</script>

<template>
  <div class="sidebar">
    <h2 class="sidebar-title">Menú</h2>
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <div class="menu-item" @click="toggleSubmenu(index)">
          <span>{{ item.icon }}</span> {{ item.title }}
        </div>
        <ul v-if="item.submenu && activeSubmenu === index" class="submenu">
          <li v-for="(sub, subIndex) in item.submenu" :key="subIndex">
            <router-link :to="sub.link">{{ sub.title }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 📌 Sidebar General */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* Puedes ajustar el ancho */
  height: 100vh; /* Ocupa toda la pantalla */
  background: #231964;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

/* 📌 Título del menú */
.sidebar-title {
  font-size: 20px;
  margin-bottom: 20px;
}

/* 📌 Elementos del menú */
ul {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.menu-item:hover {
  background: #444;
}

/* 📌 Submenú */
.submenu {
  list-style: none;
  padding-left: 20px;
}

.submenu li {
  padding: 8px 0;
}

.submenu li a {
  color: #ddd;
  text-decoration: none;
  font-size: 14px;
}

.submenu li a:hover {
  color: white;
}
</style>
