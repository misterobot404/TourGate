<template>
    <div>
        <!-- Control Panel -->
        <div class="mb-4">
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
                :key="tour.title"
                :cols="$vuetify.breakpoint.xs ? 12 : index % 3 ? 6 : 12"
                class="text-center"
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
                            <v-fade-transition>
                                <v-card-title
                                    v-if="!hover"
                                    v-text="tour.title"
                                    class="display-1"
                                />
                            </v-fade-transition>
                        </v-img>
                        <!-- Hover view -->
                        <v-fade-transition group>
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
                                class="px-8"
                            >
                                <span
                                    style="white-space: pre-wrap"
                                    v-text="tour.description"
                                    class="title mx-auto"
                                />
                            </v-overlay>
                        </v-fade-transition>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

        <!-- Dialogs -->
        <CreateDialog :showCreateDialog.sync="createDialog" :dialogType="createDialogType" />
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
            destroyTourLoading: false
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
            destroyTourAction: 'destroyTour'
        }),
        ...mapMutations('tours', [
            'SET_EDITABLE_TOUR_ID'
        ]),
        // If the pressed card is a section, open children section, else open source_url on new tab
        cardClickBehavior(tour) {
            tour.isSection ? this.$router.push({name: 'TourManagement', params: {id: tour.id}}) : window.open(tour.source_url);
        },
        showEditDialog(editableTourId) {
            this.SET_EDITABLE_TOUR_ID(editableTourId);
            this.editDialog = true;
        },
        showCreateDialog(dialogType) {
            this.createDialogType = dialogType;
            this.createDialog = true;
        },
        destroyTour(tourId) {
            this.destroyTourLoading = true;
            this.destroyTourAction(tourId).then(() => {
                this.destroyTourLoading = false;
            })
        }
    },
    // get tours via API
    created() {
        this.getTours(this.$route.params.id).then(() => {
            this.firstLoading = false;
        })
    },
    // get tours via API after route.param changes
    beforeRouteUpdate(to, from, next) {
        this.getTours(to.params.id).then(() => {
            next()
        });
    }
}
</script>


