<script setup>
    defineProps({
        property: {
            type: Object
        },
        price: {
            type: Function
        }
    })
</script>


<template>
    <v-col
        cols="12"
        md="4"
    >
        <v-card>
            <v-img :src="property.imagen" height="250" cover />

            <v-card-title class="font-weight-bold">
                {{ property.titulo }}
            </v-card-title>

            <v-card-text class="text-truncate">
                {{ property.descripcion }}
            </v-card-text>

            <v-card-text class="text-h5">
                Precio: {{price (property.precio) }}
            </v-card-text>

            <template v-slot:actions>
                <v-btn
                    block
                    color="blue-grey-lighten-1"
                    variant="flat"
                    :to="{name: 'property', params: { id: property.id } }"
                >
                    Más Información
                </v-btn>
            </template>
        </v-card>
    </v-col>
</template>

