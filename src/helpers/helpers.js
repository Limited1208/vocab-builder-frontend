import axios from "axios";
import Vue from "vue";
import vueFlashMessage from "vue-flash-message";
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(vueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = "https://vocab-builder-backend-nmwq.onrender.com/words/";

const handleErrors = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, "error");
        throw error;
    });

export const api = {
    getWord: handleErrors(async id => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),

    getWords: handleErrors(async () => {
        const res = await axios.get(baseURL);
        return res.data;
    }),

    deleteWord: handleErrors(async id => {
        const res = await axios.delete(baseURL + id);
        return res.data;
    }),

    createWord: handleErrors(async payload => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),

    updateWord: handleErrors(async payload => {
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data;
    })
};
