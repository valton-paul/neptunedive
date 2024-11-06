import axios from 'axios'

// const host = context.

axios.defaults.baseURL = 'http://localhost/neptunedive/public'; //TODO maybe on doit utiliser https pour la prod
axios.defaults.withCredentials = true;
axios.interceptors.request.use((req) => {
    return req;
});

const UNAUTHORIZED = 401;
let isRefreshing = false; // Pour s'assurer qu'une seule tentative de refresh est faite
let refreshFailed = false; // Indicateur pour ne pas retenter le refresh si ça a déjà échoué

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log('error', error);
        const originalRequest = error.config;
        if (refreshFailed) {
            return Promise.reject(error);
        }
        if (error.response.status === UNAUTHORIZED && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Tentative de refresh du token
                // await axios.post('/api/token/refresh');
                isRefreshing = false;
                return axios(originalRequest); // Rejouer la requête initiale
            } catch (refreshError) {
                // Si le refresh échoue, marquer l'échec et rejeter l'erreur
                refreshFailed = true;
                isRefreshing = false;
                console.error('Token refresh failed:', refreshError);
                window.location.href = '/'; // Optionnel : redirection vers la page de login
                return Promise.reject(refreshError);
            }

        }

        return Promise.reject(error);
    }
);

export default axios;
