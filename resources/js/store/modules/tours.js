import axios from "axios"
import route from "@/routes"
import shuffle from "lodash/shuffle"
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        tours: [],
        breadcrumbs: [],
        editableTourId: null
    },
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
            return axios.get('/api/tours/' + state.editableTourId + '/files', {responseType: 'arraybuffer'})
                .then(response => {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(new Blob([response.data]));
                    link.download = 'docs.zip';
                    link.click();
                })
        }
    },
    mutations: {
        SET_TOURS: (state, tours) => {
            let randSections = shuffle(tours.map(el => el.isSection));
            let randTour = shuffle(tours.map(el => !el.isSection));
            state.tours = randSections.concat(randTour);
        },
        UPDATE_TOUR: (state, newTour) => {
            const index = state.tours.findIndex(obj => obj.id === newTour.id)
            // using Vue.set
            Vue.set(state.tours, index, newTour)
            // using Array.splice
            state.tours.splice(index, 1, newTour)
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
