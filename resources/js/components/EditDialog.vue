<template>
    <div>
        <v-dialog
            :value="showEditDialog"
            @input="v => $emit('update:showEditDialog', v)"
            :max-width="!editableTour.isSection ? 1280 : 540"
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
                            <v-row no-gutters>
                                <v-col>
                                    <v-row>
                                        <v-card-subtitle class="pb-1 pt-3">Информация о {{ !editableTour.isSection ? 'туре' : 'категории' }}*</v-card-subtitle>
                                        <!-- title -->
                                        <v-col cols="12" class="pb-0 pt-3">
                                            <v-text-field
                                                label="Название*"
                                                filled
                                                counter="40"
                                                v-model.trim="editableTour.title"
                                                :rules="[ v => !!v || 'Введите название' ]"
                                                required
                                            />
                                        </v-col>
                                        <!-- Image -->
                                        <v-col cols="12" class="pb-0 pt-1">
                                            <div v-if="editableTour.image_url" class="d-flex mb-8">
                                                <v-text-field
                                                    :value="editableTour.image_url"
                                                    prepend-icon="add_a_photo"
                                                    readonly
                                                    hide-details
                                                    label="Медиа"
                                                    filled
                                                />
                                                <v-icon class="ml-2" @click="editableTour.image_url = null">
                                                    close
                                                </v-icon>
                                            </div>
                                            <v-file-input
                                                v-else
                                                label="Медиа"
                                                filled
                                                v-model="editableTour.image"
                                                :rules="[
                                            v => !!v || 'Выберите картинку',
                                            v => (!!v && v.size < 4e6) || 'Выберите картинку меньше 4 Mб'
                                        ]"
                                                accept="image/*"
                                                prepend-icon="add_a_photo"
                                                required
                                            />
                                        </v-col>
                                        <!-- description -->
                                        <v-col cols="12" class="pb-0 pt-1">
                                            <v-textarea
                                                filled
                                                label="Описание*"
                                                auto-grow
                                                counter="120"
                                                v-model.trim="editableTour.description"
                                                :rules="[v => !!v || 'Введите описание']"
                                                required
                                            />
                                        </v-col>
                                        <!-- address -->
                                        <v-col
                                            v-if="!editableTour.isSection"
                                            cols="12"
                                            class="pb-0 pt-1"
                                        >
                                            <v-text-field
                                                label="Месторасположение тур. объекта*"
                                                filled
                                                counter="40"
                                                v-model.trim="editableTour.address"
                                                :rules="[ v => !!v || 'Введите месторасположение тур. объекта' ]"
                                                required
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <template v-if="!editableTour.isSection">
                                    <v-divider class="mx-3" vertical/>
                                    <v-col>
                                        <v-row>
                                            <v-card-subtitle class="pb-1 pt-3">Информация об организации</v-card-subtitle>
                                            <!-- organization_name -->
                                            <v-col cols="12" class="pb-0 pt-3">
                                                <v-text-field
                                                    label="Название организации"
                                                    filled
                                                    v-model.trim="editableTour.organization_name"
                                                    required
                                                />
                                            </v-col>
                                            <!-- organization_phone -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Телефон организации"
                                                    filled
                                                    v-model.trim="editableTour.organization_phone"
                                                    required
                                                />
                                            </v-col>
                                            <!-- organization_email -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Эл. почта организации"
                                                    filled
                                                    v-model.trim="editableTour.organization_email"
                                                    required
                                                />
                                            </v-col>
                                            <!-- organization_address -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Адрес организации"
                                                    filled
                                                    v-model.trim="editableTour.organization_address"
                                                    required
                                                />
                                            </v-col>
                                            <!-- source_url -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Ссылка на источник"
                                                    filled
                                                    v-model.trim="editableTour.source_url"
                                                    required
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-divider class="mx-3" vertical/>
                                    <v-col cols="4">
                                        <v-row>
                                            <v-card-subtitle class="pb-1 pt-3">Информация о заявителе</v-card-subtitle>
                                            <!-- author -->
                                            <v-col cols="12" class="pb-0 pt-3">
                                                <v-text-field
                                                    disabled
                                                    label="Автор"
                                                    filled
                                                    v-model.trim="editableTour.author"
                                                    required
                                                />
                                            </v-col>
                                            <!-- author_phone -->
                                            <v-col cols="12" class="pb-0 pt-3">
                                                <v-text-field
                                                    disabled
                                                    label="Телефон заявителя"
                                                    filled
                                                    v-model.trim="editableTour.author_phone"
                                                    required
                                                />
                                            </v-col>
                                            <!-- author_email -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    disabled
                                                    label="Эл. почта заявителя"
                                                    filled
                                                    v-model.trim="editableTour.author_email"
                                                    required
                                                />
                                            </v-col>
                                            <!-- location -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-menu offset-y>
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            label="Локация тур. обьекта"
                                                            readonly
                                                            filled
                                                            hide-details
                                                            style="cursor: pointer !important;"
                                                            :value="editableTour.location"
                                                            v-on="on"
                                                        />
                                                    </template>
                                                    <v-list>
                                                        <v-list-item
                                                            v-for="(location, index) in locations"
                                                            :key="index"
                                                            @click="editableTour.location = location"
                                                        >
                                                            <v-list-item-title v-text="location"/>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                            <!-- author_doc -->
                                            <v-col cols="12" class="pb-0 pt-8">
                                                <v-btn
                                                    @click="getFiles"
                                                    :disabled="!editableTour.author_doc"
                                                    block
                                                    large
                                                    depressed
                                                >
                                                    <v-icon class="mr-2">
                                                        description
                                                    </v-icon>
                                                    Документы
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </template>
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
                        @click="$emit('update:showEditDialog', false); getEditableTourClone()"
                    >
                        Отмена
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

        <v-snackbar
            v-model="snackbar"
            style="opacity: 0.9;"
            color="primary"
            :timeout="3000"
        >
            Туристический объект изменён.
        </v-snackbar>
    </div>
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
            editableTour: null,
            snackbar: false,
        }
    },
    computed: {
        ...mapState('tours', [
            'tours',
            'editableTourId'
        ]),
        ...mapState('locations', [
            'locations'
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
            updateTourAction: 'updateTour',
            getFilesActions: 'getFiles',
        }),
        getEditableTourClone() {
            this.editableTour = Object.assign({}, this.tours.find(obj => obj.id === this.editableTourId));
            if (this.editableTour.author_doc) {
                this.editableTour.author_doc.forEach(function (part, index) {
                    this[index] = this[index].replace(/^.*[\\\/]/, '');
                }, this.editableTour.author_doc); // use arr as this
            }
        },
        updateTour() {
            let formData = new FormData();
            formData.append('title', this.editableTour.title);
            formData.append('description', this.editableTour.description);
            formData.append('image', this.editableTour.image);

            if (!this.editableTour.isSection) {
                if (this.editableTour.source_url) formData.append('source_url', this.editableTour.source_url);
                if (this.editableTour.address) formData.append('address', this.editableTour.address);
                if (this.editableTour.organization_name) formData.append('organization_name', this.editableTour.organization_name);
                if (this.editableTour.organization_phone) formData.append('organization_phone', this.editableTour.organization_phone);
                if (this.editableTour.organization_email) formData.append('organization_email', this.editableTour.organization_email);
                if (this.editableTour.organization_address) formData.append('organization_address', this.editableTour.organization_address);
                formData.append('location', this.editableTour.location);
            }

            let payload = {
                tourId: this.editableTour.id,
                tour: formData
            }

            this.loading = true;
            this.updateTourAction(payload)
                .then(() => {
                    this.$emit('update:showEditDialog', false);
                    this.snackbar = true;
                })
                .finally(() => {
                    this.loading = false;
                })

        },
        getFiles() {
            this.getFilesActions()
        }
    }
}
</script>

