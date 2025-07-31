import axios from 'axios';

// Force HTTPS for all axios requests
if (window.location.protocol === 'https:') {
    axios.defaults.baseURL = window.location.origin;
}

// Get the CSRF token from the meta tag
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = (token as HTMLMetaElement).content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Also add XSRF-TOKEN cookie to requests
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
