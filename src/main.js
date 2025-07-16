import './api.js'; 
import './auth.js';
import { loadRoute } from './router.js'

document.querySelectorAll('[data-route]').forEach(button => {
  button.addEventListener('click', () => {
    const route = button.getAttribute('data-route');
    window.location.pathname = route;
  });
});

// Cargar ruta al inicio y cuando cambia el hash
window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);