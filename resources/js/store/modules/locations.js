import axios from "axios"

export default {
    namespaced: true,
    state: {
        locations: [],
        currentLocation: localStorage.getItem("location") ? localStorage.getItem("location") : "Комсомольск-на-Амуре"
    },
    actions: {
        getLocations({commit}) {
            axios.get("/api/locations").then(response => {
                commit('SET_LOCATIONS', response.data.data.locations);
            })
        },
        createLocation({commit}, location) {
            axios.post('/api/locations', {name: location})
                .then(response => {
                    commit('SET_LOCATIONS', response.data.data.locations);
                })
        },
        destroyLocation({commit}, location) {
            axios.delete('/api/locations/' + location)
                .then(response => {
                    commit('SET_LOCATIONS', response.data.data.locations);
                })
        },
    },
    mutations: {
        SET_LOCATION: (state, location) => {
            localStorage.setItem('location', location);
            state.currentLocation = location;
        },
        SET_LOCATIONS: (state, locations) => {
            state.locations = locations;
        }
    }
}
