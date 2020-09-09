<template>
    <v-dialog
        v-model="dialog"
        max-width="500"
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
            <v-card-text>
                <v-card-title>Выберите город</v-card-title>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item-group v-model="model_currentLocation">
                        <v-list-item
                            v-for="(location, i) in locations"
                            :key="i"
                        >
                            <v-list-item-icon>
                                <v-icon v-show="currentLocation === location">my_location</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title v-text="location"/>
                            <v-spacer/>
                            <v-btn
                                @click.stop="destroyLocation(location); newLocation = ''"
                                large
                                icon
                            >
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-list-item>
                    </v-list-item-group>
                    <div class="d-flex align-center mt-2">
                        <v-text-field
                            v-model="newLocation"
                            label="Добавить локацию"
                            hide-details
                            filled
                        />
                        <v-btn
                            @click="createLocation(newLocation); newLocation = ''"
                            :disabled="!newLocation || locations.includes(newLocation)"
                            icon
                        >
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                    </div>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

import {mapMutations, mapState, mapActions} from 'vuex'

export default {
    name: "EditLocationsDialog",
    data() {
        return {
            dialog: false,
            newLocation: ""
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
        ...mapActions('locations', [
            'createLocation',
            'destroyLocation'
        ])
    },
}
</script>

