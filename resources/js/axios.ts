import axios from 'axios';

// Force HTTPS for all axios requests
if (window.location.protocol === 'https:') {
    axios.defaults.baseURL = window.location.origin;
}

// Set CSRF token
const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = (csrfToken as HTMLMetaElement).content;
}

// Enable credentials
axios.defaults.withCredentials = true;

// Set Accept header
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios; 