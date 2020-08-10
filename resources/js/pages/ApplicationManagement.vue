<template>
    <!-- Table -->
    <v-data-table
        v-model="selected"
        :loading="loading"
        :headers="headers"
        :items="applications"
        show-expand
        item-key="id"
        class="elevation-1"
    >
        <!-- Item actions -->
        <template v-slot:item.actions="{ item }">
            <!-- View -->
            <v-icon
                small
                class="mr-2"
                @click="$router.push({ path: `/viewer/${item.id}` })"
            >
                play_circle_outline
            </v-icon>
            <!-- Edit -->
            <v-icon
                small
                class="mr-2"
                @click="$router.push({ path: `/constructor/${item.id}` })"
            >
                create
            </v-icon>
            <!-- Delete -->
            <v-icon
                small
                @click="destroyMap(item)"
            >
                delete
            </v-icon>
        </template>
        <!-- Item expanded -->
        <template v-slot:expanded-item="{ item }">
            <td>{{ item.description }}</td>
        </template>
    </v-data-table>
</template>

<script>
    import {mapActions,mapState} from "vuex"

    export default {
        name: "ApplicationTable",
        data() {
            return {
                search: "",
                selected: [],
                headers: [
                    {
                        text: 'Название',
                        value: 'title',
                    },
                    {
                        text: 'Описание',
                        value: 'description',
                    },
                    {text: 'Категория', value: 'section_id'},
                    {text: 'Дата подачи', value: 'created_at'},
                    {text: 'Действия', value: 'actions', sortable: false, align: 'center'},
                    {text: '', value: 'data-table-expand'},
                ],
                loading: false,
            }
        },
        computed: {
            ...mapState('applications',[
                "applications"
            ])
        },
        methods: {
            ...mapActions('applications', {
                getApplicationsAction: 'getApplications'
            })
        }
    }
</script>
