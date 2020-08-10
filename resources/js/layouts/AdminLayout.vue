<template>
    <div>
        <!-- Admin is not log in -->
        <AuthDialog v-if="!isAuth"/>
        <!-- Admin log in -->
        <div v-else>
            <v-row class="white--text align-center">
                <span
                    @click="$router.push({name:'Tours'})"
                    class="display-1 my-4"
                    style="cursor: pointer"
                >
                    TourGis
                </span>
                <v-divider
                    class="my-2 mx-4"
                    vertical
                    dark
                    inset
                />
                <span
                    @click="$route.fullPath === '/admin/tours' ? $router.go(0) :$router.push({name:'Admin'})"
                    style="cursor: pointer"
                    class="title my-4"
                >
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
                    :to="{name: 'TourManagement'}"
                    class="mr-2"
                >
                    Управление
                </v-btn>
                <v-btn
                    dark
                    text
                    :to="{name: 'ApplicationManagement'}"
                >
                    Заявки
                </v-btn>
            </v-row>

            <div class="mt-4">
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


