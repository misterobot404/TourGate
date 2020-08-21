<template>
    <div>
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
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        style="cursor: pointer"
                        class="overflow-hidden"
                        @click="cardClickBehavior(tour)"
                    >
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
                                    style="word-break: break-word;"
                                />
                            </v-fade-transition>
                        </v-img>
                        <v-fade-transition>
                            <v-overlay
                                v-if="hover"
                                absolute
                                color="#036358"
                                class="px-8 text-center"
                            >
                                <div
                                    style="white-space: pre-wrap;"
                                    v-text="tour.description"
                                    class="title"
                                    @click.stop
                                />
                                <div
                                    v-if="tour.organization_name"
                                    v-text="tour.organization_name"
                                    class="title"
                                    @click.stop
                                />
                                <div
                                    v-if="tour.organization_address"
                                    v-text="tour.organization_address"
                                    class="title"
                                    @click.stop
                                />
                                <div
                                    v-if="tour.organization_phone"
                                    v-text="tour.organization_phone"
                                    class="title"
                                    @click.stop
                                />
                                <div
                                    v-if="tour.organization_email"
                                    v-text="tour.organization_email"
                                    class="title"
                                    @click.stop
                                />
                                <div
                                    v-if="tour.source_url"
                                    v-text="tour.source_url"
                                    class="title"
                                    @click.stop
                                />
                            </v-overlay>
                        </v-fade-transition>
                    </v-card>
                </v-hover>
            </v-col>
            <!-- Add -->
            <v-col
                v-if="last_section && !firstLoading"
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
                            <v-btn
                                large
                                rounded
                                class="mt-2 v-btn--active"
                                text
                                @click="createDialog = true"
                            >
                                Добавить
                            </v-btn>
                        </v-overlay>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

        <CreateTourDialog :showCreateDialog.sync="createDialog" dialogType="Tour"/>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import BreadcrumbsNavigation from "@/components/BreadcrumbsNavigation.vue"
import CreateTourDialog from "@/components/TourManagement/CreateDialog"

export default {
    name: "Tours",
    components: {
        BreadcrumbsNavigation,
        CreateTourDialog
    },
    data() {
        return {
            firstLoading: true,
            createDialog: false
        }
    },
    computed: {
        ...mapState('tours', [
            'tours'
        ]),
        last_section() {
            return this.tours.find(element => element.isSection === true) === undefined;
        }
    },
    methods: {
        ...mapActions('tours', {
            getToursAction: 'getTours',
        }),
        // If the pressed card is a section, open children section, else open source_url on new tab
        cardClickBehavior(tour) {
            tour.isSection ? this.$router.push({name: 'Tours', params: {id: tour.id}}) : window.open(tour.source_url,'_blank').focus();
        }
    },
    // get tours via API
    created() {
        this.getToursAction({parent_id: this.$route.params.id}).then(() => {
            this.firstLoading = false;
        })
    },
    // get tours via API after route.param changes
    beforeRouteUpdate(to, from, next) {
        this.getToursAction({parent_id: to.params.id}).then(() => {
            next()
        });
    }
}
</script>


