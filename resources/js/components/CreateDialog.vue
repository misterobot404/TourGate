<template>
    <div>
        <v-dialog
            v-model="showDialog"
            :max-width="dialogType === 'Tour' ? 1280 : 540"
            overlay-opacity="0.2"
        >
            <!-- dialog activator -->
            <template v-slot:activator="{ on }">
                <!-- if -->
                <template v-if="$route.name === 'TourManagement'">
                    <v-btn
                        v-on="on"
                        @click="dialogType = 'Section'"
                        class="mr-4"
                        rounded
                    >
                        Добавить категорию
                    </v-btn>
                    <v-btn
                        v-on="on"
                        @click="dialogType = 'Tour'"
                        rounded
                    >
                        Добавить тур
                    </v-btn>
                </template>
                <!-- else if -->
                <v-btn
                    v-else-if="$route.name === 'Tours'"
                    v-on="on"
                    @click="dialogType = 'Tour'"
                    large
                    rounded
                    class="mt-2 v-btn--active"
                    text
                >
                    Добавить
                </v-btn>
            </template>
            <!-- dialog content -->
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
                            <v-row no-gutters>
                                <v-col>
                                    <v-row>
                                        <v-card-subtitle class="pb-1 pt-3">Информация о {{ dialogType === 'Tour' ? 'туре' : 'категории' }}*</v-card-subtitle>
                                        <!-- title -->
                                        <v-col cols="12" class="pb-0 pt-3">
                                            <v-text-field
                                                label="Название*"
                                                filled
                                                v-model.trim="tour.title"
                                                :rules="[ v => !!v || 'Введите название' ]"
                                                required
                                            />
                                        </v-col>
                                        <!-- image -->
                                        <v-col cols="12" class="pb-0 pt-1">
                                            <v-file-input
                                                label="Медиа*"
                                                filled
                                                v-model="tour.image"
                                                accept="image/*"
                                                prepend-icon="add_a_photo"
                                                :rules="[
                                            v => !!v || 'Выберите картинку',
                                            v => (!!v && v.size < 4e6) || 'Выберите картинку меньше 4 Mб'
                                        ]"
                                                required
                                            />
                                        </v-col>
                                        <!-- description -->
                                        <v-col cols="12" class="pb-0 pt-1">
                                            <v-textarea
                                                filled
                                                label="Описание*"
                                                auto-grow
                                                v-model.trim="tour.description"
                                                :rules="[v => !!v || 'Введите описание']"
                                                required
                                            />
                                        </v-col>
                                        <!-- address -->
                                        <v-col
                                            v-if="dialogType === 'Tour'"
                                            cols="12"
                                            class="pb-0 pt-1"
                                        >
                                            <v-text-field
                                                label="Месторасположение тур. объекта*"
                                                filled
                                                v-model.trim="tour.address"
                                                :rules="[ v => !!v || 'Введите месторасположение тур. объекта' ]"
                                                required
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <template v-if="dialogType === 'Tour'">
                                    <v-divider class="mx-3" vertical/>
                                    <v-col>
                                        <v-row>
                                            <v-card-subtitle class="pb-1 pt-3">Информация об организации</v-card-subtitle>
                                            <!-- organization_name -->
                                            <v-col cols="12" class="pb-0 pt-3">
                                                <v-text-field
                                                    label="Название организации"
                                                    filled
                                                    v-model.trim="tour.organization_name"
                                                    required
                                                />
                                            </v-col>
                                            <!-- organization_phone -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Телефон организации"
                                                    filled
                                                    v-model.trim="tour.organization_phone"
                                                    required
                                                />
                                            </v-col>
                                            <!-- organization_email -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Эл. почта организации"
                                                    filled
                                                    v-model.trim="tour.organization_email"
                                                    required
                                                />
                                            </v-col>
                                            <!-- organization_address -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Адрес организации"
                                                    filled
                                                    v-model.trim="tour.organization_address"
                                                    required
                                                />
                                            </v-col>
                                            <!-- source_url -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Ссылка на источник"
                                                    filled
                                                    v-model.trim="tour.source_url"
                                                    required
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-divider class="mx-3" vertical/>
                                    <v-col>
                                        <v-row>
                                            <v-card-subtitle class="pb-1 pt-3">Информация о заявителе</v-card-subtitle>
                                            <!-- author_phone -->
                                            <v-col cols="12" class="pb-0 pt-3">
                                                <v-text-field
                                                    label="Телефон заявителя"
                                                    filled
                                                    v-model.trim="tour.author_phone"
                                                    required
                                                />
                                            </v-col>
                                            <!-- author_email -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-text-field
                                                    label="Эл. почта заявителя"
                                                    filled
                                                    v-model.trim="tour.author_email"
                                                    required
                                                />
                                            </v-col>
                                            <!-- author_doc -->
                                            <v-col cols="12" class="pb-0 pt-1">
                                                <v-file-input
                                                    label="Документы, подтверждающие легитимность заявителя"
                                                    filled
                                                    v-model="tour.author_doc"
                                                    chips
                                                    multiple
                                                    prepend-icon="post_add"
                                                    required
                                                />
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
                        @click="clear"
                    >
                        Отмена
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

        <v-snackbar
            v-model="snackbar"
            style="opacity: 0.9;"
            color="primary"
            :timeout="3000"
        >
            Туристический объект добавлен в заявки.
        </v-snackbar>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: "CreateDialog",
    data() {
        return {
            // "Tour" or "Section"
            showDialog: false,
            dialogType: null,
            valid: null,
            loading: false,
            tour: {},
            snackbar: false
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

            // СИСТЕМНЫЕ
            formData.append('parent_id', this.tour_parent_id);
            if (this.dialogType === "Tour")
                formData.append('isSection', "false");
            else formData.append('isSection', "true");
            // ОПИСАНИЕ ОБЪЕКТОВ ИЛИ СЕКЦИЙ
            formData.append('title', this.tour.title);
            formData.append('description', this.tour.description);
            formData.append('image', this.tour.image);
            if (this.dialogType === "Tour") {
                if (this.tour.source_url) formData.append('source_url', this.tour.source_url);
                if (this.tour.address) formData.append('address', this.tour.address);
                if (this.tour.organization_name) formData.append('organization_name', this.tour.organization_name);
                if (this.tour.organization_phone) formData.append('organization_phone', this.tour.organization_phone);
                if (this.tour.organization_email) formData.append('organization_email', this.tour.organization_email);
                if (this.tour.organization_address) formData.append('organization_address', this.tour.organization_address);
                if (this.tour.author_phone) formData.append('author_phone', this.tour.author_phone);
                if (this.tour.author_email) formData.append('author_email', this.tour.author_email);

                if (this.tour.author_doc) {
                    for (let i = 0; i < this.tour.author_doc.length; i++) {
                        formData.append('author_doc[]', this.tour.author_doc[i]);
                    }
                }
            }

            this.loading = true;
            this.createTourAction(formData)
                .then(() => {
                    this.clear();
                    this.snackbar = true;
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        clear() {
            this.showDialog = false;
            this.tour = {};
            this.$refs.form.reset();
        }
    }
}
</script>

