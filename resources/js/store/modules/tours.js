import axios from "axios"
import route from "@/routes"
import shuffle from "lodash/shuffle";

export default {
    namespaced: true,
    state: {
        tours: [],
        breadcrumbs: [],
        editableTourId: null
    },
    getters: {},
    actions: {
        getTours({commit}, payload) {
            if (payload.parent_id === undefined) payload.parent_id = '';
            if (payload.status === undefined) payload.status = 'published';

            let requestUrl = '/api/tours/' + payload.status + '/' + payload.parent_id;
            return axios.get(requestUrl).then(response => {
                commit('SET_TOURS', response.data.data.tours);
                commit('SET_BREADCRUMBS', response.data.data.breadcrumbs);
            })
        },
        createTour({getters, commit}, tour) {
            return axios.post('/api/tours',
                tour, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    commit('SET_TOURS', response.data.data.tours);
                })
        },
        destroyTour({commit}, tourId) {
            return axios.delete('/api/tours/' + tourId)
                .then(response => {
                    commit('SET_TOURS', response.data.data.tours);
                })
        },
        // payload: tourId, tour
        updateTour({getters, commit}, payload) {
            return axios.post('/api/tours/' + payload.tourId,
                payload.tour,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    commit('UPDATE_TOUR', response.data.data.tour);
                })
        },
        restoreTour({commit}, tourId) {
            return axios.put('/api/tours/' + tourId + '/restore')
                .then(response => {
                    commit('SET_TOURS', response.data.data.tours);
                })
        },
        publishTour({commit}, tourId) {
            return axios.put('/api/tours/' + tourId + '/publish')
                .then(response => {
                    commit('SET_TOURS', response.data.data.tours);
                })
        },
        getFiles({state}) {
            return axios.get('/api/tours/' + state.editableTourId + '/files').then(response => {})
        }
    },
    mutations: {
        SET_TOURS: (state, tours) => {
            if (route.currentRoute.name === "TourManagement") {
                state.tours = tours;
            } else state.tours = shuffle(tours);
        },
        UPDATE_TOUR: (state, newTour) => {
            let oldTour = state.tours.find(obj => obj.id === newTour.id);
            oldTour.title = newTour.title;
            oldTour.description = newTour.description;
            oldTour.image_url = newTour.image_url;
            if (!oldTour.isSection) {
                oldTour.source_url = newTour.source_url;
            }
        },
        SET_BREADCRUMBS: (state, breadcrumbs) => {
            let routePathWithoutParams = route.currentRoute.path.replace(route.currentRoute.params.id, '')
            // Set base state
            state.breadcrumbs = [{
                text: 'Главная',
                href: routePathWithoutParams
            }];
            // Set new breadcrumbs
            breadcrumbs.reverse().forEach(element => {
                state.breadcrumbs.push({
                    text: element.title,
                    href: routePathWithoutParams[routePathWithoutParams.length - 1] === '/' ? routePathWithoutParams + element.id : routePathWithoutParams + '/' + element.id
                });
            });
        },
        // Edit tour or section
        SET_EDITABLE_TOUR_ID: (state, id) => {
            state.editableTourId = id
        }
    }
}
