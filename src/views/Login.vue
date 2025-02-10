<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Titulo from "@/components/Intruduction.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  try {
    const response = await axios.post("http://localhost/api/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", response.data.token);
    router.push("/dashboard"); // Redirige tras el login
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Error en login";
  }
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <Titulo msg="REBUS" />

      <nav>

      </nav>
    </div>
  </header>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 8px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
</style>

