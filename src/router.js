import { auth } from './auth.js';
import {
    showHome,
    showAmigo,
    showCita,
    showEmociones,
    showNoticias,
    showMusica,
    showLogin,
    show404
} from './views.js';

const routes = {
    "/": showLogin,
    "/home": showHome,
    "/amigo": showAmigo,
    "/cita": showCita,
    "/emociones": showEmociones,
    "/noticias": showNoticias,
    "/musica": showMusica,
    "/404": show404
};

export function loadRoute() {
    const path = location.pathname || '/';
    const view = routes[path];
    const sidebar = document.querySelector('.sidebar');

    // Agregar evento al botón de logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) { 
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();  // Redirige al login
        });
    }

    if (!view) {
        // Ruta inválida: mostrar 404 y ocultar sidebar
        if (sidebar) {
            sidebar.style.display = 'none';
        }
        document.getElementById('main-content').innerHTML = show404();
        return;
    }

    // Manejar rutas válidas
    if (path === '/' || path === '/404') {
        // Ocultar sidebar en login y 404
        if (sidebar) {
            sidebar.style.display = 'none';
        }
    } else {
        // Mostrar sidebar en otras rutas válidas
        if (sidebar) {
        sidebar.style.display = 'flex';
        }
    }

    if (path === '/home' && !auth.isAuthenticated()) {
        // Redirigir al login si no está autenticado
        window.location.pathname = '/';
        return;
    }

    if (!auth.isAuthenticated() && path !== "/"){
        window.location.pathname = '/';
        return;
    }    

    if (path === '/login' && auth.isAuthenticated()) {
        // Redirigir al home si ya está autenticado
        window.location.pathname = '/home';
        return;
    }

    document.getElementById('main-content').innerHTML = view();
}