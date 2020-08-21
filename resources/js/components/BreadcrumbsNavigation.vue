<template>
    <v-card
        v-show="sectionNotRoot"
        flat
        dark
        style="background: rgba(30,30,30, 0.4)"
    >
        <v-breadcrumbs large :items="breadcrumbs" class="mb-4">
            <template v-slot:item="{ item }">
                <router-link :to="item.href" class="text-decoration-none text-uppercase" style="color: white">
                    <v-breadcrumbs-item :class="item.href === $route.path ? 'breadcrumbs-item-active' : null">
                        {{ item.text }}
                    </v-breadcrumbs-item>
                </router-link>
            </template>
            <template v-slot:divider>
                <v-icon>chevron_right</v-icon>
            </template>
        </v-breadcrumbs>
    </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Breadcrumbs",
    computed: {
        ...mapState('tours', [
            'breadcrumbs'
        ]),
        sectionNotRoot() {
            return this.$route.params.id
        }
    },
}
</script>

<style lang="sass" scoped>
.breadcrumbs-item-active
    text-shadow: 0 0 4px rgba(255, 255, 255, 0.3)
</style>
