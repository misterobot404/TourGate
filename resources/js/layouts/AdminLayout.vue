<template>
    <div>
        <!-- Not auth  -->
        <AuthDialog v-if="!isAuth"/>
        <!-- Auth -->
        <template v-else>
            <!-- Navigation bar -->
            <v-row class="white--text align-center">
                <router-link :to="{name: 'Tours'}" class="text-decoration-none" style="color: white">
                    <span class="display-1 my-4">
                        TourGate
                    </span>
                </router-link>
                <v-divider
                    class="my-2 mx-4"
                    vertical
                    dark
                    inset
                />
                <span class="title my-4">
                    Administrator
                </span>
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
import {mapGetters} from 'vuex'
import AuthDialog from "@/components/AuthDialog"
import CreateDialog from "@/components/CreateDialog.vue"

export default {
    name: "AdminLayout",
    components: {
        AuthDialog,
        CreateDialog
    },
    computed: {
        ...mapGetters('auth', ['isAuth'])
    }
}
</script>


