<template>
    <v-container fill-height style="height: 90vh !important">
        <v-col class="text-center">
                <v-img
                    class="mb-4"
                    contain
                    height="256"
                    :src="require('@/assets/page-404.png')"
                />
                <h1 class="display-1 white--text font-weight-bold mb-8">
                    Страница не найдена
                </h1>

                <v-btn
                    color="primary"
                    large
                    rounded
                    to="/"
                >
                    Главная страница
                    <v-icon right>
                        launch
                    </v-icon>
                </v-btn>
        </v-col>
    </v-container>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Page404"
    }
</script>
