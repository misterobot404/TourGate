<template>
    <v-card
        v-show="sectionNotRoot"
        flat
        dark
        style="background: rgba(30,30,30, 0.4)"
    >
        <v-breadcrumbs large :items="breadcrumbs" class="mb-4">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                    @click="$route.fullPath === item.href ? $router.go(0) : $router.push(item.href)"
                    :style="{ textShadow: item.href === $route.fullPath ? '0px 0px 4px rgba(255,255,255,0.3)' : 'none' }"
                    style="cursor: pointer; "
                >
                    {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>
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
