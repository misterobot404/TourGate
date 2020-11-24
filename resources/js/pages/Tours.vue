<template>
    <div>
        <!-- Navigation panel -->
        <BreadcrumbsNavigation v-if="!firstLoading"/>
        <!-- Tours -->
        <v-row
            dense
            class="mt-2 mb-8"
        >
            <v-col
                v-for="(tour,index) in toursByLocation"
                :key="tour.id"
                :cols="$vuetify.breakpoint.xs ? 12 : index % 3 ? 6 : 12"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        @click="cardClick(tour)"
                        class="overflow-hidden"
                        height="320px"
                    >
                        <!-- Default view -->
                        <v-img
                            transition="scale-transition"
                            origin="center center"
                            height="320px"
                            :src="tour.image_url"
                            :alt="tour.title"
                            :class="{ 'card-img-scale': !tour.isSection }"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        />
                        <v-fade-transition
                            class="white--text"
                            style="position: absolute; bottom: 0; pointer-events: none"
                            group
                        >
                            <template v-if="tour.isSection ? !hover : tour.id !== showTourId">
                                <v-card-subtitle
                                    key="parent_name"
                                    v-if="$route.params.status !== 'published'"
                                    style="text-align: left; color: white"
                                    class="py-0 pl-5"
                                    v-text="tour.parent_name"
                                />
                                <v-card-title
                                    key="title"
                                    v-text="tour.title"
                                    class="text-sm-h4 text-h5 pt-0 pl-5"
                                    style="word-break: break-word;"
                                />
                            </template>
                        </v-fade-transition>
                        <!-- Hover view -->
                        <v-fade-transition group>
                            <template v-if="$route.name === 'TourManagement'">
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
                            </template>
                            <v-overlay
                                v-if="tour.isSection ? hover : tour.id === showTourId"
                                key="overlay"
                                absolute
                                color="#036358"
                                class="text-center"
                                style="padding: 0 10%"
                            >
                                <div
                                    style="white-space: pre-wrap; font-weight: 500;"
                                    v-text="tour.description"
                                    :style="$vuetify.breakpoint.xs ? {'line-height': '1.75rem'} : {'line-height': '2rem'}"
                                    class="text-sm-h5 text-h6"
                                />
                                <div class="mt-3 text-sm-body-1 text-body-2" style="opacity: 0.9">
                                    <div v-if="tour.organization_name" v-text="tour.organization_name"/>
                                    <div v-if="tour.organization_address" v-text="tour.organization_address"/>
                                    <div v-if="tour.organization_phone" v-text="tour.organization_phone"/>
                                    <div v-if="tour.organization_email" v-text="tour.organization_email"/>
                                </div>
                            </v-overlay>
                            <v-btn
                                v-if="tour.source_url && tour.id === showTourId"
                                key="source_url"
                                @click="openTourSourceUrl(tour.source_url)"
                                fab
                                absolute
                                small
                                style="bottom: 20px; right: 20px; z-index: 6"
                            >
                                <v-icon>play_arrow</v-icon>
                            </v-btn>
                        </v-fade-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <!-- Add -->
            <v-col
                v-if="$route.name === 'Tours' && !firstLoading"
                :cols="$vuetify.breakpoint.xs ? 12 : (tours.length + 1) % 3 ? 12 : 6"
                class="text-center"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        style="background: none"
                        class="overflow-hidden"
                        flat
                    >
                        <div style="height: 320px; background: linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3))"/>
                        <v-overlay
                            absolute
                            opacity="0.2"
                            color="#036358"
                        >
                            <div class="title mx-auto" style="max-width: 70%">
                                Поделитесь интересным местом с другими!
                            </div>
                            <CreateDialog/>
                        </v-overlay>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
        <!-- Edit tour / section -->
        <EditDialog v-if="editableTourId" :showEditDialog.sync="editDialog"/>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation.vue"
import CreateDialog from "@/components/CreateDialog"
import EditDialog from "@/components/EditDialog.vue"

export default {
    name: "Tours",
    components: {
        BreadcrumbsNavigation,
        CreateDialog,
        EditDialog
    },
    data() {
        return {
            firstLoading: true,
            showTourId: null,
            editDialog: false,
            publishTourLoading: false,
            restoreTourLoading: false,
            destroyTourLoading: false
        }
    },
    computed: {
        ...mapState('tours', [
            'tours',
            'editableTourId'
        ]),
        ...mapState('locations', ['currentLocation',]),
        toursByLocation() {
            return this.tours.filter(tour => tour.location === this.currentLocation || tour.location === null)
        },
        sectionNotFound() {
            return this.tours.find(element => element.isSection === true) === undefined;
        }
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
        cardClick(tour) {
            if (tour.isSection) {
                this.$router.push({name: this.$route.name, params: {status: this.$route.params.status, id: tour.id}})
            } else this.showTourId = tour.id
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
            if (this.$route.params.status === 'deleted' && !confirm("Вы действительно хотите безвозвратно удалить туристический объект? Вложенные тур. объекты так же будут удалены."))
                return;
            // deleted
            this.destroyTourLoading = true;
            this.destroyTourAction(tourId).finally(() => {
                this.destroyTourLoading = false;
            })
        },
        openTourSourceUrl(url) {
            window.open(url, '_blank').focus()
        },
        // dialog
        showEditDialog(editableTourId) {
            this.SET_EDITABLE_TOUR_ID(editableTourId);
            this.editDialog = true;
        }
    },
    // get tours via API
    created() {
        this.getTours({status: this.$route.params.status, parent_id: this.$route.params.id}).then(() => {
            this.firstLoading = false;
        })
    },
    // get tours via API after route.param changes
    beforeRouteUpdate(to, from, next) {
        this.showTourId = null;
        this.getTours({status: to.params.status, parent_id: to.params.id}).then(() => {
            next()
        });
    }
}
</script>

<style lang="sass" scoped>
.card-img-scale
    transition: 0.8s

    &:hover
        transform: scale(1.1)
</style>


