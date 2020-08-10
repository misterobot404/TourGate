<template>
    <v-dialog
        :value="showEditDialog"
        @input="v => $emit('update:showEditDialog', v)"
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
                    edit
                </v-icon>
                <v-toolbar-title> Редактирование <span v-if="editableTour.isSection">категории</span><span v-else>тура</span></v-toolbar-title>
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
                                    v-model.trim="editableTour.title"
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
                                    v-model="editableTour.image"
                                    accept="image/*"
                                    prepend-icon="add_a_photo"
                                    required
                                />
                            </v-col>
                            <!-- Description -->
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-textarea
                                    filled
                                    label="Описание"
                                    auto-grow
                                    v-model.trim="editableTour.description"
                                    :rules="[v => !!v || 'Введите описание']"
                                    required
                                />
                            </v-col>
                            <!-- Source Url -->
                            <v-col v-if="!editableTour.isSection" cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Ссылка на источник"
                                    filled
                                    v-model.trim="editableTour.source_url"
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
                    @click="getEditableTourClone"
                >
                    Сброс
                </v-btn>
                <v-btn
                    class="px-7"
                    rounded
                    depressed
                    :loading="loading"
                    :disabled="!valid"
                    @click="updateTour"
                >
                    Подтвердить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: "EditDialog",
    props: {
        showEditDialog: Boolean
    },
    data() {
        return {
            valid: null,
            loading: false,
            editableTour: null
        }
    },
    computed: {
        ...mapState('tours', [
            'tours',
            'editableTourId'
        ])
    },
    watch: {
        editableTourId: {
            immediate: true,
            handler: 'getEditableTourClone'
        }
    },
    methods: {
        ...mapActions('tours', {
            updateTourAction: 'updateTour'
        }),
        getEditableTourClone() {
            this.editableTour = Object.assign({}, this.tours.find(obj => obj.id === this.editableTourId));
        },
        updateTour() {
            let formData = new FormData();
            formData.append('title', this.editableTour.title);
            formData.append('description', this.editableTour.description);
            formData.append('image', this.editableTour.image);

            if (!this.editableTour.isSection) {
                formData.append('source_url', this.editableTour.source_url);
            }

            let payload = {
                tourId: this.editableTour.id,
                tour: formData
            }

            this.loading = true;
            this.updateTourAction(payload).then(() => {
                this.loading = false;
                this.$emit('update:showEditDialog', false)
            })
        }
    }
}
</script>

