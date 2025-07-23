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
    };
  };

  document.getElementById('register-form').onsubmit = async e => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try {
      await auth.register(name, email, password);
      loadRoute();
    } catch (err) {
      console.log('El usuario ya está registrado o hubo un error: ' + err.message);
    };
  };
};



export function showHome() {
  const app = document.getElementById('app').innerHTML = `
    <link rel="stylesheet" href="./src/css/style-home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    <div class="header">
      <h1>CalmApp</h1>
      <p>Encuentra calma, equilibrio y bienestar emocional.</p>
      <div id="logout-container">
        <button class="logout-button" id="logout">Cerrar sesión</button>  
      </div>
    </div>
    <div class="card-container">
      <a href="https://barranquilla.gov.co/pide-una-cita">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-envelope"></i></div>
        <h3>Agendar citas</h3>
        <p>Reunete con expertos, la salud mental es tan importante como la salud física.</p>
        </div>
      </a>

      <a href="">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>
        <h3>Emociones</h3>
        <p>Aprende a gestionar tus emociones y mejora tu salud mental.</p>
      </div>
      </a>

      <a href="">
        <div class="card">
        <div class="card-icon"><i class="fa-solid fa-earth-americas"></i></div>
        <h3>Noticias</h3>
        <p>Conecta con otros que también están en su camino.</p>
      </div></a>


      <a href="https://www.youtube.com/watch?v=qcOiqtMsjes"><div class="card">
        <div class="card-icon"><i class="fa-solid fa-headphones"></i></div>
        <h3>Musica</h3>
        <p>Encuentra musica para relajarte y liberar tensiones.</p>
        </div>
      </a>
    </div>


    <footer>
      © 2025 CalmApp. Todos los derechos reservados.
    </footer>
    <div class="alma-bot">
      <img src="./src/tortuga.png" alt="Alma la tortuga" class="alma-float" id="alma-icon">
      <div class="chat-box" id="alma-chat">
        <p><strong>Alma:</strong> ¡Hola! ¿Cómo te sientes hoy?</p>
        <button class="almaresponse" >😊 Bien</button>
        <button class="almaresponse" >😔 No muy bien</button>
      </div>
    </div>
`;

const logoutButton = document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  auth.logout();  // Redirige al login
});
  const music = document.getElementById("musicaFondo");
  music.volume = 0.2;

  const iniciarMusica = () => {
    music.play().then(() => {
      console.log(" Música iniciada.");
    }).catch((error) => {
      console.log(" Error al reproducir música:", error);
    });

    // Eliminar ambos eventos después del primer intento
    document.removeEventListener('click', iniciarMusica);
    window.removeEventListener('scroll', iniciarMusica);
  };

  document.addEventListener('click', iniciarMusica);
  window.addEventListener('scroll', iniciarMusica);
  const almaIcon = document.getElementById('alma-icon');
  const almaChat = document.getElementById('alma-chat');

  almaIcon.addEventListener('click', () => {
    almaChat.style.display = almaChat.style.display === 'block' ? 'none' : 'block';
  });
  

  function almaResponder() {
    almaChat.innerHTML = `<p><strong>Alma:</strong> Recuerda que tu bienestar es lo más importante 🧘‍♂️✨</p>`;
  }

  const almaResponses = document.querySelectorAll('.almaresponse');
  almaResponses.forEach(response => {
    response.addEventListener('click', almaResponder);
  })
};

export function showNoticias() {
  return `
    <section>
      <i class="fa-solid fa-circle-left"></i>
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