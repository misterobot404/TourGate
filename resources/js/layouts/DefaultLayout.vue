<template>
    <div>
        <div class="d-flex justify-center my-10">
            <!-- Logo -->
            <v-img
                @click="$route.fullPath === '/tours' ? $router.go(0) : $router.push({name:'Tours'})"
                max-width="80"
                contain
                :src="require('@/assets/logo.png')"
                style="cursor: pointer"
                class="mb-3"
            />
            <div class="text-h4 font-weight-bold white--text align-self-center ml-6">
                <div>Путеводитель для туриста.</div>
                <div>
                    {{currentLocation}}
                    <LocationSelectDialog/>
                </div>
            </div>
        </div>
        <!-- Page -->
        <slot/>
    </div>
</template>

<script>
import LocationSelectDialog from "@/components/LocationSelectDialog"
import {mapState} from 'vuex'

export default {
    name: "DefaultLayout",
    components: {
        LocationSelectDialog
    },
    data() {
        return {
            showLocationSelectDialog: false
        }
    },
    computed: {
        ...mapState('locations',['currentLocation'])
    }
}
</script>

