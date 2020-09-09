<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        overlay-opacity="0.2"
    >
        <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                small
                icon
                dark
            >
                <v-icon small>my_location</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Выберите город</v-card-title>
            <v-divider></v-divider>
            <v-list>
                <v-list-item-group v-model="model_currentLocation">
                    <v-list-item
                        v-for="(item, i) in locations"
                        :key="i"
                    >
                        <v-list-item-icon>
                            <v-icon v-show="currentLocation === item">my_location</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-dialog>
</template>

<script>

import {mapState, mapMutations} from 'vuex'

export default {
    name: "LocationSelectDialog",
    data() {
        return {
            dialog: false
        }
    },
    computed: {
        ...mapState('locations', ['locations', 'currentLocation']),
        model_currentLocation: {
            get() {
                return this.currentLocation
            },
            set(value) {
                this.SET_LOCATION(this.locations[value]);
                this.dialog = false;
            }
        }
    },
    methods: {
        ...mapMutations('locations', ['SET_LOCATION']),
    },
}
</script>

