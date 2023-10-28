<script setup>
import userProperties from '../../composables/useProperties'
import { propertyPrice } from '../../helpers';

const { propertiesColletion} = userProperties()
</script>

<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">
        Panel de Administración
    </h2>

    <v-btn color="blue-grey-darken-2" variant="flat" :to="{ name: 'new-property' }" class="ma-2">
        Nueva Propiedad
    </v-btn>

    <v-card class="mx-auto mt-10" flat>
        <v-list>
            <v-list-item v-for="property in propertiesColletion" :key="property.id" border>
                <template v-slot:prepend>
                    <v-list-item-media :start="true">
                        <img width="180" :src="property.imagen" alt="imagen propiedad">
                    </v-list-item-media>
                </template>
                
                <v-list-item-title> {{ property.titulo }} </v-list-item-title>

                <v-list-item-subtitle> {{ propertyPrice(property.precio)}} </v-list-item-subtitle>

                <template v-slot:append>
                    <v-btn color="info" class="mr-2" :to="{name:'edit-property', params: {id: property.id } }" >
                        Editar
                    </v-btn>

                    <v-btn color="red-darken-3" >
                        Eliminar
                    </v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>

