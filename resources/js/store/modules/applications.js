import axios from "axios";

export default {
    namespaced: true,
    state: {
        applications: []
    },
    actions: {
        getApplications({commit}) {
            return axios.get('/api/applications')
                .then(response => {
                    commit('SET_APPLICATIONS', response.data.data.applications);
                })
        },
    },
    mutations: {
        SET_APPLICATIONS: (state, applications) => {
            state.applications = applications;
        },
    }
}
