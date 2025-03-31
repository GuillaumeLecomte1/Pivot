import axios from 'axios';

// Force HTTPS for all requests
axios.defaults.baseURL = 'https://pivot.guillaume-lcte.fr';
axios.defaults.withCredentials = true;

export default axios; 