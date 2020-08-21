<template>
    <div>
        <!-- Control Panel -->
        <div class="mb-6 mt-4" v-if="$route.params.status === 'published'">
            <v-btn
                @click="showCreateDialog('Section')"
                class="mr-2"
                rounded
            >
                Добавить категорию
            </v-btn>
            <v-btn
                @click="showCreateDialog('Tour')"
                rounded
            >
                Добавить тур
            </v-btn>
        </div>
        <!-- Breadcrumbs -->
        <BreadcrumbsNavigation v-if="!firstLoading"/>
        <!-- Show tours -->
        <v-row
            dense
            class="mb-6"
        >
            <!-- If width < 600px cols = 12. Every third col = 12, other cols = 6 -->
            <v-col
                v-for="(tour,index) in tours"
                :key="tour.id"
                :cols="$vuetify.breakpoint.xs ? 12 : index % 3 ? 6 : 12"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        @click="cardClickBehavior(tour)"
                        style="cursor: pointer;"
                        class="overflow-hidden"
                    >
                        <!-- Default view -->
                        <v-img
                            transition="scale-transition"
                            origin="center center"
                            height="320px"
                            :src="tour.image_url"
                            :alt="tour.title"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        >
                            <v-fade-transition group>
                                <v-card-subtitle
                                    key="parent_name"
                                    v-if="!hover && $route.params.status !== 'published'"
                                    style="text-align: left; color: white"
                                    class="py-0 pl-5"
                                    v-text="tour.parent_name"
                                />
                                <v-card-title
                                    key="title"
                                    v-if="!hover"
                                    v-text="tour.title"
                                    class="display-1 pt-0 pl-5"
                                    style="word-break: break-word;"
                                />
                            </v-fade-transition>
                        </v-img>
                        <!-- Hover view -->
                        <v-fade-transition group>
                            <!-- Publish Tour -->
                            <v-btn
                                key="publish"
                                v-if="hover && $route.params.status === 'new'"
                                :loading="publishTourLoading"
                                fab
                                absolute
                                dark
                                top
                                right
                                style="top: 10px; right: 130px; z-index: 6"
                                @click.stop="publishTour(tour.id)"
                            >
                                <v-icon>check</v-icon>
                            </v-btn>
                            <!-- Restore Tour -->
                            <v-btn
                                key="restore"
                                v-if="hover && $route.params.status === 'deleted'"
                                :loading="restoreTourLoading"
                                fab
                                absolute
                                dark
                                top
                                right
                                style="top: 10px; right: 130px; z-index: 6"
                                @click.stop="restoreTour(tour.id)"
                            >
                                <v-icon>undo</v-icon>
                            </v-btn>
                            <!-- Destroy Tour -->
                            <v-btn
                                key="delete"
                                v-if="hover"
                                :loading="destroyTourLoading"
                                fab
                                absolute
                                dark
                                top
                                right
                                style="top: 10px; right: 10px; z-index: 6"
                                @click.stop="destroyTour(tour.id)"
                            >
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <!-- Edit Tour -->
                            <v-btn
                                key="edit"
                                v-if="hover"
                                fab
                                absolute
                                dark
                                top
                                right
                                style="top:10px; right: 70px; z-index: 6"
                                @click.stop="showEditDialog(tour.id)"
                            >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-overlay
                                key="overlay"
                                v-if="hover"
                                absolute
                                color="#036358"
                                class="px-8 text-center"
                            >
                                <div
                                    style="white-space: pre-wrap"
                                    v-text="tour.description"
                                    @click.stop
                                    class="title mx-auto"
                                />
                                <div
                                    v-if="tour.organization_name"
                                    v-text="tour.organization_name"
                                    @click.stop
                                    class="title mx-auto"
                                />
                                <div
                                    v-if="tour.organization_address"
                                    v-text="tour.organization_address"
                                    @click.stop
                                    class="title mx-auto"
                                />
                                <div
                                    v-if="tour.organization_phone"
                                    v-text="tour.organization_phone"
                                    @click.stop
                                    class="title mx-auto"
                                />
                                <div
                                    v-if="tour.organization_email"
                                    v-text="tour.organization_email"
                                    @click.stop
                                    class="title mx-auto"
                                />
                                <div
                                    v-if="tour.source_url"
                                    @click.stop
                                    v-text="tour.source_url"
                                    class="title mx-auto"
                                />
                            </v-overlay>
                        </v-fade-transition>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

        <!-- Dialogs -->
        <CreateDialog :showCreateDialog.sync="createDialog" :dialogType="createDialogType"/>
        <EditDialog v-if="editableTourId !== null" :showEditDialog.sync="editDialog"/>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation.vue"
import CreateDialog from "@/components/TourManagement/CreateDialog.vue"
import EditDialog from "@/components/TourManagement/EditDialog.vue"

export default {
    name: "TourManagement",
    components: {
        BreadcrumbsNavigation,
        CreateDialog,
        EditDialog
    },
    data() {
        return {
            firstLoading: true,
            editDialog: false,
            createDialog: false,
            createDialogType: "Tour",
            publishTourLoading: false,
            restoreTourLoading: false,
            destroyTourLoading: false,
        }
    },
    computed: {
        ...mapState('tours', [
            'tours',
            'editableTourId'
        ])
    },
    methods: {
        ...mapActions('tours', {
            getTours: 'getTours',
            publishTourAction: 'publishTour',
            restoreTourAction: 'restoreTour',
            destroyTourAction: 'destroyTour'
        }),
        ...mapMutations('tours', [
            'SET_EDITABLE_TOUR_ID'
        ]),
        // If the pressed card is a section, open children section, else open source_url on new tab
        cardClickBehavior(tour) {
            if (this.$route.params.status === 'published') {
                if (tour.isSection) {
                    this.$router.push({name: 'TourManagement', params: {status: this.$route.params.status, id: tour.id}})
                } else window.open(tour.source_url)
            }
        },
        // card actions
        publishTour(tourId) {
            this.publishTourLoading = true;
            this.publishTourAction(tourId).finally(() => {
                this.publishTourLoading = false;
            })
        },
        restoreTour(tourId) {
            this.restoreTourLoading = true;
            this.restoreTourAction(tourId).finally(() => {
                this.restoreTourLoading = false;
            })
        },
        destroyTour(tourId) {
            if (this.$route.params.status === 'published') {
                this.destroyTourLoading = true;
                this.destroyTourAction(tourId).finally(() => {
                    this.destroyTourLoading = false;
                })
            } else if (confirm("Вы действительно хотите безвозвратно удалить туристический объект? Вложенные тур. объекты так же будут удалены.")) {
                this.destroyTourLoading = true;
                this.destroyTourAction(tourId).finally(() => {
                    this.destroyTourLoading = false;
                })
            }
        },
        // dialogs
        showEditDialog(editableTourId) {
            this.SET_EDITABLE_TOUR_ID(editableTourId);
            this.editDialog = true;
        },
        showCreateDialog(dialogType) {
            this.createDialogType = dialogType;
            this.createDialog = true;
        },
    },
    // get tours via API
    created() {
        this.getTours({status: this.$route.params.status, parent_id: this.$route.params.id}).then(() => {
            this.firstLoading = false;
        })
    },
    // get tours via API after route.param changes
    beforeRouteUpdate(to, from, next) {
        this.getTours({status: to.params.status, parent_id: to.params.id}).then(() => {
            next()
        });
    }
}
</script>


