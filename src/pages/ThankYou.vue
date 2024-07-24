<template>
    <v-container class="d-flex flex-column align-center justify-center" fill-height>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-icon large color="green">mdi-check-circle</v-icon>
          <h1 class="mt-4">¡Gracias por su compra!</h1>
          <v-divider class="my-4"></v-divider>
          <v-card class="pa-4" elevation="2">
            <v-card-title>Detalles de su Compra</v-card-title>
            <v-card-subtitle>
              <p>Su transacción ha sido procesada con éxito.</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="blue" @click="goHome">Volver a Inicio</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goHome() {
    router.push('/');
  }
  </script>
  
  <style scoped>
  /* Estilos personalizados pueden ser añadidos aquí */
  </style>