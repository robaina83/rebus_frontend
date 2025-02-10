<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem("user")));
const notifications = ref([
  "Nuevo usuario registrado",
  "Actualización del sistema"
]);
const showNotifications = ref(false);

// ✅ Cerrar notificaciones si se hace clic fuera
const closeNotifications = (event) => {
  if (!event.target.closest(".dropdown")) {
    showNotifications.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", closeNotifications);
});

onUnmounted(() => {
  window.removeEventListener("click", closeNotifications);
});

const toggleNotifications = (event) => {
  event.stopPropagation(); // 🔥 Evitar que el clic cierre inmediatamente
  showNotifications.value = !showNotifications.value;
};

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<template>
  <nav class="navbar">
    <h2 class="logo">Dashboard</h2>
    <div class="nav-right">
      <!-- Notificaciones y Botón de Logout agrupados -->
      <div class="notifications-and-logout">
        <!-- Notificaciones -->
        <div class="dropdown">
          <button class="notification-btn" @click="toggleNotifications">
            🔔 {{ notifications.length }}
          </button>
          <div class="dropdown-menu" v-show="showNotifications">
            <div v-for="(note, index) in notifications" :key="index" class="notification">
              {{ note }}
            </div>
            <div v-if="notifications.length === 0" class="notification empty">
              No hay notificaciones
            </div>
          </div>
        </div>

        <!-- Nombre de usuario -->
        <span class="user-name">{{ user?.name }}</span>

        <!-- Botón de Logout -->
        <button @click="logout" class="logout-btn">🚪 Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 📌 Navbar General */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2D378C;
  color: white;
  padding: 15px 20px;
  height: 60px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* 📌 Contenedor de notificaciones y logout */
.notifications-and-logout {
  display: flex;
  align-items: center;
  gap: 20px; /* 🔥 Separar elementos */
}

/* 📌 Botón de notificaciones */
.notification-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  position: relative;
}

/* 📌 Menú de notificaciones */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  color: black;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  width: 220px;
  display: block;
}

/* 📌 Notificación */
.notification {
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
}

.notification:last-child {
  border-bottom: none;
}

.notification.empty {
  text-align: center;
  color: gray;
}

/* 📌 Botón de Logout */
.logout-btn {
  background: red;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background: darkred;
}
</style>
