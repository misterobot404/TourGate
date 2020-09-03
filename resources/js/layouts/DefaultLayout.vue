<template>
    <div>
        <!-- Logo -->
        <v-img
            @click="$route.fullPath === '/tours' ? $router.go(0) : $router.push({name:'Tours'})"
            max-width="300"
            contain
            :src="require('@/assets/logo.png')"
            class="mx-auto"
            style="cursor: pointer"
        />
        <!-- Page -->
        <slot/>
    </div>
</template>

<script>
export default {
    name: "DefaultLayout"
}
</script>

