<template>
    <div>
        <!-- Not auth  -->
        <AuthDialog v-if="!isAuth"/>
        <!-- Auth -->
        <template v-else>
            <!-- Navigation bar -->
            <v-row class="white--text align-center my-4">
                <v-img
                    @click="$route.fullPath === '/tours' ? $router.go(0) : $router.push({name:'Tours'})"
                    max-width="40"
                    contain
                    :src="require('@/assets/logo.png')"
                    style="cursor: pointer"
                    class="mb-3"
                />
                <div class="text-h4 font-weight-bold white--text align-self-center ml-4">
                    {{ currentLocation }}
                    <EditLocationsDialog/>
                </div>
                <v-divider
                    class="my-2 mx-4"
                    vertical
                    dark
                    inset
                />
                <v-btn
                    dark
                    text
                    :to="{ name: 'TourManagement', params: { status: 'published' } }"
                    class="mr-2"
                >
                    Публикуемое
                </v-btn>
                <v-btn
                    dark
                    text
                    :to="{ name: 'TourManagement', params: { status: 'new' } }"
                    class="mr-2"
                >
                    Заявки
                </v-btn>
                <v-btn
                    dark
                    text
                    :to="{ name: 'TourManagement', params: { status: 'deleted' } }"
                >
                    Удалённое
                </v-btn>
            </v-row>
            <!-- Create tour/section buttons -->
            <CreateDialog v-if="$route.params.status === 'published'" class="my-6"/>
            <!-- Page -->
            <slot/>
        </template>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import AuthDialog from "@/components/AuthDialog"
import CreateDialog from "@/components/CreateDialog.vue"
import EditLocationsDialog from "@/components/EditLocationsDialog.vue"

export default {
    name: "AdminLayout",
    components: {
        AuthDialog,
        CreateDialog,
        EditLocationsDialog
    },
    data() {
        return {
            showEditLocationsDialog: false
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuth']),
        ...mapState('locations', ['currentLocation'])
    }
}
</script>


