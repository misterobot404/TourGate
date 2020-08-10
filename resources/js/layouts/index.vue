<template>
    <v-app>
        <v-main class="background">
            <!-- Page loading process -->
            <v-progress-linear
                color="green"
                height="2px"
                :active="pageLoading"
                indeterminate
                fixed
            />
            <v-container style="min-width: 320px !important; max-width: 1000px;">
                <!-- Router View -->
                <keep-alive>
                    <component :is="layout">
                        <router-view/>
                    </component>
                </keep-alive>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import {mapState} from 'vuex'
import AdminLayout from "./AdminLayout"
import DefaultLayout from "./DefaultLayout"

export default {
    name: "AppLayout",
    components: {
        AdminLayout,
        DefaultLayout
    },
    computed: {
        ...mapState(['pageLoading']),
        layout() {
            return this.$route.meta.layout || "DefaultLayout"
        }
    }
}
</script>

<style lang="sass" scoped>
.background
    background-position: center center
    background-size: cover
    background-image: url('~@/assets/background.jpg')
    background-attachment: fixed
</style>
