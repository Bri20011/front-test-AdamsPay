<template>
  <v-container>
    <v-row class="d-flex d-justify-start">
      <v-col cols="12">
        <v-container color="white" class="my-container fill-height ">
          <h1 class="header-text">
            <v-icon color="black" size="64">mdi-android-studio</v-icon>
            DON ONOFRE
          </h1>
          <v-row align="center" justify="end">
           
            <v-col cols="12" class="text-center">
             
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card class="mb-4">
          <v-img :src="product.imagen" class="white--text align-end" height="200px"
            @error="handleImageError(index)"></v-img>
          <v-card-title>{{ product.nombre }}</v-card-title>
          <v-card-text>
            <span>{{ product.descripcion }}</span>
          </v-card-text>
          <v-card-actions>
            <span class="ml-auto">Gs. {{ formatPrice(product.precio) }}</span>
          </v-card-actions>
          <v-btn color="success" @click="openDialog(product)">Pagar</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Confirmar Pago</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="paymentDetails.descripcion" label="Descripcion" readonly
              variant="outlined"></v-text-field>
            <v-text-field v-model="paymentDetails.nombre" label="Nombre" readonly variant="outlined"></v-text-field>
            <v-text-field v-model="paymentDetails.precio" label="Precio" readonly variant="outlined"></v-text-field>
            <v-text-field v-model="paymentDetails.cantidad" label="Cantidad" variant="outlined"
              type="number"></v-text-field>
            <v-text-field v-model="paymentDetails.nombreApellido" label="Nombre y Apellido"
              variant="outlined"></v-text-field>
            <v-text-field v-model="paymentDetails.razonSocial" label="Razón Social" variant="outlined"></v-text-field>
            <v-text-field v-model="paymentDetails.rucCi" label="RUC/CI" variant="outlined"></v-text-field>
            <v-text-field v-model="paymentDetails.celular" label="Celular" variant="outlined"></v-text-field>
            <!-- <v-text-field v-model="paymentDetails.idProducto" label="ID del Producto" type="hidden" readonly></v-text-field> -->

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="confirmPayment">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);
const dialog = ref(false);
const paymentDetails = ref({
  descripcion: '',
  nombre: '',
  precio: '',
  cantidad: '',
  nombreApellido: '',
  razonSocial: '',
  rucCi: '',
  celular: '',
  idProducto: ''
});

function handleImageError(index) {
  // Manejar errores de carga de imagen
}

function obtenerProductos() {
  fetch(import.meta.env.VITE_URL_API + '/api/items', {
    headers: {
      method: 'GET',
    }
  }).then(res => res.json()).then(resultado => {
    products.value = resultado.body;
    console.log('AQUI', resultado.body);
  });
}

onMounted(() => {
  obtenerProductos();
});

function formatPrice(value) {
  return value.toLocaleString('es-PY');
}

function initiatePayment(details) {
  const paymentDetails = details

  fetch(import.meta.env.VITE_URL_API + '/api/pagos/iniciar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentDetails)
  })
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      window.location.href = data.body.payUrl;
    })
    .catch(error => {
      console.error('Error initiating payment', error);
    });
}

function openDialog(product) {
  paymentDetails.value.descripcion = product.descripcion;
  paymentDetails.value.nombre = product.nombre;
  paymentDetails.value.precio = formatPrice(product.precio);
  paymentDetails.idProducto = product.id;
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

function confirmPayment() {
  const details = {
    precio: parseInt(paymentDetails.value.precio.replace(/\./g, '')),
    description: paymentDetails.value.descripcion,
    amount: paymentDetails.value.cantidad,
    cliente: paymentDetails.value.nombreApellido,
    razon_social: paymentDetails.value.razonSocial,
    ruc: paymentDetails.value.rucCi,
    phone: paymentDetails.value.celular,
    items_id: paymentDetails.idProducto
  };

  initiatePayment(details);

  dialog.value = false;
}
</script>

<style scoped>

</style>