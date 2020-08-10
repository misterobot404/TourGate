<template>
    <v-dialog v-model="dialog"
              max-width="460">
        <!-- Open dialog button -->
        <template v-slot:activator="{ on }">
            <v-btn
                large
                rounded
                class="mt-2 v-btn--active"
                text
                v-on="on"
            >
                Добавить
            </v-btn>
        </template>
        <!-- Dialog -->
        <v-card>
            <!-- Header -->
            <v-toolbar
                height="68"
                flat
                class="pr-1"
            >
                <v-icon
                    x-large
                    class="mr-2"
                    color="green darken-2"
                >
                    add_location
                </v-icon>
                <v-toolbar-title> Добавление места </v-toolbar-title>
                <v-spacer/>
                <v-btn
                    icon
                    @click="clearField(); dialog = false;"
                >
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider/>
            <!-- Body -->
            <v-card-text class="pb-0">
                <v-form ref="form">
                    <v-container class="pb-0">
                        <v-alert
                            class="my-2"
                            v-model="successful"
                            text
                            type="success"
                            prominent
                            color="green darken-2"
                        >
                            Спасибо! Место будет добавлено после модерации.
                        </v-alert>
                        <v-row>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-text-field
                                    label="Название"
                                    filled
                                    color="green darken-2"
                                    v-model.trim="name"
                                    :rules="[
                                        v => !!v || 'Введите название',
                                        v => tours === null || tours.find(map => map.title === v) === undefined || 'Это название уже используется'
                                    ]"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-file-input
                                    label="Медиа"
                                    color="green darken-3"
                                    filled
                                    v-model="src"
                                    accept="image/*"
                                    prepend-icon="add_a_photo"
                                    :rules="[
                                        v => !!v || 'Добавьте картинку'
                                    ]"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-textarea
                                    filled
                                    color="green darken-2"
                                    label="Описание"
                                    v-model.trim="description"
                                    :rules="[v => !!v || 'Введите описание']"
                                    required
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <!-- Footer -->
            <v-card-actions class="px-9 pb-4">
                <v-btn
                    text
                    @click="clearField"
                >
                    Очистить
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="px-7"
                    color="green darken-1"
                    outlined
                    rounded
                    :loading="loading"
                    @click="createMap"
                >
                    Добавить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "CreateMapDialog",
        data() {
            return {
                dialog: false,
                loading: false,
                name: "",
                description: "",
                src: null,
                successful: false
            }
        },
        computed: {
            ...mapState('tours', [
                'tours'
            ])
        },
        methods: {
            clearField() {
                this.$refs.form.reset();
                this.successful = false;
            },
            createMap() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    this.successful = false;
                    setTimeout(() => {
                        this.loading = false;
                        this.successful = true;
                    }, 1500);
                }
            },
        }
    }
</script>

