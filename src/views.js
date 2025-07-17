import { loadRoute } from './router.js';
import { auth } from './auth.js';

export function showLogin() {
  const app = document.getElementById('app').innerHTML = `
  <link rel="stylesheet" href="./src/css/style-login.css">
  <div class="container-form sign-up">
        <div class="welcome-back">
            <div class="message">
                <h2 class="login-text">Bienvenido a CalmApp</h2>
                <button class="sign-up-btn">Iniciar Sesion</button>
            </div>
        </div>
        <form id="register-form" class="formulario">
            <h2 class="create-account">Crear una cuenta</h2>
            <div class="iconos">
                <div class="border-icon">
                    <i class='bx bxl-instagram'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-linkedin'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-facebook-circle'></i>
                </div>
            </div>
            <input type="text" id="register-name" placeholder="Nombre">
            <input type="email" id="register-email" placeholder="Email">
            <input type="password" id="register-password" placeholder="Contraseña">
            <button type="submit" class="sign-button" id="register">Registrarse</button>
        </form>
    </div>
    <div class="container-form sign-in">
        <form id="login-form" class="formulario">
            <h2 class="create-account">Iniciar Sesion</h2>
            <div class="iconos">
                <div class="border-icon">
                    <i class='bx bxl-instagram'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-linkedin'></i>
                </div>
                <div class="border-icon">
                    <i class='bx bxl-facebook-circle'></i>
                </div>
            </div>
            <input type="email" id="email" name="email" placeholder="Email">
            <input type="password" id="password" name="password" placeholder="Contraseña">
            <button type="submit" class="sign-button" id="login-button">Iniciar Sesion</button>
        </form>
        <div class="welcome-back">
            <div class="message">
                <div class="register-text">
                    <h2>Bienvenido de nuevo</h2>
                    <p>Si aun no tienes una cuenta por favor registrese aqui</p>
                </div>
                <button class="sign-in-btn">Registrarse</button>
            </div>
        </div>
    </div>`

  const $btnSignIn = document.querySelector('.sign-in-btn'),
    $btnSignUp = document.querySelector('.sign-up-btn'),
    $signUp = document.querySelector('.sign-up'),
    $signIn = document.querySelector('.sign-in');

  document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
      $signIn.classList.toggle('active');
      $signUp.classList.toggle('active')
    }
  });
  // Agregar evento al botón de login
  document.getElementById('login-form').onsubmit = async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await auth.login(email, password);
    window.location.pathname = '/home';  // Cambiar a la ruta que desees después del login
    loadRoute();
  } catch (err) {
    console.log(err.message);
  }

  document.getElementById('register-form').onsubmit = async e => {
    e.preventDefault();
    try {
      await auth.register(e.target.name.value, e.target.email.value, e.target.password.value);
      window.location.pathname = '/home';  // Cambiar a la ruta que desees después del login
      loadRoute();
    } catch (err) {
      console.log(err.message);
    }
  
  }
  };
};



export function showHome() {
  return `
    <section>
      <h2>Hola desde el home</h2>
    </section>`;
};

export function showNoticias() {
  return `
    <section>
      <h2>Noticias</h2>
    </section>`;
};

export function showMusica() {
  return `
    <section>
      <h2>Spotify de temu</h2>
    </section>`;
};

export function showEmociones() {
  return `
    <section>
      <h2>Emociones</h2>
    </section>`;
};

export function showCita() {
  return `
    <section>
      <h2>Charla Amigable</h2>
      <p>Aquí hablaremos como amigos. No tienes nada que temer.</p>
      <button>Agregar fecha</button>
      <button>Modalidad</button>
    </section>`;
};

export function showAmigo() {
  return `
    <section>
      <h2>Tu amigo</h2>
    </section>`;
}

export function show404() {
  return `
    <section>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </section>`;
};