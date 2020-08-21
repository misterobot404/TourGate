<template>
    <div>
        <!-- Admin is not log in  -->
        <AuthDialog v-if="!isAuth"/>
        <!-- Admin log in -->
        <div v-else>
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

            <div class="mt-6">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AuthDialog from "@/components/AdminLayout/AuthDialog"

export default {
    name: "AdminLayout",
    components: {
        AuthDialog
    },
    computed: {
        ...mapGetters('auth', [
            'isAuth'
        ])
    }
}
</script>


