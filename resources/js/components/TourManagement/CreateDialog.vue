<template>
    <v-dialog
        :value="showCreateDialog"
        @input="v => $emit('update:showCreateDialog', v)"
        max-width="540"
        overlay-opacity="0.2"
    >
        <v-card>
            <!-- Header -->
            <v-toolbar
                height="68"
                flat
                class="pr-1"
            >
                <v-icon
                    x-large
                    class="mr-3"
                >
                    tour
                </v-icon>
                <v-toolbar-title> Создание <span v-if="dialogType === 'Tour'">тура</span><span v-else>категории</span></v-toolbar-title>
            </v-toolbar>
            <v-divider/>
            <!-- Body -->
            <v-card-text class="pb-0">
                <v-form ref="form" v-model="valid">
                    <v-container class="pb-0">
                        <v-row>
                            <!-- Title -->
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-text-field
                                    label="Название"
                                    filled
                                    v-model.trim="tour.title"
                                    :rules="[
                                        v => !!v || 'Введите название'
                                    ]"
                                    required
                                />
                            </v-col>
                            <!-- Image -->
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-file-input
                                    label="Медиа"
                                    filled
                                    v-model="tour.image"
                                    accept="image/*"
                                    prepend-icon="add_a_photo"
                                    :rules="[
                                        v => !!v || 'Выберите картинку'
                                    ]"
                                    required
                                />
                            </v-col>
                            <!-- Description -->
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-textarea
                                    filled
                                    label="Описание"
                                    auto-grow
                                    v-model.trim="tour.description"
                                    :rules="[v => !!v || 'Введите описание']"
                                    required
                                />
                            </v-col>
                            <!-- Source Url -->
                            <v-col v-if="dialogType === 'Tour'" cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Ссылка на источник"
                                    filled
                                    v-model.trim="tour.source_url"
                                    :rules="[
                                        v => !!v || 'Введите ссылку на источник'
                                    ]"
                                    required
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <!-- Footer -->
            <v-card-actions class="px-9 pb-4">
                <v-spacer></v-spacer>
                <v-btn
                    class="px-7"
                    rounded
                    depressed
                    @click="clear"
                >
                    Очистить
                </v-btn>
                <v-btn
                    class="px-7"
                    rounded
                    depressed
                    :loading="loading"
                    :disabled="!valid"
                    @click="createTour"
                >
                    Подтвердить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: "CreateDialog",
    props: {
        // Tour or Section
        dialogType: String,
        showCreateDialog: Boolean,
    },
    data() {
        return {
            valid: null,
            loading: false,
            tour: {}
        }
    },
    computed: {
      tour_parent_id() {
          return this.$route.params.id === undefined ? null : this.$route.params.id
      }
    },
    methods: {
        ...mapActions('tours', {
            createTourAction: 'createTour'
        }),
        createTour() {
            let formData = new FormData();
            formData.append('parent_id', this.tour_parent_id);
            formData.append('title', this.tour.title);
            formData.append('description', this.tour.description);
            formData.append('image', this.tour.image);
            if (this.dialogType === "Tour")
                formData.append('isSection', "false");
            else formData.append('isSection', "true");

            if (this.dialogType === "Tour") {
                formData.append('source_url', this.tour.source_url);
            }

            this.loading = true;
            this.createTourAction(formData).then(() => {
                this.loading = false;
                this.$emit('update:showCreateDialog', false);
                this.clear();
            })
        },
        clear() {
            this.tour = {}
        }
    }
}
</script>

