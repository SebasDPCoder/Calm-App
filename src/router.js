import { auth } from './auth.js';
import {
    showHome,
    showAmigo,
    showCita,
    showEmociones,
    showInformacion,
    showMusica,
    showLogin,
    show404
} from './views.js';

const routes = {
    "/": showLogin,
    "/home": showHome,
    "/amigo": showAmigo,
    "/citas": showCita,
    "/emociones": showEmociones,
    "/informacion": showInformacion,
    "/musica": showMusica,
    "/404": show404
};

export function loadRoute() {
    const path = location.pathname || '/';
    const view = routes[path];

    if (!view) {
        // Ruta inválida: mostrar 404 y ocultar sidebar
        document.getElementById('main-content').innerHTML = show404();
        return;
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