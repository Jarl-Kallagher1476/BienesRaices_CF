<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const auth = useAuthStore()

</script>

<template>
  <v-card elevation="3" max-width="1200" class="mx-auto">
    <v-layout>
      <v-app-bar color="blue-grey-darken-2">
        <template v-slot:prepend>
          <v-btn :to="{ name: 'home' }">
            Bienes Raices
          </v-btn>

        </template>

        <template v-slot:append>
          <div v-if="auth.isAuth">
            <v-btn :to="{ name: 'admin-properties' }">
              Admin Prop
            </v-btn>
            <v-btn @click ="auth.logout">
              Cerrar Sesión
            </v-btn>
          </div>

          <div v-else>
            <v-btn :to="{ name: 'home' }">
              Inicio
            </v-btn>
            <v-btn :to="{ name: 'login' }">
              Iniciar Sesión
            </v-btn>
          </div>

        </template>

      </v-app-bar>

      <v-main>
        <RouterView />

      </v-main>

    </v-layout>
  </v-card>
</template>
