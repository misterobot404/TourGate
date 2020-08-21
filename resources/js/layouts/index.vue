<template>
    <v-app>
        <v-main class="main-background">
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
                    <component v-if="this.$route.meta.layout" :is="this.$route.meta.layout">
                        <router-view/>
                    </component>
                    <router-view v-else/>
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
        ...mapState(['pageLoading'])
    }
}
</script>

<style lang="sass">
.main-background
    background-position: center center
    background-size: cover
    background-image: url('~@/assets/background.jpg')
    background-attachment: fixed
</style>
