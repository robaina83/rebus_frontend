<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const menuItems = ref([
  { title: "Inicio", icon: "🏠", link: "/dashboard" },
  {
    title: "Gestión", icon: "⚙️",
    submenu: [
      { title: "Usuarios", icon: "👤", link: "/users" },
      { title: "Reportes", icon: "📊", link: "/reports" }
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
          <span class="icon">{{ item.icon }}</span> &nbsp;{{ item.title }}
          <font-awesome-icon
            v-if="item.submenu"
            :icon="activeSubmenu === index ? faChevronUp : faChevronDown"
            class="arrow"
          />
        </div>
        <ul v-if="item.submenu && activeSubmenu === index" class="submenu">
          <li v-for="(sub, subIndex) in item.submenu" :key="subIndex">
            <router-link :to="sub.link">
              <span>{{ sub.icon }}</span> &nbsp;{{ sub.title }}
            </router-link>
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
  width: 250px;
  height: 100vh;
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
  justify-content: space-between; /* Mantener la flecha a la derecha */
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.menu-item:hover {
  background: #444;
}

/* 📌 Iconos */
.icon {
  margin-right: 8px; /* Espacio entre el icono y el título */
}

/* 📌 Flecha del submenú */
.arrow {
  margin-left: auto;
  color: white;
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
  display: flex;
  align-items: center;
  color: #ddd;
  text-decoration: none;
  font-size: 14px;
}

.submenu li a:hover {
  color: white;
}

.submenu li a span {
  margin-right: 8px;
}
</style>
