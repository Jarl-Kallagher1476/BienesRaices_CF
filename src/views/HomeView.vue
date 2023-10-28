<script setup>
  import userProperties from '../composables/useProperties';
  import Property from '../components/Property.vue'
  import { propertyPrice } from '../helpers';
  const { propertiesColletion } = userProperties()

</script>

<template>
  <main>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras Propiedades</h1>

    <v-card flat class="py-15 mx-5"> 
      <v-row>
        <Property
          v-for="property in propertiesColletion"
          :key="property.id"
          :property="property"
          :price="propertyPrice"
        />
      </v-row>

    </v-card>
  </main>
</template>
