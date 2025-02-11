<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBell, faBars, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem("user")));
const notifications = ref(["Nuevo usuario registrado", "Actualización del sistema"]);
const showNotifications = ref(false);
const isMenuOpen = ref(false); // 🔥 Control del menú responsive

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
  event.stopPropagation();
  showNotifications.value = !showNotifications.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>

<template>
  <nav class="navbar">
    <!-- 🔹 Logo -->
    <h2 class="logo">REBUS</h2>

    <!-- 🔹 Botón de menú hamburguesa (solo en móviles) -->
    <button class="menu-button" @click="toggleMenu">
      <font-awesome-icon :icon="isMenuOpen ? faTimes : faBars" />
    </button>

    <!-- 🔹 Menú derecho -->
    <div class="nav-right" :class="{ 'menu-open': isMenuOpen }">
      <!-- Notificaciones -->
      <div class="dropdown">
        <button class="notification-btn" @click="toggleNotifications">
          <font-awesome-icon :icon="faBell" />
          <span v-if="notifications.length" class="badge">{{ notifications.length }}</span>
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
      <button @click="logout" class="logout-btn">
        <font-awesome-icon :icon="faSignOutAlt" /> Cerrar sesión
      </button>
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

/* 📌 Botón de menú hamburguesa */
.menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: none;
}

/* 📌 Contenedor del menú derecho */
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px; /* 🔥 Separar elementos */
}

/* 📌 Notificaciones */
.dropdown {
  position: relative;
}

.notification-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  position: relative;
}

.badge {
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 3px 7px;
  position: absolute;
  top: -5px;
  right: -10px;
}

/* 📌 Menú de notificaciones */
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

/* 📌 Nombre de usuario */
.user-name {
  font-size: 16px;
  font-weight: bold;
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

/* 📌 🔥 Responsive Design */
@media (max-width: 768px) {
  .menu-button {
    display: block; /* 🔥 Mostrar menú hamburguesa en móviles */
  }

  .nav-right {
    position: absolute;
    top: 60px;
    right: -100%;
    background: #2D378C;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    width: 100%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease-in-out;
  }

  /* 🔥 Mostrar menú cuando se activa */
  .nav-right.menu-open {
    right: 0;
  }

  /* Ajustar elementos dentro del menú */
  .dropdown-menu {
    top: 35px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
  }
}
</style>
